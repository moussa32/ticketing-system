"use server"

import {addTicket} from '../../../../lib/services/CustomerTicketService.js';
import fs from "fs";
import path from "path";



// the below method handles the form submission
export async function saveTicket(formData) {
    try {
            const userId = formData.get("userId");
            const category = formData.get("category");
            const subject = formData.get("subject");
            const description = formData.get("description");
            const department = formData.get("department");

            console.log("Saving ticket...", { subject, department, description })

            const [catId,urgencyId]=category.split(",");
            const status="Opened";
            // Handle attachment
    const file = formData.get("attachment");
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

    const ticketNo = await addTicket(subject,description,status,department,catId,urgencyId,userId,filename);

     return { ok: true, message: `Ticket #${ticketNo} submitted successfully!` };

    }catch (error) {
      console.error("Error saving ticket:", error);
          return { ok: false, message: "Failed to submit ticket" };
    }
    

  }