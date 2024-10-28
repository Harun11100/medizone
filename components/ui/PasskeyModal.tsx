 'use client'

import React, { useEffect, useState } from 'react'
import {
      AlertDialog,
      AlertDialogAction,
   
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
    
    } from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import {
      InputOTP,
      InputOTPGroup,
      InputOTPSlot,
    } from "@/components/ui/input-otp"
import { encryptKey } from '@/lib/utils'

    
const PasskeyModal = () => {

     const router=useRouter()
     const path =usePathname()
     const [open,setOpen]=useState(true)
     const [passKey,setPasskey]=useState('')
     const [error,setError]=useState('')
     const closeModal=()=>{
      setOpen(false);
      router.push('/')
 
}    

      const encriptedKey = typeof window !=='undefined'? window.localStorage.getItem('accessKey'):null
      
      useEffect(()=>{

            if(path) {
                  if (passKey===process.env.NEXT_PUBLIC_ADMIN_PASSKEY){    
                  setOpen(false)
                  router.push('/admin')
                  }
            }else{
                  setError('Invalid Passkey, Please try again later')
                 }



      },[encriptedKey])
      

      const validatePasskey=(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
           e.preventDefault()
           if (passKey===process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
            const encriptedKey= encryptKey(passKey)

            localStorage.setItem('accessKey',encriptedKey)
            setOpen(false)
            router.push('/admin')
           }else{
            setError('Invalid Passkey, Please try again later')
           }
      }


  return (
      <AlertDialog open={open} onOpenChange={setOpen}>
      
      <AlertDialogContent className='shad-alert-dialog'>
        <AlertDialogHeader className='flex items-start justify-between'>
          <AlertDialogTitle className='flex header'>
            
            Admin access <span className='text-orange-500'> verification</span> 
            <Image src='/assets/icons/close.svg'
            alt='close'
            width={20}
            height={20}
            onClick={()=>closeModal()}
            className='cursor-pointer'/>

          </AlertDialogTitle>
          <AlertDialogDescription>
           To access the admin page, please enter the passkey
          </AlertDialogDescription>
        </AlertDialogHeader>
         <div className=''>
                <InputOTP maxLength={6} value={passKey} onChange={(value)=>setPasskey(value)}>
                  <InputOTPGroup className='shad-otp'>
                  < InputOTPSlot className='shad-otp-slot' index={0} />
                  < InputOTPSlot className='shad-otp-slot' index={1} />
                  < InputOTPSlot className='shad-otp-slot' index={2} />
                  < InputOTPSlot className='shad-otp-slot' index={3} />
                  < InputOTPSlot className='shad-otp-slot' index={4} />
                  < InputOTPSlot className='shad-otp-slot' index={5} />
                  </InputOTPGroup>
               </InputOTP>
              { error && (
                  <div>
                        <p className='shad-error tex-14-regular mt-4 flex justify center'>{error}</p>
                  </div>
              ) }
            
         </div>


        <AlertDialogFooter>
          
          <AlertDialogAction onClick={e=>validatePasskey(e)} className='shad-primary-btn w-full'>Enter Admin Passkey</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PasskeyModal