import NewAppointmentForm from "@/components/ui/forms/NewAppointmentForm";

import { getPatient, getUser } from "@/lib/actions/patient.action";
// import { UserRoundIcon } from "lucide-react";
import Image from "next/image";
// import { redirect } from "next/navigation";



const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {

  const patient =await getPatient(userId)


return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/images/logo.png"
            height={100}
            width={100}
            alt="patient"
            className="mb-12 h-30 w-fit"
          / >

          <NewAppointmentForm type='create' userId={userId}
          patientId={patient.$id} 
           />

          <p className="copyright py-12">© 2024 MediZone</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;