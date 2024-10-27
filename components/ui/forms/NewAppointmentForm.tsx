"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "../form"
import CustomFormField, { FormFieldType } from "./CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/Validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"

import "react-phone-number-input/style.css";
import Image from "next/image"
import { Doctors } from "@/constant"
import { SelectItem } from "../select"



const NewAppointmentForm=({user}:{Users:user})=> {
  const router=useRouter()
  
  const [isLoading,setIsLoading]=useState(false)

  const form= useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
      defaultValues: {
        name: "",
        email:"",
        phone:""
    },
  })

  // 2. Define a submit handler.
   const onSubmit= async (values: z.infer<typeof UserFormValidation>)=>{
    setIsLoading(true);
    
    try {
      const uuser = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const user = await createUser(uuser);

      if (user) {
        router.push(`/patients/${user.$id}/registers`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  

  return(
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
            <section className="mb-5 space-y-4">
                  
                   <h1 className="header">Welcome to the Appointment section</h1>
                   <p className='text-dark-700'> Make an appointment schedule in 10 seconds </p>
            </section>
           <div className=" border flex flex-col gap-5 px-3 py-3 border-gray-600">
           <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a physician"
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
            <div className="flex flex-col gap-5 lg:flex-row">
                   <div>
                   <CustomFormField
                   fieldType={FormFieldType.TEXTAREA}
                   control={form.control}
                   name="familyMedicalHistory"
                   label="Reason For Appointment"
                   placeholder="Ex: annual monthly checkup "
                   />
                   </div>
                   <div>
                   <CustomFormField
                   fieldType={FormFieldType.TEXTAREA}
                   control={form.control}
                   name="pastMedicalHistory"
                   label="Additional comments/notes"
                   placeholder="Ex: Prefer afternoon appointments if possible "
                   />
                   </div>
                  
             </div>

             <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Expected Appointment Date"
            />
             <div className="py-5">
              <SubmitButton isLoading={isLoading}>Get started and continue</SubmitButton>
             </div>

            
           </div>
           

        
     
      
      </form>
    </Form>
  )
}

export default NewAppointmentForm;

