import Table from "@/features/customer-dashboard/viewTicket/components/Table"
import {getAllTicketsByUserID} from "@/lib/services/CustomerTicketService";

export default async function Page() {
  // pass user ID dynamically when auth is implemented
  const ticketsList = await getAllTicketsByUserID(1);

  return (<Table ticketsList={ticketsList} />);
}
