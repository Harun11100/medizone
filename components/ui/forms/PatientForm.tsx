"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "../form"
import CustomFormField from "./CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/Validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"



export enum FormFieldType{

      INPUT ='input',
      TEXTAREA='textarea',
      PHONE_INPUT='phoneInput',
      CHECKBOX='checkBox',
      DATE_PICKER='datePicker',
      SELECT='select',
      SKELETON='skeleton',

}




const PatientForm=()=> {
  const router=useRouter()
  // 1. Define your form.
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
   async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    const {name,email,phone}=values
    setIsLoading(true);

    try{

    const userData={name,email,phone}
    
    const user= await createUser(userData);

    if(user) router.push(`/patients/${user.id}/register`)


    }catch(error){
          console.log(error)
    }
  }

  return(
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 flex-1">
            <section className="mb-5 space-y-4">
                  
                   <h1 className="header"> Hello there</h1>
                   <p className='text-dark-700'>Login to make a schedule to an Apointment </p>
            </section>
            <CustomFormField
             fieldType={FormFieldType.INPUT}
             control={form.control}
             name='name'
             label='Full name'
             placeholder='harun'
             iconSrc='/assets/icons/user.svg'
             iconAlt='user'

             />
             
              <CustomFormField
             fieldType={FormFieldType.INPUT}
             control={form.control}
             name='email'
             label='Email'
             placeholder='harun@gmail.com'
             iconSrc='/assets/icons/email.svg'
             iconAlt='email'

             />
              <CustomFormField
             fieldType={FormFieldType.PHONE_INPUT}
             control={form.control}
             name='phone'
             label='Phone Number'
             placeholder='+8801632705569'
             
             />
        
        
      <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      
      </form>
    </Form>
  )
}

export default PatientForm
