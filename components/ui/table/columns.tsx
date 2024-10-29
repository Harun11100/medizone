"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../button"
import { ArrowUpDown } from "lucide-react"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constant"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"



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
  id:'actions',
  header:()=><div className="pl-4"> Actions</div>,
  cell:({row:{original:data}})=>(
    <div className="flex gap-1">
          <AppointmentModal 
          type='schedule' 
          patientId={data.patient.$id}
          userId={data.userId}
          appointment={data}
          title='Schedule Appointment'
          description='Please confirm the following details to schedule'

          />
           <AppointmentModal 
          type='cancel' 
          patientId={data.patient.$id}
          userId={data.userId}
          appointment={data}
      
          />
         
    </div>
  )
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
