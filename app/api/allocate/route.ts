import { NextResponse } from 'next/server'; import { allocateBed } from '@/lib/allocator'
export async function POST(request: Request) { const { severity } = await request.json(); if (!['Low','Moderate','High','Critical'].includes(severity)) return NextResponse.json({ error: 'Invalid severity' }, { status: 400 }); return NextResponse.json(allocateBed(severity)) }
