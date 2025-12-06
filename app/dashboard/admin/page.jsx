import TicketStatusCards from '@/features/admin-dashboard/tickets/components/TicketStatusCards';
import TicketsTable from '@/features/admin-dashboard/tickets/components/TicketsTable';
import { getTicketStats, getAllTickets } from '@/features/admin-dashboard/tickets/actions/ticketActions';

export default async function AdminPage() {
  // Fetch data using server components
  const [ticketStats, tickets] = await Promise.all([
    getTicketStats(),
    getAllTickets()
  ]);

  return (
    <>
      {/* Ticket Status Cards */}
      <TicketStatusCards stats={ticketStats} />

      {/* Tickets Table */}
      <div>
        <TicketsTable tickets={tickets} />
      </div>
    </>
  );
}