// pages/index.tsx

import ChipInput from "@/components/ChipInput";
import { useState } from "react";

export default function Home() {
 const list: { name: string; img: string; email: string }[] = [
   {
     name: "John Smith",
     img: "/men1.jpg",
     email: "john@example.com",
   },
   {
     name: "Alice Johnson",
     img: "/women1.jpg",
     email: "alice@example.com",
   },
   {
     name: "Crist Martinez",
     img: "/women2.jpg",
     email: "crist@example.com",
   },
   {
     name: "Eddi Brown",
     img: "/men2.jpg",
     email: "eddi@example.com",
   },
   {
     name: "Sofy Davis",
     img: "/women3.jpg",
     email: "sofy@example.com",
   },
   {
     name: "Maya Miller",
     img: "/women4.webp",
     email: "maya@example.com",
   },
   {
     name: "David Wilson",
     img: "/men1.jpg",
     email: "david@example.com",
   },
   {
     name: "Emma Anderson",
     img: "/women1.jpg",
     email: "emma@example.com",
   },
   {
     name: "Ryan Taylor",
     img: "/women2.jpg",
     email: "ryan@example.com",
   },
   {
     name: "Lily White",
     img: "/men2.jpg",
     email: "lily@example.com",
   },
   {
     name: "Tom Harris",
     img: "/women3.jpg",
     email: "tom@example.com",
   },
   {
     name: "Olivia Clark",
     img: "/women4.webp",
     email: "olivia@example.com",
   },
   {
     name: "Jake Turner",
     img: "/men1.jpg",
     email: "jake@example.com",
   },
   {
     name: "Sophie Brown",
     img: "/women1.jpg",
     email: "sophie@example.com",
   },
   {
     name: "Chris Mitchell",
     img: "/women2.jpg",
     email: "chris@example.com",
   },
   {
     name: "Ava Davis",
     img: "/men2.jpg",
     email: "ava@example.com",
   },
   {
     name: "Daniel Johnson",
     img: "/women3.jpg",
     email: "daniel@example.com",
   },
 ];


  return (
    <div className="mx-4 sm:mx-20 mt-10 flex flex-col gap-10">
      <h1 className="text-blue-500 text-center font-bold text-xl sm:text-3xl">Pick Users</h1>
      <ChipInput items={list}  />
    </div>
  );
}
