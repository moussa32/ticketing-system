"use server"

import {replyToTicket,getTicketDetails} from '../../../../lib/services/CustomerTicketService.js';
import fs from "fs";
import path from "path";

export async function replyTicket(formData) {
    try {
        console.log("Received formData in replyTicket action.", formData);
     
            const ticketId = formData.get("ticketId");
            const replyMessage = formData.get("replyMessage"); 
            const status=formData.get("status");
            const userId=formData.get("userId");
            const file = formData.get("file"); // Get the uploaded file

            let filename = null;
            
                if (file && file.size > 0) {
                  // Ensure the folder exists
                  const uploadDir = path.join(process.cwd(), "public", "attachments", "customer");
                  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
            
                  // Save file with unique name
                  filename = `${Date.now()}_${file.name}`;
                  const filePath = path.join(uploadDir, filename);
                  const buffer = Buffer.from(await file.arrayBuffer());
                  fs.writeFileSync(filePath, buffer);
                }
            

            await replyToTicket(ticketId,replyMessage,status,userId,filename);  
            return { ok: true, message: `Reply submitted successfully!` };
    }catch (error) {
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