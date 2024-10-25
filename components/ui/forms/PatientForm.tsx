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
        name: "harun",
        email:"harun@gmail.com",
        phone:"+8801746083370"
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

export default PatientForm;


// 'use client'

// import { ENDPOINT, PROJECT_ID ,API_KEY} from "@/lib/appwrite.config";
// import { Client, Account } from "appwrite";
// import * as sdk from 'node-appwrite'
// // Initialize Apwrite client
// // const client = new Client()

// //     .setEndpoint(ENDPOINT!) // Your Appwrite endpoint
// //     .setProject(PROJECT_ID!); // Your Appwrite project ID
// const client =new sdk.Client

// client
// .setEndpoint(ENDPOINT!)
// .setProject(PROJECT_ID!)
// .setKey(API_KEY!)


// // Initialize Account Service
// const account = new Account(client);

// // Function to register a new user
// async function registerUser(email, password, name) {
//     try {
//         const response = await account.create(
//             'unique()',      // Use a unique ID or Appwrite's 'unique()' to auto-generate an ID
//             email,           // User's email
//             password,        // User's password
//             name             // User's name
//         );
        
//         console.log('User created successfully:', response);
//         return response;
//     } catch (error:any) {
//         console.error('Failed to create user:', error.message);
//         throw error;
//     }
// }

// // Usage example
// const userData = {
//     name: "Harun",
//     email: "harun@example.com",
//     password: "strongpassword"
// };

// // Call the function to create a user
// registerUser(userData.email, userData.password, userData.name);
