
import { CustomerComplaint } from "../../lib/database/models"
export async function addComplaint(userId, ticketId, message) {
  try {
    const complaint = await CustomerComplaint.create({
        user_id: userId,
        ticket_id: ticketId,
        message
    });
    return complaint;
  } catch (error) {
    throw new Error(error.message);
  }
}   