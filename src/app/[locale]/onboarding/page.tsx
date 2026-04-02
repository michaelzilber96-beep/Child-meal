import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function OnboardingPage({ params }: PageProps) {
  const { locale } = await params;
  return <OnboardingWizard locale={locale} />;
}
