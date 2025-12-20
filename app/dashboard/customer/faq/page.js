import Faq from "@/features/faqs/components/FAQs";

export default function FAQPage() {
  const faqList = [
    { id: 1, question: "How do I create a ticket?", answer: "Go to support page and click create ticket." },
    { id: 2, question: "How can I reset my password?", answer: "Use the reset link sent to your email." },
    { id: 3, question: "Where can I track my tickets?", answer: "From 'My Tickets' menu in the dashboard." }
  ];

  return <Faq items={faqList} />;
}