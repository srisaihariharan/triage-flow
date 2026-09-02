import { NextResponse } from 'next/server'
import { TriageIntegrationService } from '@/src/services'
export async function GET(){ try{return NextResponse.json(await new TriageIntegrationService().processQueue())}catch(error){return NextResponse.json({error:'Pipeline processing failed',detail:error instanceof Error?error.message:'Unknown error'},{status:500})} }
export const POST=GET
