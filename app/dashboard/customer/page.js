import UsersList from '@/components/ui/UsersList';
import { getUsers } from "@/lib/services/userService";

export default async  function Page() {
  const users = await getUsers(); // runs on server
    return (
      <>
    <main className="flex items-center justify-center md:h-screen">
         <UsersList users={users} />
    </main>
    </> 
    )
   
}