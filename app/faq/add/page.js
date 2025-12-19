
"use client"
import toast from "react-hot-toast";
import {submitFAQ} from "./action";
export default function FAQAdd() {

    async function submit(formData) {
        // Placeholder for submitFAQ action
        const res = await submitFAQ(formData);
        if (res.ok) toast.success(res.message);
        else toast.error(res.message);  
    }


  return (
   <div className="flex flex-col min-h-screen bg-white">
     
      <main className="flex-1 p-20 items-center justify-center">
         <div className="text-center"><h1 className="text-xl font-semibold p-4">Submit a New FAQ</h1></div>
        <form
          action={submitFAQ}
          className="space-y-6 max-w-2xl mx-auto" 
        >
         
          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Question : <span className="text-red-500">*</span>
            </label>
            <input
              type="text" name="question"
              placeholder="Enter the question"
              className="border rounded-md p-2 w-full"
            />
          </div>

         
          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Answer : <span className="text-red-500">*</span>
            </label>
            <textarea
              name="answer"
              placeholder="Write your answer..."
              className="border rounded-md p-3 w-full h-32"
            />
          </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Submit FAQ
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
