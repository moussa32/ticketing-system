"use client"

import "../../globals.css";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white border-b border-gray-300 text-black">
        <h1 className="text-xl font-semibold">Welcome, Sarah</h1>

        {/* SIMPLE HTML DROPDOWN */}
        <div className="relative group">
          <button className="flex items-center gap-2 cursor-pointer">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-black font-bold">
              SR
            </div>
          </button>

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md hidden group-hover:block">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Update Info</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Change Password</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Logout</a>
          </div>
        </div>
      </header>

      {/* MAIN AREA */}
        {children}
        <Toaster />
      {/* FOOTER */}
      <footer className="flex justify-center gap-10 p-4 text-sm bg-black text-white">
        <a href="#">About</a>
        <a href="#">Help</a>
        <span>Copyright © 2026</span>
      </footer>

    </div>
  );
}
