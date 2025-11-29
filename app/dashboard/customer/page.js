"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardHome() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">

      {/* Top Bar */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-300 text-black">
        <h1 className="text-xl font-semibold">Welcome, Sarah</h1>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>Update Info</DropdownMenuItem>
            <DropdownMenuItem>Change Password</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Banner */}
      <div className="w-full h-48 flex items-center justify-center text-lg bg-white">
            <span className="text-black font-medium text-3xl font-size: xxx-large;">Welcome to Customer Portal</span>
      </div>

      {/* Main Buttons */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Button className="h-24 text-lg" ><Link href="/dashboard/customer/ticket">Create a New Ticket</Link></Button>
          <Button className="h-24 text-lg"><Link href="/dashboard/customer/ticket-view">View Tickets</Link></Button>
        </div>

        {/* Lower Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button variant="outline" className="h-20 text-lg">FAQ</Button>
          <Button variant="outline" className="h-20 text-lg">Help</Button>
          <Button variant="outline" className="h-20 text-lg">Help</Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-center gap-30 p-4 text-sm bg-black text-white">
        <span><a href="#">About</a></span>
        <span><a href="#">Help</a></span>
        <span>Copyright © 2026</span>
      </footer>
    </div>
  )
}
