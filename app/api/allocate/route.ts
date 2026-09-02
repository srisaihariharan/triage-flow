import { NextResponse } from 'next/server'
import { BedAllocationSolver } from '@/src/services'
export async function POST(request:Request){const body=await request.json().catch(()=>null);const severity=body?.severity;if(!['LOW','MODERATE','HIGH','CRITICAL'].includes(severity))return NextResponse.json({error:'Invalid severity',expected:['LOW','MODERATE','HIGH','CRITICAL']},{status:400});return NextResponse.json(new BedAllocationSolver().allocate(severity))}
