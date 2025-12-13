import StatusCard from '../../../../components/StatusCard';
import { ClipboardList, Timer, Hourglass, CheckCircle, Lock } from 'lucide-react';

export default function TicketStatusCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <StatusCard
        title="Open"
        count={stats.open || 0}
        icon={<ClipboardList className="w-6 h-6" />}
        color="blue"
      />
      <StatusCard
        title="In Progress"
        count={stats.inProgress || 0}
        icon={<Timer className="w-6 h-6" />}
        color="yellow"
      />
      <StatusCard
        title="Pending"
        count={stats.pending || 0}
        icon={<Hourglass className="w-6 h-6" />}
        color="purple"
      />
      <StatusCard
        title="Resolved"
        count={stats.resolved || 0}
        icon={<CheckCircle className="w-6 h-6" />}
        color="green"
      />
      <StatusCard
        title="Closed"
        count={stats.closed || 0}
        icon={<Lock className="w-6 h-6" />}
        color="gray"
      />
    </div>
  );
}
