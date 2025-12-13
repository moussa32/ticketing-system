"use client";

import { saveTicket } from "./action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function TicketHTML({ categories, departments }) {


    const route = useRouter();
    
async function handleSubmit(formData) {
    const res = await saveTicket(formData);

    if (res.ok) toast.success(res.message);
    else toast.error(res.message);
  }



  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="flex items-center justify-center p-4 bg-white border-b border-gray-300 text-black">
        <h1 className="text-xl font-semibold">Create a New Ticket</h1>
      </header>

      <main className="flex-1 p-6">
        <form
          action={handleSubmit}
          className="space-y-6 max-w-2xl mx-auto" 
        >
          {/* Department */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Department <span className="text-red-500">*</span>
            </label>
            <select name="department"
              className="border rounded-md p-2"
            >
              <option value="">Select Department</option>
              {departments.map((dept)=> (
                <option key={dept.dept_id} value={dept.dept_id}>
                  {dept.dept_name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Category <span className="text-red-500">*</span>
            </label>
            <select name="category"
              className="border rounded-md p-2"
            >
              <option value="">Select Category</option>
              {categories.map((cat)=> (
                <option
                  key={cat.category_id}
                  value={cat.category_id + "," + cat.urgency_id}
                >
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text" name="subject"
              placeholder="Enter the subject of your ticket"
              className="border rounded-md p-2 w-full"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Write your ticket description..."
              className="border rounded-md p-3 w-full h-32"
            />
          </div>

          {/* Attachment */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Attachment</label>
            <input
              type="file" name="attachment"
              className="border rounded-md p-2"
            />
          </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Submit Ticket
          </button>
          <button
            type="button"
           className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
           onClick={()=>{route.push('/customer/')}}
          >
           Cancel
          </button>
          </div>
        </form>
      </main>
    </div>
  );
}
