'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from '../navigation';
import { useEffect } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && !(session?.user as any)?.isActivated) {
      router.push('/activate');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Authenticating via Server...</div>;
  }

  if (status === 'authenticated' && (session?.user as any)?.isActivated) {
    return <>{children}</>;
  }

  return null;
}
