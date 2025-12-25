"use server"

import {addTicket} from '../../../../lib/services/CustomerTicketService.js';
import { TICKET_STATUSES } from '../../../../app/constants/constants.js';
import {uploadFile,isValidFileType,isValidFileSize} from '../../../../lib/services/fileService.js';

// the below method handles the form submission
export async function saveTicket(formData) {
    try {
            const userId = formData.get("userId");
            const category = formData.get("category");
            const subject = formData.get("subject");
            const description = formData.get("description");
            const department = formData.get("department");

            const [catId,urgencyId]=category.split(",");
            const status=TICKET_STATUSES.OPEN;
            // Handle attachment
            const file = formData.get("attachment");
           // upload file
            const filename = await uploadFile(file);

          if(!isValidFileSize(file)) {
            return { ok: false, message: "Attachment size exceeds the 5MB limit." };
          }if(!isValidFileType(file)) {
            return { ok: false, message: "Invalid attachment type. Only JPG, PNG, PDF, and ZIP are allowed." };
          }
          const fileUrl = filename ? `/tickets/${filename}` : null;
              
          const ticketNo = await addTicket(subject,description,status,department,catId,urgencyId,userId,fileUrl);

     return { ok: true, message: `Ticket #${ticketNo} submitted successfully!` };

    }catch (error) {
      console.error("Error saving ticket:", error);
          return { ok: false, message: "Failed to submit ticket" };
    }
  }

  