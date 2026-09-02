import { NextResponse } from 'next/server'
import { IntakeService } from '@/src/services'
export async function GET(){return NextResponse.json(await new IntakeService().getQueue())}
