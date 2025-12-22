"use server"

import { getCategoriesWithUrgency, getDepartments } from "@/lib/services/CustomerTicketService";
import TicketHTML from "@/features/customer-dashboard/addTicket/components/TicketForm";

// This is a server component that fetches data and renders the TicketHTML component
export default async function Page() {
  const categories = await getCategoriesWithUrgency();
  const departments = await getDepartments();

  return (
    <TicketHTML
      categories={categories}
      departments={departments}
    />
  );
}
