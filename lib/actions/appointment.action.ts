'use server'

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, BUCKET_ID, DATABASE_ID, databases, ENDPOINT,  messaging,  PROJECT_ID } from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";



export const createAppointment=async (appointment:CreateAppointmentParams) =>{

      try {
             
            const newAppointment = await databases.createDocument(
                  DATABASE_ID!,
                  APPOINTMENT_COLLECTION_ID!,
                  ID.unique(),
                  appointment
                )

                return parseStringify(newAppointment);
        
      } catch (error) {
                  console.log(error)
    
        
      }
    
    }
    
    export const getAppointment = async(appointmentId:string)=>{

         try {
            
           const appointment= await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
            

           )
           
          return parseStringify(appointment)

         } catch (error) {
            console.log(error)
         }

    }

    export const getRecentAppointmentList= async ()=>{

      try {
        
         const appointment =await databases.listDocuments(
          DATABASE_ID !,
          APPOINTMENT_COLLECTION_ID ! ,
          [Query.orderDesc('$createdAt')]
         )
         
         const initialCounts={
          scheduledCount:0,
          pendingCount:0,
          cancelledCount:0
         }
      const counts =(appointment.documents as Appointment[]).reduce((accumulator,appointment)=>{



           if(appointment.status === 'scheduled'){
            accumulator.scheduledCount+=1
           }else if(appointment.status === 'pending'){
            accumulator.pendingCount+=1
           }else if(appointment.status === 'cancelled'){
            accumulator.cancelledCount+=1
           
           }
           return accumulator

      },initialCounts)

        const dataObj ={
            totalCount :appointment.total,
            ...counts,
            documents:appointment.documents
            

        }
        return  parseStringify(dataObj)

      } catch (error) {
        console.log(error)
      }

    }


     export const updateAppointment = async ({appointmentId,userId,appointment,type}:UpdateAppointmentParams)=>{


         try {
        const updatedAppointment =await databases.updateDocument(
          DATABASE_ID !,
          APPOINTMENT_COLLECTION_ID !,
          appointmentId,
          appointment

        )
         if (!updatedAppointment) {
          throw new Error("Appointment no found");
          
          
         }
         
          // sms notification
          const smsMessage=`Hello! 
           ${type==='schedule'?`Your appointment has been scheduled for ${formatDateTime(appointment.schedule!).dateTime} with Dr${appointment.primaryPhysician}.`:`Sorry ! Your appointment has been  Cancelled , For the following reason: ${appointment.cancellationReason} `}`


         await sendSMSnotification(userId,smsMessage)

         revalidatePath('/admin')
         return parseStringify(updatedAppointment)
          
         } catch (error) {
          console.log(error)
         }



     }


     export const sendSMSnotification= async(userId:string,content:string) =>{

      try {

        const message= await messaging.
        createSms(
          ID.unique(),
          content,
          [],
          [userId] 
        )
         return parseStringify(message)
      } catch (error) {
        console.log(error)
      }

     }