import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Admin = () => {
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
            <p className='text-red-500 text-xl'>Admin Dashboard</p>
       </header>

       <main className='admin-main'>
            <section className='w-full space-y-4'>
                  <h1 className='header'>Welcome</h1>
                  <p className='text-dark-600'>Start the day with managing new appointment</p>
            </section>
            <section className='admin-stat'>
 
            </section>

       </main>
      
      
      </div>
  )
}

export default Admin