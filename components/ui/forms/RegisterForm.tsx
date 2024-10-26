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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import Image from "next/image"

import { Doctors, GenderOptions, IdentificationTypes } from "@/constant"
import { SelectItem } from "../select"
import { Label } from "../label"
import { FileUploader } from "../FileUploader"





const RegisterForm=({user}:{user:User})=> {
  const router=useRouter()
  // 1. Define your form.
  const [isLoading,setIsLoading]=useState(false)

  const form= useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
      defaultValues: {
      
           name: "",
           email:"",
           phone:''
    },
  });

  // 2. Define a submit handler.
   const onSubmit= async (values: z.infer<typeof UserFormValidation>)=>{
    
    setIsLoading(true);

    try{

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
                         className="flex h-11 gap-6 xl:justify-between"
                         onValueChange={field.onChange}
                         defaultValue={field.value}
                         >{
                              GenderOptions.map((option,i)=>(
                                    <div key={option+i}>
                                          <RadioGroupItem
                                          value={option} 
                                          id={option}
                                          />
                                          <Label htmlFor={option} classNmae="cursor-pointer">
                                                {option}
                                          </Label>
                                    </div>
                              ))
                         }

                        </RadioGroup>
                  </FormControl>
              )}
               />
             </div>

             <div className="flex flex-col gap-5 xl:flex-row">

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="Kashimpur Gazipur "
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder=" Software Engineer"
            />
             </div>


             <div className="flex flex-col gap-5 xl:flex-row">
             <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />
             </div>
             </section>
            <section className="space-y-6">
                  <h2 className=" sub-header text-dark-700">Medical Information</h2>
          
                  <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
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


             <div className="flex flex-col gap-5 xl:flex-row">
                  <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="insuranceProvider"
                  label="Insurance Provider"
                  placeholder="Live Long Life"
                  />
                  <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name='insurancePolicyNumber'
                  label="Insurance Policy Number"
                  placeholder="ERF34234DF4"/>

             </div>

             <div className="flex flex-col gap-5 xl:flex-row">

                   <CustomFormField
                   fieldType={FormFieldType.TEXTAREA}
                   control={form.control}
                   name="allergies"
                   label="Allergies"
                   placeholder="Peanuts Mashroom"
                   />
                   <CustomFormField
                   fieldType={FormFieldType.TEXTAREA}
                   control={form.control}
                   name="currentMedications"
                   label="Current Medications"
                   placeholder="Napa -500mg"
                   />

             </div>
             <div className="flex flex-col gap-5 xl:flex-row  xl:gap-8 xl:w-full">
                   <CustomFormField
                   fieldType={FormFieldType.TEXTAREA}
                   control={form.control}
                   name="familyMedicalHistory"
                   label="Family Medical History (if relevant)"
                   placeholder="Father has Diabates"
                   />
                   <CustomFormField
                   fieldType={FormFieldType.TEXTAREA}
                   control={form.control}
                   name="pastMedicalHistory"
                   label="Past Medical History"
                   placeholder="Asthma diagnosis"
                   />
             </div>
             </section>
              <section space-y-6>
                  <div mb-9 space-y-1>
                        <h2 className="sub-header ">
                              Identification and Verification
                        </h2>
                  </div>
                  <div className="flex flex-col gap-5">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="identificationType"
              label="Identification Type"
              placeholder="Select Identification Type">

              {IdentificationTypes.map((type,i)=>(
                  <SelectItem key={type+i} value={type}>
                        {type}
                  </SelectItem>
              ))}
              </CustomFormField>

              <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='identificationNumber'
              label="Identification Number"
              placeholder="0234349234"/>

               <CustomFormField
               fieldType={FormFieldType.SKELETON}
               control={form.control}
               name="identificationDocument"
               label="Scanned copy of Identification Document"
               
               renderSkeleton={(field)=>(
                  <FormControl>
                        <FileUploader files={field.value} 
                        onChange={field.onChange}/>
                  </FormControl>
               )}
            />

                  </div>
           
           </section>

           <section className=" space-y-6">
            <div className="mb-9 space-y-1 ">
                  <h2 className="sub-header">
                        Consent and Privacy
                  </h2>
            </div>

            <CustomFormField 
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition"
            />
            
            <CustomFormField 
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to use the disclosure of my health information for treatment purpose"
            />
            
            <CustomFormField 
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that i have reviewed and agree to the privacy policy"
            />
           </section>
                 
      <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
      
      </form>
    </Form>
  )
}

export default RegisterForm;
