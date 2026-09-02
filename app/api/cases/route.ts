import { NextResponse } from 'next/server'
import { TriageIntegrationService } from '@/src/services'
export async function GET(){return NextResponse.json((await new TriageIntegrationService().processQueue()).cases)}
