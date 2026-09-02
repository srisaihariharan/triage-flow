import { NextResponse } from 'next/server'
import wards from '@/data/wards.json'
import { normalizeWard } from '@/src/domain/schema'
export async function GET(){return NextResponse.json((wards as Record<string,unknown>[]).map(normalizeWard))}
