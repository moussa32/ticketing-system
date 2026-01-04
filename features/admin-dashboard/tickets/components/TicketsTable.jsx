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

export default function TicketsTable({ tickets }) {
  const getStatusBadge = (status) => {
    const statusColors = {
      Open: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
      "In Progress": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
      Pending: "bg-purple-100 text-purple-800 hover:bg-purple-100/80",
      Resolved: "bg-green-100 text-green-800 hover:bg-green-100/80",
      Closed: "bg-gray-100 text-gray-800 hover:bg-gray-100/80",
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
                  key={ticket.ticket_id}
                  className="hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  <TableCell className="font-mono text-gray-500 pl-6">
                    #{ticket.ticket_id}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-medium text-gray-900 truncate">
                        {ticket.subject}
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
                    {ticket.Category ? (
                      <Badge variant="outline" className="font-normal">
                        {ticket.Category.category_name}
                      </Badge>
                    ) : (
                      <span className="text-gray-400 italic text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {ticket.Urgency &&
                      getPriorityBadge(ticket.Urgency.urgency_name)}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-400 italic">-</span>
                  </TableCell>
                  <TableCell>
                    {ticket.User ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
                            {ticket.User.first_name?.[0]}
                            {ticket.User.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-700">
                          {ticket.User.first_name} {ticket.User.last_name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {ticket.created_at
                      ? new Date(ticket.created_at).toLocaleDateString()
                      : "-"}
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
