
import RegisterForm from '@/components/ui/forms/RegisterForm';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Register = () => {
  return (
      <div className="flex h-screen max-h-screen">
      {/* OTP verification */}

       <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[500px]">
          <Image 
          src='/assets/images/logo.png'
           alt="full-icon" 
           width={100}
           height={100}
           className="h-30"/>

           <RegisterForm/>
           
           <div className="text-14-regular mt-20 flex justify-between">
           <p className="justify-items-end text-dark-600 xl:text-left">
           © 2024 MediZone
           </p>
           <Link href='/?admin=true' className="text-blue-400">
           Admin</Link>
         
           </div>

        </div>
       
       </section>
       <Image src="/assets/images/register_img.png"
       alt='register'
       height={1000}
       width={1000}
       className="side-img max-w-[390px]"
       />

       
    </div>
  )
}

export default Register;