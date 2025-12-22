"use server";

import {deleteTicketWithAttachment} from '../../../../lib/services/CustomerTicketService.js';
export async function deleteTicketAction(ticketId) {
    try {
        await deleteTicketWithAttachment(ticketId);
        return { ok: true, message: "Ticket deleted successfully." };
    } catch (error) {
        return { ok: false, message: "Failed to delete ticket." };
    }   
}