"use server"
import {replyToTicket,getTicketDetails,deleteTicketWithAttachment} from '../../../../lib/services/CustomerTicketService.js';
import fs from "fs";
import path from "path";
import {uploadFile,deleteFile,isValidFileSize,isValidFileType} from '../../../../lib/services/fileService.js';
import { TICKET_STATUSES } from '../../../../app/constants/constants.js';

export async function replyTicket(formData) {
    try {
        console.log("Received formData in replyTicket action.", formData);
     
            const ticketId = formData.get("ticketId");
            const replyMessage = formData.get("replyMessage"); 
            const status=(formData.get("status")===TICKET_STATUSES.OPEN) ? TICKET_STATUSES.OPEN : TICKET_STATUSES.AWAITING_AGENT_REPLY;
            const userId=formData.get("userId");
            const file = formData.get("file"); // Get the uploaded file

            // upload file
                        const filename = await uploadFile(file);
            
                      if(!isValidFileSize(file)) {
                        return { ok: false, message: "Attachment size exceeds the 5MB limit." };
                      }if(!isValidFileType(file)) {
                        return { ok: false, message: "Invalid attachment type. Only JPG, PNG, PDF, and ZIP are allowed." };
                      }
                      const fileUrl = filename ? `/tickets/${filename}` : null;
                 await replyToTicket(ticketId,replyMessage,status,userId,fileUrl);  
                  return { ok: true, message: `Reply submitted successfully!` };
                
    }catch (error) {
        console.error("Error submitting reply:", error);
          return { ok: false, message: "Failed to submit reply" };
    }       
}


export async function fetchTicketDetails(ticketId) {
    try {
        const ticketDetails = await getTicketDetails(ticketId);
        return { ok: true, data: ticketDetails };
    } catch (error) {
        return { ok: false, message: "Failed to fetch ticket details" };
    }       
}


export async function deleteTicketAction(ticket) {
    try {
        console.log("Deleting ticket:", ticket);
        const results = await Promise.allSettled([ 
              deleteTicketWithAttachment(ticket),
              deleteFile(ticket)
        ]);
        console.log("Deletion results:", results);
        return { ok: true, message: "Ticket deleted successfully." };
    } catch (error) {
        console.error("Error deleting ticket:", error);
        return { ok: false, message: "Failed to delete ticket." };
    }   
}