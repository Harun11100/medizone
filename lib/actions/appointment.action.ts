'use server'

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, BUCKET_ID, DATABASE_ID, databases, ENDPOINT,  PROJECT_ID } from "../appwrite.config";
import { parseStringify } from "../utils";
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
         revalidatePath('/admin')
          
         } catch (error) {
          console.log(error)
         }



     }