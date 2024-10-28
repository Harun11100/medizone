import clsx from 'clsx'
import Image from 'next/image'


interface statCardProps{

      type:"canceled"|"pending"|'appointments'
      label:string
      count:number
      icon:string
}


const StatCard = ({count=0,type,icon,label}:statCardProps) => {

      console.log(icon)
  return (
   <div className={clsx('stat-card',{
      'bg-appointments':type === 'appointments',
      'bg-pending':type ==='pending',
      'bg-cancelled':type==='canceled'
   })}> 
        <div className='flex items-center gap-4'>
             <Image
             src={icon}
             alt={label}
             width={32}
             height={32}
             className='size-8 w-fit'/>

        <h2 className='text-32-bold text-white'>{count}</h2>
             
        </div>
        <p className='text-24-regular'>{label}</p>
   </div>
  )
}

export default StatCard