
import RegisterForm from '@/components/ui/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.action';
import Image from 'next/image';
import React from 'react'

const Register = async ({params:{userId}}:SearchParamProps) => {

  const user= await getUser(userId);


  return (
      <div className="flex h-screen max-h-screen">


       <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10 ">
          <Image 
           src='/assets/images/logo.png'
           alt="full-icon" 
           width={100}
           height={100}
           className="h-40 w-fit mb-10"/>
 
           <RegisterForm user={user}/>
           <p className=" copyright py-10 ">
           © 2024 MediZone
           </p>
           

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