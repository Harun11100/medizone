import PatientForm from "@/components/ui/forms/PatientForm";
import PasskeyModal from "@/components/ui/PasskeyModal";

import Image from "next/image";
import Link from "next/link";




export default function Home({searchParams}:SearchParamProps) {
  
  const isAdmin=(searchParams.admin==='true')
  
  
  return (
    <div className="flex h-screen max-h-screen">
      {/* OTP verification */}
          {isAdmin && <PasskeyModal/> }
        

       <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[500px]">
          <Image 
          src='/assets/images/logo.png'
           alt="full-icon" 
           width={100}
           height={100}
           className="h-30"/>
           <PatientForm/>
           <div className="text-14-regular mt-20 flex justify-between">
           <p className="justify-items-end text-dark-600 xl:text-left">
           © 2024 MediZone
           </p>
           <Link href='/?admin=true' className="text-blue-400">
            admin
           </Link>
         
           </div>

        </div>
       
       </section>
       <Image src="/assets/images/onboarding_img.png"
       alt='patient'
       height={1000}
       width={1000}
       className="side-img max-w-[50%]"
       />

       
    </div>
   
  );
}

