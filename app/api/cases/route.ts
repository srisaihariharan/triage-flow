import { NextResponse } from 'next/server'; import { getCases } from '@/lib/schema'
export async function GET() { return NextResponse.json(getCases()) }
