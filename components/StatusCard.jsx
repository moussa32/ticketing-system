export default function StatusCard({ title, count, icon, color }) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{count}</p>
        </div>
        <div className={`text-2xl p-3 rounded-lg ${
          color === 'blue' ? 'bg-blue-50 text-blue-600' :
          color === 'yellow' ? 'bg-yellow-50 text-yellow-600' :
          color === 'purple' ? 'bg-purple-50 text-purple-600' :
          color === 'green' ? 'bg-green-50 text-green-600' :
          'bg-gray-50 text-gray-600'
        }`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
