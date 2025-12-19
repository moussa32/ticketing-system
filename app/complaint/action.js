"use server"
export async function submitComplaint(formData) {
    try {
        const ticketID = formData.get("ticketID");
        const complaint = formData.get("complaint");
        console.log("Submitting complaint...", { ticketID, complaint });

        // Here you would typically call a service to save the complaint
        // For example: await addComplaint(ticketID, complaint);    
        return { ok: true, message: `Complaint for Ticket #${ticketID} submitted successfully!` };
    } catch (error) {
        return { ok: false, message: "Failed to submit complaint" };
    }
}
