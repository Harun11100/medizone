"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl } from "../form"
import CustomFormField, { FormFieldType } from "./CustomFormField"
import SubmitButton from "../SubmitButton" 
import { useState } from "react"
import { PatientFormValidation} from "@/lib/Validation"
import { useRouter } from "next/navigation"

import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import Image from "next/image"

import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constant"
import { SelectItem } from "../select"
import { Label } from "../label"
import { FileUploader } from "../FileUploader"
import { registerPatient } from "@/lib/actions/patient.action"





const RegisterForm=({user}:{user:User})=> {
  const router=useRouter()
  // 1. Define your form.
  const [isLoading,setIsLoading]=useState(false);

  const form= useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
      defaultValues: {
            ...PatientFormDefaultValues,
           name:user.name,
           email:user.email,
           phone:user.phone
    },
  });

  // 2. Define a submit handler.
   const onSubmit= async (values: z.infer<typeof PatientFormValidation>)=>{
    setIsLoading(true);
// store file into form data
    let formData;
    if(values.identificationDocument && values.identificationDocument?.length>0){
         
      // blobFile is special type of file that only broser can read
      const blobFile= new Blob([values.identificationDocument[0]],{
           
            type:values.identificationDocument[0].type,
      });

      formData= new FormData();
      formData.append('blobFile',blobFile);
      formData.append ('fileName',values.identificationDocument[0].name)

    }

    try{
         const patientData={
            ...values,
            userId:user.$id,
            birthDate:new Date(values.birthDate),
            identificationDocument:formData,
         }
         //@ts-ignore
         const patient= await registerPatient(patientData)
      
         if(patient) router.push(`/patients/${user.$id}/new-appointment`);

    }catch(error){
          console.log('this error comes from registerForm',error)
    }
  }



  return(
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
            <section className="flex flex-col gap-5">
                  
                   <h1 className="header">Welcome</h1>
                   <p className='text-dark-700'>Let us know about yourself </p>
           
         
                  <div className="py-5">
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
             <div className="flex gap-7 flex-col xl:flex-row">


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
            
             <div className="flex flex-col gap-7 xl:flex-row">
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
                         className="flex h-11 gap-3 xl:justify-between"
                         onValueChange={field.onChange}
                         defaultValue={field.value}
                         >{
                              GenderOptions.map((option,i)=>(
                                    <div key={option+i} className="radio-group">
                                          <RadioGroupItem
                                          value={option} 
                                          id={option}
                                          />
                                          <Label htmlFor={option} className="cursor-pointer">
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

             <div className="flex flex-col gap-7 xl:flex-row">

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


             <div className="flex flex-col gap-7 xl:flex-row">
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
            <section className=" flex flex-col gap-6 ">
                  <div className="py-7">
                        <h2 className=" sub-header text-dark-700">Medical Information</h2>
          
                  </div>
                  
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


             <div className="flex flex-col gap-12 xl:flex-row">
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

             <div className="flex flex-col gap-12 lg:flex-row">

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
             <div className="flex flex-col gap-5">
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
              <section className="py-10 flex flex-col gap-5">
                  <div  >
                        <h2 className="sub-header py-7">
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

           <section className="py-10 flex flex-col gap-5">
            <div className="py-7">
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
