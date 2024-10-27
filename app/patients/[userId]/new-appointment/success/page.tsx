import { Button } from '@/components/ui/button';
import { Doctors } from '@/constant';
import { getAppointment } from '@/lib/actions/appointment.action';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  const appointmentId = (searchParams?.userId as string) || '';
  let appointment;
  let doctor;

  try {
    // Fetch the appointment details
    appointment = await getAppointment(appointmentId);

    // Access the primary physician from the last document
    const primaryPhysician = appointment.documents[appointment.documents.length - 1]?.primaryPhysician;
    
    // Find the matching doctor in the Doctors array
    doctor = Doctors.find(doc => doc.name === primaryPhysician);

  } catch (error) {
    console.error("Failed to fetch appointment details:", error);
    return (
      <div className="error-message">
        <p>Unable to load appointment details. Please try again later.</p>
        <Link href="/">
          <Button variant="outline">Go Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="h-25 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />

          <h2 className="header mb-6 max-w-[500px] text-center">
            Your <span className="text-orange-400">appointment request</span> has been successfully submitted.
          </h2>
          <p className="text-orange-200">We'll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested Appointment Details</p>
          <div className="flex flex-col items-center">
            {doctor?.image && (
              <Image
                src={doctor.image}
                alt="doctor"
                width={50}
                height={50}
                
              />
            )}
            <p className="whitespace-nowrap">{doctor?.name}</p>
          </div>

          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={30}
              height={30}
            />
            <p>{formatDateTime(appointment.documents[appointment.documents.length - 1]?.schedule)?.dateTime || 'Schedule not available'}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copywrite">© 2024 MediZone</p>
      </div>
    </div>
  );
};

export default Success;
