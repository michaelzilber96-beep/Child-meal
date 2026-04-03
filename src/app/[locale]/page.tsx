import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleRootPage({ params }: PageProps) {
  const { locale } = await params;

  // Check onboarding status server-safe (client-side redirect below)
  // We do the actual check client-side; here we just forward to dashboard
  // which will redirect back to onboarding if profile is missing
  redirect(`/${locale}/dashboard`);
}
