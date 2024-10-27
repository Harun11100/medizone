import { Button } from '@/components/ui/button';
import { Doctors } from '@/constant';
import { getAppointment } from '@/lib/actions/appointment.action';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

  const Success = async ({params:{userId},searchParams}:SearchParamProps) => {

 const appointmentId =(searchParams?.appointmentId as string)|| '';
 const appointment = await getAppointment(appointmentId)

  const doctor =Doctors.find((doc)=>doc.name===appointment.primaryPhysician)
  

  return (
    <div className='h-screen max-h-screen px-[5%]'>

        <div className='success-img'>

            <Link href='/'>

                  <Image 
                  
                  src='/assets/images/logo.png'
                  alt='logo'
                  width={100}
                  height={100}
                  className='h-25 w-fit'
                  />
            
            </Link>

            <section className=' flex flex-col items-center'>
                 <Image 
                 src='/assets/gifs/success.gif'
                 height={300}
                 width={280}
                 alt='success'
                 />
           
            <h2 className='header mb-6 max-w-[500px] text-center'>
              Your <span className='text-orange-400'>appointment request</span> has been successfully submitted. 

            </h2>
            <p className='text-orange-200'>we'll in be touch shortly to confirm.</p>
            </section>
            <section className='request-details'>
                  <p>Requested Appointment details</p>
                 <div>
                     
                     <Image
                     src={`/assets/images/ ${doctor}.png`}
                     alt='doctor'
                     width={100}
                     height={100}
                     className=''/>
                     <p className='whitespace-nowrap'>Dr.{doctor?.name}</p>
                     
                 </div>

                 <div className='flex gap-2'>
                      <Image
                      src='/assets/icons/calender.svg'
                      alt='calender'
                      width={100}
                      height={100}
                      />
                      <p>{formatDateTime(appointment.schedule).dateTime}</p>

                 </div>

            </section>
            <Button variant='outline' className='shad-primary-btn' asChild>
                  <Link href={`/patients/${userId}/new-appointment`} >
                  New Appointment</Link>

            </Button>
            <p className='copywrite'> © 2024 MediZone</p>

        </div>
    </div>
  )
}

export default Success