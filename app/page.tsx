import PatientForm from "@/components/ui/forms/PatientForm";
import { Button } from "@/components/ui/ui/button";
import Image from "next/image";
import Link from "next/link";




export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* OTP verification */}

       <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
          src='/assets/icons/logo-full.svg'
           alt="full-icon" 
           width={1000}
           height={1000}
           className="h-10 mb-12 w-fit"/>
           <PatientForm/>
           <div className="text-14-regular mt-20 flex justify-between">
           <p className="justify-items-end text-dark-600 xl:text-left">
           © 2024 MediZone
           </p>
           <Link href='/?admin=true' className="text-blue-400">
           Admin</Link>
         
           </div>

        </div>
       
       </section>
       <Image src="/assets/images/onboarding-img.png"
       alt='patient'
       height={1000}
       width={1000}
       className="side-img max-w-[50%]"
       />

       
    </div>
   
  );
}
