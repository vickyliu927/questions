import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface UseContactNavigationProps {
  isContactFormActive?: boolean;
  externalContactUrl?: string;
}

export function useContactNavigation({
  isContactFormActive = false,
  externalContactUrl = 'https://tutorchase.com/contact'
}: UseContactNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleContactNavigation = useCallback(() => {
    if (!isContactFormActive) {
      // If contact form is not active, redirect to external URL
      window.open(externalContactUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (pathname !== '/') {
      // If we're not on homepage, first navigate to homepage
      router.push('/?contact=true');
    } else {
      // If we're already on homepage, scroll to contact form
      const contactFormElement = document.getElementById('contact-form-section');
      if (contactFormElement) {
        contactFormElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isContactFormActive, externalContactUrl, pathname, router]);

  return { handleContactNavigation };
} 