'use client'

import React from 'react'
import {
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
    } from "@/components/ui/form";
import 'react-phone-number-input/style.css'
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from './PatientForm'
import Image from 'next/image'
import PhoneInput from 'react-phone-number-input'

interface CustomProps{
      control:Control<any>,
      fieldType:FormFieldType,
      name:string,
      label?:string,
      placeholder?:string,
      iconSrc?:string,
      iconAlt?:string,
      disabled?:boolean,
      dateFormat?:string,
      showTimeSelect:boolean,
      children?:React.ReactNode,
      renderSkeleton?:(field:any)=>React.ReactNode



}
const RenderInput=({field,props}:{field:any; props:CustomProps})=>{
      // switch case use is much efficient this type of case
      const {fieldType,iconAlt,iconSrc,placeholder}=props;
 switch (fieldType) {
      case FormFieldType.INPUT:
            
          return(
            <div className='flex rounded-md border border-dark-500'>
                {iconSrc && 
                <Image src={iconSrc} alt={iconAlt||'icon'} width={25} height={25} 
                className='ml-2'/>}
                <FormControl>
                <Input 
                 placeholder={placeholder}
                 {...field}
                 className='shad-input border-0 bg-black'
                />
                </FormControl>
                

            </div>
          )
      case FormFieldType.PHONE_INPUT:
            return(
                 
                      <FormControl>
          <PhoneInput
            defaultCountry="BD"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
             
                  

            )

      default:
            break;
     }


      
}


const CustomFormField = (props:CustomProps) => {
      const {control,fieldType,name,label}=props;

  return (
      <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType!==FormFieldType.CHECKBOX && label &&
          (
           <FormLabel>{label}</FormLabel>
          )}
           
           <RenderInput field={field} props={props}/>
           <FormMessage className='shad-error'/>

        </FormItem>
      )}
    />
  )
}

export default CustomFormField