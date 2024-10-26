
import RegisterForm from '@/components/ui/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.action';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Register = async ({params:{userId}}:SearchParamProps) => {

  const user= await getUser(userId);


  return (
      <div className="flex h-screen max-h-screen">


       <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex flex-1 flex-col py-10 ">
          <Image 
           src='/assets/images/logo.png'
           alt="full-icon" 
           width={100}
           height={100}
           className="h-40 w-fit mb-10"/>
 
           <RegisterForm user={user}/>
           
           <div className="text-14-regular mt-20 flex justify-between">
           <p className="justify-items-end text-dark-600 xl:text-left">
           © 2024 MediZone
           </p>
           <Link href='/?admin=true' className="text-blue-400">
           Admin</Link>
         
           </div>

        </div>
       
       </section>
       <Image src="/assets/images/register-img.jpg"
       alt='register'
       height={1000}
       width={1000}
       className="side-img max-w-[390px]"
       />

       
    </div>
  )
}

export default Register;