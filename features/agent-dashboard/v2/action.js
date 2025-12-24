"use server"
import { TICKET_STATUSES } from '@/app/constants/constants';
import { viewTickets, viewTicket, replayTicket, updateStatus, updateTicket, assignTicket as assignTicketService, getDepartmentUsers } from '@/lib/services/agent';

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
            message: 'Reply added successfully ',
        };
    } catch (error) {
        console.error('Error adding reply :', error);
        return {
            success: false,
            error: error.message || 'Failed to add reply'
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
            [TICKET_STATUSES.OPEN]: tickets.filter(t => t.status === TICKET_STATUSES.OPEN).length,
            [TICKET_STATUSES.IN_PROGRESS]: tickets.filter(t => t.status === TICKET_STATUSES.IN_PROGRESS).length,
            [TICKET_STATUSES.AWAITING_CUSTOMER_REPLY]: tickets.filter(t => t.status === TICKET_STATUSES.AWAITING_CUSTOMER_REPLY).length,
            [TICKET_STATUSES.AWAITING_AGENT_REPLY]: tickets.filter(t => t.status === TICKET_STATUSES.AWAITING_AGENT_REPLY).length,
            [TICKET_STATUSES.CLOSED]: tickets.filter(t => t.status === TICKET_STATUSES.CLOSED).length
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
            data: { [TICKET_STATUSES.OPEN]: 0, [TICKET_STATUSES.IN_PROGRESS]: 0, [TICKET_STATUSES.AWAITING_CUSTOMER_REPLY]: 0, [TICKET_STATUSES.AWAITING_AGENT_REPLY]: 0, [TICKET_STATUSES.CLOSED]: 0 }
        };
    }
}

export async function closeTicket(ticketId) {
    try {
        if (!ticketId) {
            throw new Error('Ticket ID is required');
        }

        const result = await updateStatus(ticketId, `${TICKET_STATUSES.CLOSED}`);
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

export async function startProgress(ticketId) {
    try {
        if (!ticketId) {
            throw new Error('Ticket ID is required');
        }

        const result = await updateStatus(ticketId, `${TICKET_STATUSES.IN_PROGRESS}`);
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
/// we need to assign ticket to department not user id
export async function assignTicket(ticketId, deptId) {
    try {
        if (!ticketId || !deptId) {
            throw new Error('Ticket ID and Department ID are required');
        }

        const result = await assignTicketService(ticketId, deptId);
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


export async function updateTicketAction(ticketid, { category_id, urgency_id, dept_id }) {
    try {
        const result = await updateTicket(ticketid,{ category_id, urgency_id, dept_id });
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