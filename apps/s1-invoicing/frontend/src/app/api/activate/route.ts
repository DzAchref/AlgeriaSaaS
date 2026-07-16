import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ success: false, error: 'Code is required' }, { status: 400 });
    }

    // Get the current session WITH authOptions so it can read the cookie
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Find the code
    const accessCode = await prisma.accessCode.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!accessCode) {
      return NextResponse.json({ success: false, error: 'Code not found' }, { status: 400 });
    }

    if (accessCode.isUsed) {
      return NextResponse.json({ success: false, error: 'This code has already been used' }, { status: 400 });
    }

    // Activate user and burn the code in one transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { isActivated: true }
      }),
      prisma.accessCode.update({
        where: { id: accessCode.id },
        data: { isUsed: true }
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Activation error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
