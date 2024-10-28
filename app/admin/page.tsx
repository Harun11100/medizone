import {DataTable} from '@/components/ui/table/DataTable'
import StatCard from '@/components/ui/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointment.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {columns, Payment} from '@/components/ui/table/columns'



const Admin = async () => {



      const appointments = await getRecentAppointmentList()

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-11'>
       <header className='admin-header'>

            <Link  href="/" className='cursor-pointer'>
               <Image 
               src='/assets/icons/icon.svg'
               alt='logo'
               width={50}
               height={50}
               className='h-15'
               />
            </Link>
            <p className='text-white font-bold text-xl'>Admin Dashboard</p>
       </header>

       <main className='admin-main'>
            <section className='w-full space-y-4'>
                  <h1 className='header'>Welcome!<span className='text-orange-500'> Admin</span></h1>
                  <p className='text-dark-600'>Start the day with managing new appointment</p>
            </section>

            <section className='admin-stat'>
              <StatCard
              type='appointments'
              count={appointments.scheduledCount}
              label='Scheduled Appointment'
              icon='/assets/icons/appointments.svg'
              />
              <StatCard
              type='pending'
              count={appointments.pendingCount}
              label='Pending Appointment'
              icon='/assets/icons/pending.svg'
              />
              <StatCard
              type='cancelled'
              count={appointments.cancelledCount}
              label='Cancelled Appointment'
              icon='/assets/icons/cancelled.svg'
              />
            </section>
            <section className=' '>
               <DataTable columns={columns} data={appointments.documents}/>
              
           
            </section>

       </main>
      
      
      </div>
  )
}

export default Admin