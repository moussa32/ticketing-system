import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TICKET_STATUSES } from '../../../../app/constants/constants.js';
 

export default function TicketsTable({ tickets }) {
  const getStatusBadge = (status) => {
    const statusColors = {
      [TICKET_STATUSES.OPEN]: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
      [TICKET_STATUSES.IN_PROGRESS]: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
      [TICKET_STATUSES.AWAITING_CUSTOMER_REPLY]: "bg-purple-100 text-purple-800 hover:bg-purple-100/80",
      [TICKET_STATUSES.AWAITING_AGENT_REPLY]: "bg-orange-100 text-orange-800 hover:bg-orange-100/80",
      [TICKET_STATUSES.CLOSED]: "bg-gray-100 text-gray-800 hover:bg-gray-100/80",
    };

    return (
      <Badge
        className={`font-medium border-0 shadow-none ${statusColors[status]}`}
      >
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityColors = {
      Low: "bg-gray-100 text-gray-700 hover:bg-gray-100/80",
      Medium: "bg-blue-100 text-blue-700 hover:bg-blue-100/80",
      High: "bg-orange-100 text-orange-700 hover:bg-orange-100/80",
      Urgent: "bg-red-100 text-red-700 hover:bg-red-100/80",
    };

    return (
      <Badge
        className={`font-medium border-0 shadow-none ${priorityColors[priority]}`}
      >
        {priority}
      </Badge>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">All Tickets</h2>
        <p className="text-sm text-gray-500">
          Manage and track all support tickets
        </p>
      </div>
      <div className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-gray-100">
              <TableHead className="pl-6">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-muted-foreground"
                >
                  No tickets available
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  className="hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  <TableCell className="font-mono text-gray-500 pl-6">
                    #{ticket.id}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-medium text-gray-900 truncate">
                        {ticket.title}
                      </p>
                      {ticket.description && (
                        <p className="text-sm text-gray-500 truncate">
                          {ticket.description}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>
                    {ticket.category ? (
                      <Badge variant="outline" className="font-normal">
                        {ticket.category.name}
                      </Badge>
                    ) : (
                      <span className="text-gray-400 italic text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {ticket.category &&
                      ticket.category.urgency &&
                      getPriorityBadge(ticket.category.urgency.urgency_name)}
                  </TableCell>
                  <TableCell>
                    {ticket.assignedAgent ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {ticket.assignedAgent.firstName[0]}
                            {ticket.assignedAgent.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-700">
                          {ticket.assignedAgent.firstName}{" "}
                          {ticket.assignedAgent.lastName}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">
                        Unassigned
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
                          {ticket.user.firstName[0]}
                          {ticket.user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-700">
                        {ticket.user.firstName} {ticket.user.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
