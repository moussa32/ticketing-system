"use client"
import toast from "react-hot-toast";
import {submitComplaint} from "./action";
import { useRouter } from "next/navigation";
import { useEffect ,useState} from "react";

export default function Complaint() {

   const route = useRouter();
      const [user, setUser] = useState(null);
    
      useEffect(() => {
         const userInfo = localStorage.getItem('user');
        const parsedUser = JSON.parse(userInfo);
        if(parsedUser)
          setUser(parsedUser);
      }, []);

  async function submit(formData) {
    formData.append("userId", user?.id);
    const res = await submitComplaint(formData);

    if (res.ok) toast.success(res.message);
    else toast.error(res.message);
  }
   

  return (
   <div className="flex flex-col min-h-screen bg-white">
     
      <main className="flex-1 p-20 items-center justify-center">
         <div className="text-center"><h1 className="text-xl font-semibold p-4">Submit a New Complaint</h1></div>
        <form
          action={submit}
          className="space-y-6 max-w-2xl mx-auto" 
        >
         
          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Ticket ID : <span className="text-red-500">*</span>
            </label>
            <input
              type="text" name="ticketID"
              placeholder="Enter the ticket ID"
              className="border rounded-md p-2 w-full"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Complaint : <span className="text-red-500">*</span>
            </label>
            <textarea
              name="complaint"
              placeholder="Write your complaint..."
              className="border rounded-md p-3 w-full h-32"
            />
          </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Submit Complaint
          </button>
          <button
            type="button"
           className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
          >
           Cancel
          </button>
          </div>
        </form>
      </main>
    </div>
  );
}
