'use client'

import React from 'react'
import {
      
      FormControl,
      FormDescription,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
    } from "@/components/ui/form"
    import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from './PatientForm'

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
//      switch (key) {
//       case value:
            
//             break;
     
//       default:
//             break;
//      }


      
}


const CustomFormField = (props:CustomProps) => {
      const {control,fieldType,name,label}=props;

  return (
      <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage /> */}

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