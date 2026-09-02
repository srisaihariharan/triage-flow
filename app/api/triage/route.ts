import { NextResponse } from 'next/server'
import { RawPatientSchema } from '@/src/domain/schema'
import { normalizePatient, scorePatient, validateVitals } from '@/src/services'
export async function POST(request:Request){const body=await request.json().catch(()=>null);const parsed=RawPatientSchema.safeParse(body);if(!parsed.success)return NextResponse.json({error:'Malformed patient record',issues:parsed.error.issues},{status:400});const patient=normalizePatient(parsed.data);const validation=validateVitals(patient);if(validation.status==='FLAGGED')return NextResponse.json(validation);return NextResponse.json({status:'VALID',...scorePatient(patient)})}
