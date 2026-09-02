import { NextResponse } from 'next/server'; import { intakePatients } from '@/lib/schema'
export async function GET() { return NextResponse.json(intakePatients) }
