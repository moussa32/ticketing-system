"use server"
import { viewTickets, viewTicket, replayTicket, deleteTicket as deleteTicketService, updateStatus, updateTicket, assignTicket as assignTicketService, getDepartmentUsers } from '@/lib/services/agent';

export async function fetchAgentTickets() {
    try {
        const tickets = await viewTickets();
        return {
            success: true,
            data: tickets,
            count: tickets.length
        };
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return {
            success: false,
            error: error.message || 'Failed to fetch tickets',
            data: []
        };
    }
}

export async function fetchTicketWithReplies(ticketId) {
    try {
        const result = await viewTicket(ticketId);
        return {
            success: true,
            data: result
        };
    } catch (error) {
        console.error("Error fetching ticket details:", error);
        return {
            success: false,
            error: error.message || 'Failed to fetch ticket details'
        };
    }
}

export async function submitReply(ticketId, replyMessage, userId) {
    try {
        if (!ticketId || !replyMessage || !userId) {
            throw new Error('Missing required fields: ticketId, replyMessage, userId');
        }

        const result = await replayTicket(ticketId, replyMessage, userId);
        return {
            success: true,
            data: result,
            message: 'Reply added successfully'
        };
    } catch (error) {
        console.error('Error adding reply:', error);
        return {
            success: false,
            error: error.message || 'Failed to add reply'
        };
    }
}

export async function submitReplyWithFiles(ticketId, replyMessage, userId, filesData = []) {
    try {
        if (!ticketId || !replyMessage || !userId) {
            throw new Error('Missing required fields: ticketId, replyMessage, userId');
        }

        // Convert base64 files back to buffers
        const attachments = [];
        if (Array.isArray(filesData)) {
            for (const fileData of filesData) {
                if (fileData && fileData.data && fileData.name) {
                    // Convert base64 string to Buffer
                    const buffer = Buffer.from(fileData.data, 'base64');
                    attachments.push({
                        buffer,
                        originalName: fileData.name,
                        mimeType: fileData.type || 'application/octet-stream',
                        size: fileData.size || buffer.length
                    });
                }
            }
        }

        // Call server function with attachments
        const result = await replayTicket(ticketId, replyMessage, userId, attachments);
        return {
            success: true,
            data: result,
            message: 'Reply added successfully with attachments',
            filesCount: attachments.length
        };
    } catch (error) {
        console.error('Error adding reply with files:', error);
        return {
            success: false,
            error: error.message || 'Failed to add reply'
        };
    }
}

export async function removeTicket(ticketId) {
    try {
        const result = await deleteTicketService(ticketId);
        return {
            success: true,
            data: result,
            message: 'Ticket deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting ticket:', error);
        return {
            success: false,
            error: error.message || 'Failed to delete ticket'
        };
    }
}

export async function updateTicketStatus(ticketId, status) {
    try {
        const result = await updateStatus(ticketId, status);
        return {
            success: true,
            data: result,
            message: 'Ticket status updated successfully'
        };
    } catch (error) {
        console.error('Error updating ticket status:', error);
        return {
            success: false,
            error: error.message || 'Failed to update ticket status'
        };
    }
}

export async function updateTicketData(ticketId, updateData) {
    try {
        if (!ticketId) {
            throw new Error('Ticket ID is required');
        }

        const { subject, description, status, category_id, urgency_id, dept_id } = updateData;
        
        const result = await updateTicket(ticketId, {
            subject,
            description,
            category_id,
            urgency_id,
            dept_id
        });

        // Also update status if provided
        if (status) {
            await updateStatus(ticketId, status);
        }

        return {
            success: true,
            data: result,
            message: 'Ticket updated successfully'
        };
    } catch (error) {
        console.error('Error updating ticket:', error);
        return {
            success: false,
            error: error.message || 'Failed to update ticket'
        };
    }
}

