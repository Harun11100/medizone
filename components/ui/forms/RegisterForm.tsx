"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl } from "../form"
import CustomFormField from "./CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/Validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"
import { FormFieldType } from "./PatientForm"
import { RadioGroup } from "../ui/radio-group"



// export enum FormFieldType{

//       INPUT ='input',
//       TEXTAREA='textarea',
//       PHONE_INPUT='phoneInput',
//       CHECKBOX='checkBox',
//       DATE_PICKER='datePicker',
//       SELECT='select',
//       SKELETON='skeleton',

// }




const RegisterForm=({user}:{user:User})=> {
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
   const onSubmit= async (values: z.infer<typeof UserFormValidation>)=>{
    
    setIsLoading(true);

    try{

    // const userData={name,email,phone}
    
    // const user= await createUser(userData);

      const user ={
        name:values.name,
        email:values.email,
        phone:values.phone
      }
      
      const newUser=await createUser(user);


    if(newUser) router.push(`/patients/${newUser.$id}/register`)

    }catch(error){
          console.log(error)
    }
  }

  return(
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
            <section className="space-y-4">
                  
                   <h1 className="header">Welcome</h1>
                   <p className='text-dark-700'>Let us know about yourself </p>
            </section>
            <section className="space-y-6">
                  <div className="mb-9 space-y-1">
                    <h2 className=" sub-header text-dark-700">Personal Information</h2>
                  </div>

            <CustomFormField
             fieldType={FormFieldType.INPUT}
             control={form.control}
             name='name'
             label="Full name"
             placeholder='harun'
             iconSrc='/assets/icons/user.svg'
             iconAlt='user'
             />
             <div className="flex gap-6 flex-col xl:flex-row">
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
             </div>  
            </section>
            {/* <section className="space-y-6">
                  <h2 className=" sub-header text-dark-700">Medical Information</h2>
            </section> */}


             <div className="flex flex-col gap-5 xl:flex-row">
             <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
            />
              <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name='gender'
              label="Gender"
              renderSkeleton={(field)=>(
                  <FormControl>
                        <RadioGroup
                        >

                        </RadioGroup>
                  </FormControl>
              )}
               />

             </div>
             <div className="flex flex-col gap-5 xl:flex-row">

             </div>
             <div className="flex flex-col gap-5 xl:flex-row">

             </div>
             <div className="flex flex-col gap-5 xl:flex-row">

             </div>
             <div className="flex flex-col gap-5 xl:flex-row">

             </div>
             <div className="flex flex-col gap-5 xl:flex-row">

             </div>
             <div className="flex flex-col gap-5 xl:flex-row">

             </div>


              
      <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      
      </form>
    </Form>
  )
}

export default RegisterForm;
