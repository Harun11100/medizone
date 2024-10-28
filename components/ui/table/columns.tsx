"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu"
import { Button } from "../button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constant"
import Image from "next/image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Appointments = {
  id: string
  amount: number
  status: "pending" | "p" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  
{
  header:"ID",
  cell:({row})=><p>{row.index+1}</p>

},
{
  accessorKey:'patient' ,
  header:'Patient',
  cell:({row})=> <p>{row.original.patient.name}</p>
  

},
{
  accessorKey: "status",
  header: "Status",
  cell:({row})=>(
    <div className="min-w-[115px]">
      <StatusBadge status={row.original.status}/>
    </div>
  )
},

{
   accessorKey:'schedule',
   header :"Appointment",
   cell:({row})=>(
    <p className="tex-14-regular min-w-[100px]">
      {formatDateTime(row.original.schedule).dateTime}
    </p>
   )
},
{
     accessorKey:'primaryPhysician',
     header:'Doctor',
     cell:({row})=>{

        const doctor=Doctors.find(doctor=>doctor.name===row.original.primaryPhysician)
        
         return (
          <div className=" flex items-center gap-3">
            <Image 
            src={doctor?.image}
            alt='doctor'
            height={100}
            width={100}
            className="size-8"
              />
              <p className="whitespace-nowrap">
                Dr .{doctor?.name}

              </p>
          </div>
         )

     }
},















  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">

              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  
  

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]
