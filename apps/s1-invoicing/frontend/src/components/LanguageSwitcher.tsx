'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '../navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <select
      className="lang-select"
      defaultValue={locale}
      disabled={isPending}
      onChange={onSelectChange}
    >
      <option value="fr">Français</option>
      <option value="ar">العربية</option>
      <option value="en">English</option>
    </select>
  );
}
