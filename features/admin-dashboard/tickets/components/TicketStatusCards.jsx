import StatusCard from '../../../../components/StatusCard';
import { ClipboardList, Timer, Hourglass, CheckCircle, Lock } from 'lucide-react';
import { TICKET_STATUSES } from '../../../../app/constants/constants.js';


export default function TicketStatusCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <StatusCard
        title={TICKET_STATUSES.OPEN}
        count={stats[TICKET_STATUSES.OPEN] || 0}
        icon={<ClipboardList className="w-6 h-6" />}
        color="blue"
      />
      <StatusCard
        title={TICKET_STATUSES.IN_PROGRESS}
        count={stats[TICKET_STATUSES.IN_PROGRESS] || 0}
        icon={<Timer className="w-6 h-6" />}
        color="yellow"
      />
      <StatusCard
        title={TICKET_STATUSES.AWAITING_CUSTOMER_REPLY}
        count={stats[TICKET_STATUSES.AWAITING_CUSTOMER_REPLY] || 0}
        icon={<Hourglass className="w-6 h-6" />}
        color="purple"
      />
      <StatusCard
        title={TICKET_STATUSES.AWAITING_AGENT_REPLY}
        count={stats[TICKET_STATUSES.AWAITING_AGENT_REPLY] || 0}
        icon={<CheckCircle className="w-6 h-6" />}
        color="green"
      />
      <StatusCard
        title={TICKET_STATUSES.CLOSED}
        count={stats[TICKET_STATUSES.CLOSED] || 0}
        icon={<Lock className="w-6 h-6" />}
        color="gray"
      />
    </div>
  );
}
