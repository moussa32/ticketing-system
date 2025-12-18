import { Category, Department, ReplyTicket, Ticket, Urgency, Users } from "../../lib/database/models";
import { saveUploadedFile, deleteUploadedFile } from "./fileService";
import { Op } from "sequelize";
export async function viewTickets() {
    try {
        const tickets = await Ticket.findAll({
            where: { dept_id: 2 },
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
            return {
                ticket_id: Number(json.ticket_id),
                subject: String(json.subject || ''),
                description: String(json.description || ''),
                status: String(json.status || ''),
                user_id: json.user_id ? Number(json.user_id) : null,
                dept_id: Number(json.dept_id),
                category_id: json.category_id ? Number(json.category_id) : null,
                urgency_id: json.urgency_id ? Number(json.urgency_id) : null,
                created_at: json.created_at ? new Date(json.created_at).toISOString() : null,
                updated_at: json.updated_at ? new Date(json.updated_at).toISOString() : null,
                User: json.User ? {
                    user_id: Number(json.User.user_id),
                    first_name: String(json.User.first_name || ''),
                    last_name: String(json.User.last_name || ''),
                    email: String(json.User.email || '')
                } : null,
                Department: json.Department ? {
                    dept_id: Number(json.Department.dept_id),
                    dept_name: String(json.Department.dept_name || '')
                } : null,
                Category: json.Category ? {
                    category_id: Number(json.Category.category_id),
                    category_name: String(json.Category.category_name || '')
                } : null,
                Urgency: json.Urgency ? {
                    urgency_id: Number(json.Urgency.urgency_id),
                    urgency_name: String(json.Urgency.urgency_name || ''),
                    duration: String(json.Urgency.duration || '')
                } : null
            };
        });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error;
    }
}
export async function viewTicket(ticketId = 1) {
    try {
        const ticket = await Ticket.findByPk(ticketId, {
            include: [
                {
                    model: User,
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
        const rep_tickets = await ReplyTicket.findAll({
            where: { ticket_id: ticketId },
            include: [
                {
                    model: User,
                    attributes: ['user_id', 'first_name', 'last_name']
                }
            ]
        })
        
        // Ensure proper serialization
        const ticketJson = ticket.toJSON();
        const serializedTicket = {
            ticket_id: Number(ticketJson.ticket_id),
            subject: String(ticketJson.subject || ''),
            description: String(ticketJson.description || ''),
            status: String(ticketJson.status || ''),
            user_id: ticketJson.user_id ? Number(ticketJson.user_id) : null,
            dept_id: Number(ticketJson.dept_id),
            category_id: ticketJson.category_id ? Number(ticketJson.category_id) : null,
            urgency_id: ticketJson.urgency_id ? Number(ticketJson.urgency_id) : null,
            created_at: ticketJson.created_at ? new Date(ticketJson.created_at).toISOString() : null,
            updated_at: ticketJson.updated_at ? new Date(ticketJson.updated_at).toISOString() : null,
            User: ticketJson.User ? {
                user_id: Number(ticketJson.User.user_id),
                first_name: String(ticketJson.User.first_name || ''),
                last_name: String(ticketJson.User.last_name || ''),
                email: String(ticketJson.User.email || '')
            } : null,
            Department: ticketJson.Department ? {
                dept_id: Number(ticketJson.Department.dept_id),
                dept_name: String(ticketJson.Department.dept_name || '')
            } : null,
            Category: ticketJson.Category ? {
                category_id: Number(ticketJson.Category.category_id),
                category_name: String(ticketJson.Category.category_name || '')
            } : null,
            Urgency: ticketJson.Urgency ? {
                urgency_id: Number(ticketJson.Urgency.urgency_id),
                urgency_name: String(ticketJson.Urgency.urgency_name || ''),
                duration: String(ticketJson.Urgency.duration || '')
            } : null
        };
        
        const serializedReplies = rep_tickets.map(rt => {
            const rtJson = rt.toJSON();
            // return {
            //     reply_id: Number(rtJson.reply_id),
            //     reply_message: String(rtJson.reply_message || ''),
            //     ticket_id: Number(rtJson.ticket_id),
            //     user_id: Number(rtJson.user_id),
            //     created_at: rtJson.created_at ? new Date(rtJson.created_at).toISOString() : null,
            //     updated_at: rtJson.updated_at ? new Date(rtJson.updated_at).toISOString() : null,
            //     attachments: rtJson["attachments"] ? String(rtJson.attachments) : null,
            //     User: rtJson.User ? {
            //         user_id: Number(rtJson.User.user_id),
            //         first_name: String(rtJson.User.first_name || ''),
            //         last_name: String(rtJson.User.last_name || '')
            //     } : null
            // };
            return rtJson;
        });
        
        return { ticket: serializedTicket, rep_tickets: serializedReplies };
    } catch (error) {
        console.error("Error fetching tickets:", error);
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

export async function replayTicket(ticketId, replyMessage, userId, attachments = []) {
    try {
        const ticket = await Ticket.findByPk(ticketId);
        if (!ticket) {
            throw new Error("Ticket not found");
        }

        // Process file uploads
        let fileUrls = [];
        for (const attachment of attachments) {
            if (attachment && attachment.buffer) {
                const fileResult = await saveUploadedFile(attachment.buffer, attachment.originalName);
                if (fileResult.success) {
                    fileUrls.push(fileResult.url);
                }
            }
        }

        const rep_ticket = await ReplyTicket.create({
            reply_message: replyMessage,
            ticket_id: ticketId,
            user_id: userId,
            created_at: new Date(),
            updated_at: new Date(),
            attachments: fileUrls.length > 0 ? JSON.stringify(fileUrls) : null
        })
        await rep_ticket.save();
        
        // Ensure proper serialization
        const rtJson = rep_ticket.toJSON();
        return {
            reply_id: Number(rtJson.reply_id),
            reply_message: String(rtJson.reply_message || ''),
            ticket_id: Number(rtJson.ticket_id),
            user_id: Number(rtJson.user_id),
            created_at: rtJson.created_at ? new Date(rtJson.created_at).toISOString() : null,
            updated_at: rtJson.updated_at ? new Date(rtJson.updated_at).toISOString() : null,
            attachments: rtJson.attachments ? String(rtJson.attachments) : null
        };
    } catch (error) {
        console.error("Error replying to ticket:", error);
        throw error;
    }
}
export async function deleteTicket(ticketId) {
    try {
        const ticket = await Ticket.findByPk(ticketId);
        if (!ticket) {
            throw new Error("Ticket not found");
        }
        const replies = await ReplyTicket.findAll({ where: { ticket_id: ticketId } });
        for (const reply of replies) {
            await reply.destroy();
        }
        await ticket.destroy();
        return { message: "Ticket deleted successfully" };
    } catch (error) {
        console.error("Error deleting ticket:", error);
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
        return {
            ticket_id: Number(tJson.ticket_id),
            subject: String(tJson.subject || ''),
            description: String(tJson.description || ''),
            status: String(tJson.status || ''),
            user_id: tJson.user_id ? Number(tJson.user_id) : null,
            dept_id: Number(tJson.dept_id),
            category_id: tJson.category_id ? Number(tJson.category_id) : null,
            urgency_id: tJson.urgency_id ? Number(tJson.urgency_id) : null,
            created_at: tJson.created_at ? new Date(tJson.created_at).toISOString() : null,
            updated_at: tJson.updated_at ? new Date(tJson.updated_at).toISOString() : null
        };
    } catch (error) {
        console.error("Error assigning ticket:", error);
        throw error;
    }
}
export async function updateTicket(ticketid, { subject, description, category_id, urgency_id, dept_id }) {
    try {
        const ticket = await Ticket.findByPk(ticketid);
        if (!ticket) {
            throw new Error("Ticket not found");
        }
        if (subject !== undefined)
            ticket.subject = subject;
        if (description !== undefined)
            ticket.description = description;
        if (category_id !== undefined)
            ticket.category_id = category_id;
        if (urgency_id !== undefined)
            ticket.urgency_id = urgency_id;
        if (dept_id !== undefined)
            ticket.dept_id = dept_id;
        await ticket.save();
        
        // Ensure proper serialization
        const tJson = ticket.toJSON();
        return {
            ticket_id: Number(tJson.ticket_id),
            subject: String(tJson.subject || ''),
            description: String(tJson.description || ''),
            status: String(tJson.status || ''),
            user_id: tJson.user_id ? Number(tJson.user_id) : null,
            dept_id: Number(tJson.dept_id),
            category_id: tJson.category_id ? Number(tJson.category_id) : null,
            urgency_id: tJson.urgency_id ? Number(tJson.urgency_id) : null,
            created_at: tJson.created_at ? new Date(tJson.created_at).toISOString() : null,
            updated_at: tJson.updated_at ? new Date(tJson.updated_at).toISOString() : null
        };
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

        // Convert to number to ensure proper comparison
        const deptId = parseInt(departmentId, 10);
        
        const users = await User.findAll({
            where: { 
                dept_id: deptId,
                role_id: { [Op.ne]: 3 } // Exclude customers (role_id 3)
            },
            attributes: ['user_id', 'first_name', 'last_name', 'email', 'dept_id'],
            order: [['first_name', 'ASC']],
            raw: true // Important: Get plain objects, not Sequelize instances
        });
        
        // Ensure all data is serializable
        return users.map(user => ({
            user_id: Number(user.user_id),
            first_name: String(user.first_name || ''),
            last_name: String(user.last_name || ''),
            email: String(user.email || ''),
            dept_id: Number(user.dept_id)
        }));
    } catch (error) {
        console.error("Error fetching department users:", error);
        return []; // Return empty array instead of throwing
    }
}