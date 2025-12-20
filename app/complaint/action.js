"use server"
import { addComplaint } from "@/lib/services/complaintService";
export async function submitComplaint(formData) {
    try {
        const ticketID = formData.get("ticketID");
        const complaint = formData.get("complaint");
        console.log("Submitting complaint...", { ticketID, complaint });

        const userId="1"; // Replace with actual user ID retrieval logic
        await addComplaint(userId, ticketID, complaint);   
        return { ok: true, message: `Complaint for Ticket #${ticketID} submitted successfully!` };
    } catch (error) {
        return { ok: false, message: "Failed to submit complaint" };
    }
}
