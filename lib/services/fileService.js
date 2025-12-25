import fs from "fs";
import path from "path";
import { fa } from "zod/v4/locales";

export async function uploadFile(file) {
    let filename = null;

    if (file && file.size > 0) {
      // Ensure the folder exists
      const uploadDir = path.join(process.cwd(), "public", "tickets");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      // Save file with unique name
      filename = `${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
 
       fs.writeFileSync(filePath, buffer);
    }

    return filename;
  }

export async function deleteFile(ticket) {
    console.log("deleteFile called with ticket:", ticket+" and attachmentUrl:", ticket.attachurl);
    if (ticket && ticket.attachurl) {
      const fileName = ticket.attachurl.split("/").pop();
      const fullPath = path.join(process.cwd(), "public", "tickets", fileName);
      if (fs.existsSync(fullPath))  {
        fs.unlinkSync(fullPath);
      }     
    }
  }

  export async function isValidFileType(file){
            const fileType = file && file.type ? file.type : '';
            const allowedTypes = [
              "image/jpeg",               // JPG / JPEG
              "image/png",                // PNG
              "application/pdf",          // PDF
              "application/zip",          // ZIP
              "application/x-zip-compressed" // ZIP (Windows browsers)
            ];            
            if (fileType && !allowedTypes.includes(fileType)) {
                return false;
            }  
            return true;
    }

    export async function isValidFileSize(file){
            const fileSize = file && file.size ? file.size : 0;
            const maxFileSize = 5 * 1024 * 1024; // 5MB
            if (fileSize > maxFileSize) {
              return false;
            } 
            return true;
    }