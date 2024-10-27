"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "../form"
import CustomFormField, { FormFieldType } from "./CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { CreateAppointmentSchema, getAppointmentSchema, UserFormValidation } from "@/lib/Validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"

import "react-phone-number-input/style.css";
import Image from "next/image"
import { Doctors } from "@/constant"
import { SelectItem } from "../select"
import { createAppointment } from "@/lib/actions/appointment.action"



const NewAppointmentForm=({userId,patientId,type}:{
      userId:string;
      patientId:string;
      type:'create' | 'cancel'|'schedule'
 
})=> {
  const router=useRouter()
  
  const [isLoading,setIsLoading]=useState(false)

  const AppointmentValidation=getAppointmentSchema(type);

  const form= useForm<z.infer<typeof AppointmentValidation>>({
    resolver: zodResolver(AppointmentValidation),
      defaultValues: {
       primaryPhysician:'',
       schedule:new Date(),
       reason:'',
       note:'',
       cancellationReason:''
    },
  })

  // 2. Define a submit handler.
   const onSubmit= async (values: z.infer<typeof AppointmentValidation>)=>{
    setIsLoading(true);
    
     let status;

     switch (type) {
      case  'schedule' :
             status='scheduled'
            break;
      case  'cancel' :
              status='canceled'
              break;

      default:
            status='pending'
            break;
     }

     try {

      if(type==='create' && patientId){
            

            const appointmentData={
                  userId,
                  patient: patientId,
                  primaryPhysician: values.primaryPhysician,
                  schedule: new Date(values.schedule),
                  reason:values.reason!,
                  note:values.note!,
                  cancellationReason:values.cancellationReason!,
                  status:status as Status,


            }
            const appointment = await createAppointment(appointmentData)
            
            if(appointment) {  
                  form.reset()
                  router.push(`/patients/${userId}/new-appointment/success?appointmentId= ${appointment.id}`)
            }
                  

      }
     } catch (error){
        console.log('Error comes from Appointment',error)
     }
   }

    let buttonLabel;

    switch (type) {
      case 'cancel':
            buttonLabel='Cancel Appointment'
            break;
       case 'create':
            buttonLabel= 'Create Appointment'
            break;
      case 'schedule':
            buttonLabel ='Schedule Appointment'  
            break; 
      default:
            break;
    }





  return(
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
            <section className="mb-5 space-y-4">
                  
                   <h1 className="header">Welcome to the Appointment section</h1>
                   <p className='text-dark-700'> Make an appointment schedule in 10 seconds </p>
            </section>
            

            {type !=='cancel' &&(
                  <>
                  <div className=" border flex flex-col gap-5 px-3 py-3 border-gray-600">
           
                   <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a doctor"
            >{
                  Doctors.map((doctor,i)=>(
                        <SelectItem key={doctor.name+i} value={doctor.name}>
                              <div className="flex cursor-pointer items-center gap-2">
                                    <Image
                                    src={doctor.image}
                                    alt='doctor'
                                    height={32}
                                    width={32}
                                    className="rounded-full border border-dark-500"
                                    />
                                    <p>{doctor.name}</p>

                              </div>
                        </SelectItem>
                  ))
            }
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected Appointment Date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />


            <div className="flex flex-col gap-5 xl:flex-row">
                   <div>
                   <CustomFormField
                   fieldType={FormFieldType.TEXTAREA}
                   control={form.control}
                   name="reason"
                   label="Reason For Appointment"
                   placeholder="Ex: annual monthly checkup "
                   />
                   </div>
                   <div>
                   <CustomFormField
                   fieldType={FormFieldType.TEXTAREA}
                   control={form.control}
                   name="note"
                   label="Additional comments/notes"
                   placeholder="Ex: Prefer afternoon appointments if possible "
                   />
                   </div>
                  
             </div>
           </div>         
                  </>
            )}
            {
                  type==='cancel'&&(
                        <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="Enter reason for cancellation "
                        /> 
                  )
            }
             
             <div className="py-5">
              <SubmitButton className={`${type==='cancel'?'shad-danger-btn':'shad-primary-btn'} w-full`} isLoading={isLoading}>{buttonLabel}</SubmitButton>
             </div>
      </form>
    </Form>
  )
}

export default NewAppointmentForm;

