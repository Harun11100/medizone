import { StatusIcon } from '@/constant'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

const StatusBadge = ({status}:{status:Status}) => {

  return (
    <div className={clsx('status-badge',{
        'bg-green-600':status ==='scheduled',
         'bg-red-800 ':status ==='cancelled',
         'bg-yellow-100':status ==='pending'
    })

    }>
      <Image
      src={StatusIcon[status]}
      alt='status-icon'
      width={25}
      height={25}
      className='h-full w-3'
      />
      <p className={clsx('text-12-semibold capitalize',{
         'text-orange-700':status === 'scheduled',
          'text-orange-900':status === 'pending',
           'text-gray-400':status === 'cancelled'
      })}>{status}</p>
    </div>
  )
}

export default StatusBadge