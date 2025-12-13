import ReplyTicketHTML from "../ReplyTicketHTML";
import {getReplyMessagesByTicketID} from "../../../../lib/services/TicketService";
export default async function Page({params}) {
  const resolvedParams = await params;   // unwrap the promise
  const ticketId = resolvedParams.ticketId;
  
  const replyMessages = await getReplyMessagesByTicketID(ticketId) || []; // pass ticket ID dynamically when implemented
 
  return (
    <div>
      <ReplyTicketHTML replyMessages={replyMessages}/>
    </div>
  );
}