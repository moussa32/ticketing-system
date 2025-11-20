import UsersList from '@/components/ui/UsersList';
import { getUsers } from "@/lib/services/userService";
import en from "@/messages/en.json";

export default async  function Page() {
  const users = await getUsers(); // runs on server
    return (
      <>
      <div c><h1>{en["login.title"]}</h1></div>
    <main className="flex items-center justify-center md:h-screen">
         <UsersList users={users} />
    </main>
    </> 
    )
   
}