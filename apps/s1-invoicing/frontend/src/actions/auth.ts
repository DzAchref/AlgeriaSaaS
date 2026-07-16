'use server';

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';

// -- Admin Actions --
export async function getCodes() {
  const codes = await prisma.accessCode.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return codes;
}

export async function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codeStr = 'AUTOSAAS-';
  for (let i = 0; i < 6; i++) {
    codeStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  await prisma.accessCode.create({
    data: { code: codeStr }
  });
  
  revalidatePath('/admin/generator');
  return codeStr;
}

export async function deleteCode(id: string) {
  await prisma.accessCode.delete({
    where: { id }
  });
  revalidatePath('/admin/generator');
}

// -- User Actions --
export async function activateAccount(userId: string, code: string) {
  // Find the code
  const accessCode = await prisma.accessCode.findUnique({
    where: { code }
  });

  if (!accessCode) {
    return { success: false, error: 'Code not found' };
  }

  if (accessCode.isUsed) {
    return { success: false, error: 'This code has already been used' };
  }

  // Update user and burn code
  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { isActivated: true }
    }),
    prisma.accessCode.update({
      where: { id: accessCode.id },
      data: { isUsed: true }
    })
  ]);

  return { success: true };
}
