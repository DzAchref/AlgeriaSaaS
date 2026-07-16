import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User, UserRole } from '../../entities/user.entity';
import { Tenant } from '../../entities/tenant.entity';
import { BusinessProfile } from '../../entities/business-profile.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
    @InjectRepository(BusinessProfile) private businessProfileRepository: Repository<BusinessProfile>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // 1. Create Tenant
    const tenant = this.tenantRepository.create({
      name: dto.companyName,
      slug: `${dto.companyName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${uuidv4().substring(0, 8)}`,
    });
    await this.tenantRepository.save(tenant);

    // 2. Create Business Profile
    const profile = this.businessProfileRepository.create({
      tenantId: tenant.id,
      companyName: dto.companyName,
    });
    await this.businessProfileRepository.save(profile);

    // 3. Create Admin User
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      tenantId: tenant.id,
      email: dto.email,
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      role: UserRole.ADMIN,
      locale: dto.locale,
    });
    await this.userRepository.save(user);

    return this.login({ email: dto.email, password: dto.password });
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.lastLoginAt = new Date();
    await this.userRepository.save(user);

    const payload = { sub: user.id, email: user.email, tenantId: user.tenantId, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        tenantId: user.tenantId,
        locale: user.locale,
      },
    };
  }

  async sendOtp(phone: string) {
    this.logger.log(`Sending mock OTP to ${phone}`);
    return { success: true, message: 'OTP sent successfully (mocked)' };
  }

  async verifyOtp(phone: string, code: string) {
    if (code === '123456') { // Mock logic
      return { success: true };
    }
    throw new BadRequestException('Invalid OTP code');
  }
}