export async function fetchAgentTicketStats() {
    try {
        const tickets = await viewTickets();
        const stats = {
            open: tickets.filter(t => t.status === 'Open').length,
            inProgress: tickets.filter(t => t.status === 'In Progress').length,
            pending: tickets.filter(t => t.status === 'Pending').length,
            resolved: tickets.filter(t => t.status === 'Resolved').length,
            closed: tickets.filter(t => t.status === 'Closed').length
        };
        return {
            success: true,
            data: stats
        };
    } catch (error) {
        console.error('Error fetching ticket stats:', error);
        return {
            success: false,
            error: error.message || 'Failed to fetch ticket stats',
            data: { open: 0, inProgress: 0, pending: 0, resolved: 0, closed: 0 }
        };
    }
}

export async function closeTicket(ticketId) {
    try {
        if (!ticketId) {
            throw new Error('Ticket ID is required');
        }

        const result = await updateStatus(ticketId, 'Closed');
        return {
            success: true,
            data: result,
            message: 'Ticket closed successfully'
        };
    } catch (error) {
        console.error('Error closing ticket:', error);
        return {
            success: false,
            error: error.message || 'Failed to close ticket'
        };
    }
}

export async function resolveTicket(ticketId) {
    try {
        if (!ticketId) {
            throw new Error('Ticket ID is required');
        }

        const result = await updateStatus(ticketId, 'Resolved');
        return {
            success: true,
            data: result,
            message: 'Ticket resolved successfully'
        };
    } catch (error) {
        console.error('Error resolving ticket:', error);
        return {
            success: false,
            error: error.message || 'Failed to resolve ticket'
        };
    }
}

export async function startProgress(ticketId) {
    try {
        if (!ticketId) {
            throw new Error('Ticket ID is required');
        }

        const result = await updateStatus(ticketId, 'In Progress');
        return {
            success: true,
            data: result,
            message: 'Ticket marked as in progress'
        };
    } catch (error) {
        console.error('Error updating ticket:', error);
        return {
            success: false,
            error: error.message || 'Failed to update ticket'
        };
    }
}

export async function assignTicket(ticketId, userId) {
    try {
        if (!ticketId || !userId) {
            throw new Error('Ticket ID and User ID are required');
        }

        const result = await assignTicketService(ticketId, userId);
        return {
            success: true,
            data: result,
            message: 'Ticket assigned successfully'
        };
    } catch (error) {
        console.error('Error assigning ticket:', error);
        return {
            success: false,
            error: error.message || 'Failed to assign ticket'
        };
    }
}

export async function fetchDepartmentUsers(departmentId) {
    try {
        if (!departmentId) {
            throw new Error('Department ID is required');
        }

        const result = await getDepartmentUsers(departmentId);
        return {
            success: true,
            data: result
        };
    } catch (error) {
        console.error('Error fetching department users:', error);
        return {
            success: false,
            error: error.message || 'Failed to fetch department users',
            data: []
        };
    }
}


export async function deleteTicketAction(ticketId) {
    try {
        const result = await deleteTicket(ticketId);
        return { success: true, message: result.message };
    } catch (error) {
        console.error('Error deleting ticket:', error);
        return { success: false, message: error.message };
    }
}
export async function updateTicketAction(ticketid,{ subject, description, category_id, urgency_id, dept_id }){
    try {
        const result = await updateTicket(ticketid,{ subject, description, category_id, urgency_id, dept_id });
        return { success: true, data: result };
    } catch (error) {
        console.error('Error updating ticket:', error);
        return { success: false, message: error.message };
    }
}
export async function updateStatusAction(ticketId, status) {
    try {
        const result = await updateStatus(ticketId, status);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error updating ticket status:', error);
        return { success: false, message: error.message };
    }
}
export async function replayTicketAction(ticketId, message, userId) {
    try {
        const result = await replayTicket(ticketId, message, userId);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error replying to ticket:', error);
        return { success: false, message: error.message };
    }
}
export async function assignTicketAction(ticketId, userId) {
    try {
        const result = await assignTicket(ticketId, userId);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error assigning ticket:', error);
        return { success: false, message: error.message };
    }
}