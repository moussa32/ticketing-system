import Table from "@/features/customer-dashboard/viewTicket/components/Table"
import {getAllTicketsByUserID} from "@/lib/services/CustomerTicketService";
import { cookies } from 'next/headers';
import jwt from "jsonwebtoken";


export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  console.log("Token in page.js:", jwt.decode(token));
  // pass user ID dynamically when auth is implemented
  const ticketsList = await getAllTicketsByUserID(jwt.decode(token).id);

  return (<Table ticketsList={ticketsList} />);
}
