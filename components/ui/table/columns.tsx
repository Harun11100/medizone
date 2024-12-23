"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../button"
import { ArrowUpDown } from "lucide-react"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constant"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"
import { Appointment } from "@/types/appwrite.types"



export type Appointments = {
  id: string
  amount: number
  status: "pending" | "p" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Appointment>[] = [
  
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
         const appointment=row.original
        const doctor=Doctors.find((doc)=>doc.name===appointment.primaryPhysician)
        
         return (
          <div className=" flex items-center gap-3">
            <Image 
            src={doctor?.image!}
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
  cell:({row})=>{
      const appointment = row.original;
    return(
    <div className="flex gap-1">
          <AppointmentModal 
          type='schedule' 
          patientId={appointment.patient.$id}
          userId={appointment.userId}
          appointment={appointment}
          title='Schedule Appointment'
          description='Please confirm the following details to schedule'

          />
           <AppointmentModal 
          type='cancel' 
          patientId={appointment.patient.$id}
          userId={appointment.userId}
          appointment={appointment}
      
          />
         
    </div>
  )
}
},

]
