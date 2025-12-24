import { Category, Department, ReplyTicket, Ticket, Urgency, UserDepartment, Users } from "../../lib/database";
import { TicketAttach } from "../../lib/database";
import { Op } from "sequelize";
import { cookies } from 'next/headers'
import { validateUserAccess } from "./authService";
export async function viewTickets() {
    try {
        const u = (await cookies()).get("token");
        const userSkInfo = await validateUserAccess(u ? u.value : null);
        if (userSkInfo == null) {
            throw new Error("Unauthorized access");
        }
        const user = await UserDepartment.findOne({
            where: { user_id: userSkInfo.id },
        });
        if (!user) {
            throw new Error("User not found");
        }
        if (user == null) {
            throw new Error("Unauthorized access");
        }
        const tickets = await Ticket.findAll({
            where: { dept_id: user.dept_id },
            include: [
                {
                    model: Users,
                    attributes: ['user_id', 'first_name', 'last_name', 'email']
                },
                {
                    model: Department,
                    attributes: ['dept_id', 'dept_name']
                },
                {
                    model: Urgency,
                    attributes: ['urgency_id', 'urgency_name', 'duration']
                },
                {
                    model: Category,
                    attributes: ['category_id', 'category_name']
                }
            ]
        });

        // Ensure proper serialization
        return tickets.map(ticket => {
            const json = ticket.toJSON();
            return json;
        });
    } catch (error) {
        console.error("Error fetching3 tickets:", error);
        throw error;
    }
}
export async function viewTicket(ticketId = 1) {
    try {
        const ticket = await Ticket.findByPk(ticketId, {
            include: [
                {
                    model: Users,
                    attributes: ['user_id', 'first_name', 'last_name', 'email']
                },
                {
                    model: Department,
                    attributes: ['dept_id', 'dept_name']
                },
                {
                    model: Urgency,
                    attributes: ['urgency_id', 'urgency_name', 'duration']
                },
                {
                    model: Category,
                    attributes: ['category_id', 'category_name']
                }
            ]
        });
        if (!ticket) {
            throw new Error("Ticket not found");
        }

        // Fetch ticket attachments
        const attachments = await TicketAttach.findAll({
            where: { ticket_id: ticketId }
        });

        const rep_tickets = await ReplyTicket.findAll({
            where: { ticket_id: ticketId },
            include: [
                {
                    model: Users,
                    attributes: ['user_id', 'first_name', 'last_name']
                }
            ]
        })

        // Ensure proper serialization
        const ticketJson = ticket.toJSON();

        const serializedReplies = rep_tickets.map(rt => {
            const rtJson = rt.toJSON();
 
            return rtJson;
        });

        return { ticket: { ...ticketJson, attachments: attachments.map(att => ({ id: att.id, url: att.url })) }, rep_tickets: serializedReplies };
    } catch (error) {
        console.error("Error fetching2 tickets:", error);
        throw error;
    }

}
export async function updateStatus(ticketId, status) {
    try {
        const ticket = await Ticket.findByPk(ticketId);
        if (!ticket) {
            throw new Error("Ticket not found");
        }
        ticket.status = status;
        await ticket.save();
        return ticket.toJSON();
    } catch (error) {
        console.error("Error updating ticket status:", error);
        throw error;
    }
}

export async function replayTicket(ticketId, replyMessage) {
    try {
        const ticket = await Ticket.findByPk(ticketId);
        if (!ticket) {
            throw new Error("Ticket not found");
        } const u = (await cookies()).get("token");
        console.log("Cookie token:", u ? u.value : 'No token found');
        const userSkInfo = await validateUserAccess(u ? u.value : null);
        console.log("User SK Info:", userSkInfo);
        if (userSkInfo == null) {
            throw new Error("Unauthorized access");
        }



        const rep_ticket = await ReplyTicket.create({
            reply_message: replyMessage,
            ticket_id: ticketId,
            user_id: userSkInfo.id,
            created_at: new Date(),
            updated_at: new Date(),
        })
        await rep_ticket.save();

        // Ensure proper serialization
        const rtJson = rep_ticket.toJSON();
        return rtJson;
    } catch (error) {
        console.error("Error replying to ticket:", error);
        throw error;
    }
}

export async function assignTicket(ticketId, userId) {
    try {
        const ticket = await Ticket.findByPk(ticketId);
        if (!ticket) {
            throw new Error("Ticket not found");
        }
        ticket.user_id = userId;
        await ticket.save();

        // Ensure proper serialization
        const tJson = ticket.toJSON();
        return tJson;
    } catch (error) {
        console.error("Error assigning ticket:", error);
        throw error;
    }
}
export async function updateTicket(ticketid, { category_id, urgency_id, dept_id }) {
    try {
        const ticket = await Ticket.findByPk(ticketid);
        if (!ticket) {
            throw new Error("Ticket not found");
        }
        
        if (category_id !== undefined)
            ticket.category_id = category_id;
        if (urgency_id !== undefined)
            ticket.urgency_id = urgency_id;
        if (dept_id !== undefined)
            ticket.dept_id = dept_id;
        await ticket.save();

        // Ensure proper serialization
        const tJson = ticket.toJSON();
        return tJson;
    } catch (error) {
        console.error("Error updating ticket:", error);
        throw error;
    }
}
export async function getCategory() {
    try {
        const categories = await Category.findAll();
        return categories.map(category => category.toJSON());
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}
export async function getDepartment() {
    try {
        const departments = await Department.findAll();
        return departments.map(department => department.toJSON());
    }
    catch (error) {
        console.error("Error fetching departments:", error);
        throw error;
    }
}
export async function getUrgency() {
    try {
        const urgencies = await Urgency.findAll();
        return urgencies.map(urgency => urgency.toJSON());
    }
    catch (error) {
        console.error("Error fetching urgencies:", error);
        throw error;
    }
}

export async function getDepartmentUsers(departmentId) {
    try {
        if (!departmentId) {
            return [];
        }

        const u = (await cookies()).get("token");
        const userSkInfo = await validateUserAccess(u ? u.value : null);
        if (userSkInfo == null) {
            throw new Error("Unauthorized access");
        }
        // Convert to number to ensure proper comparison
        // const deptId = parseInt(departmentId, 10);

        const users = await Department.findAll();
        
        // Ensure all data is serializable
        return users.map(userDept => userDept.toJSON());
    } catch (error) {
        console.error("Error fetching department users:", error);
        return []; 
    }
}