export default function UsersList({ users }) {
  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold">Users</h2>

      {users.map((u) => (
        <div key={u.id} className="border p-3 my-2 rounded">
          <p>{u.firstName} {u.lastName}</p>
          <p className="text-gray-600">{u.email}</p>
        </div>
      ))}
    </div>
  );
}
