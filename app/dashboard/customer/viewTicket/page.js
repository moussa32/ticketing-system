import Table from "./Table";
import {getAllTicketsByUserID} from "@/lib/services/TicketService";

export default async function Page() {
  // pass user ID dynamically when auth is implemented
  const ticketsList = await getAllTicketsByUserID(1);

  return (<Table ticketsList={ticketsList} />);
}
