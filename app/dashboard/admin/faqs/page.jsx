import FaqsClient from '@/features/admin-dashboard/faqs/components/FaqsClient';
import { getAllFaqs } from '@/features/admin-dashboard/faqs/actions/faqActions';

export default async function FaqsPage() {
  const faqs = await getAllFaqs();

  return <FaqsClient initialFaqs={faqs} />;
}
  