import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../../entities/user.entity';

@Injectable()
export class RbacService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(tenantId: string) {
    return this.userRepository.find({
      where: { tenantId },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'isActive', 'createdAt']
    });
  }

  async getUser(id: string, tenantId: string) {
    const user = await this.userRepository.findOne({
      where: { id, tenantId },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'isActive', 'createdAt']
    });
    if (!user) throw new NotFoundException('User not found in your tenant');
    return user;
  }

  async changeRole(id: string, tenantId: string, role: UserRole) {
    const user = await this.getUser(id, tenantId);
    user.role = role;
    return this.userRepository.save(user);
  }
}
