import Faq from "@/features/faqs/components/FAQs";
import { getAllFaqs } from "@/features/admin-dashboard/faqs/actions/faqActions";  


export default async function FAQPage() {
  const faqList = await getAllFaqs();
  return <Faq items={faqList} />;
}