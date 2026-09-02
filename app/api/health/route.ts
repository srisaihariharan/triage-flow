import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
export async function GET(){const files=['intake.json','wards.json','staff.json','clinical-reference.json'];const sources=Object.fromEntries(files.map(f=>[f,fs.existsSync(path.join(process.cwd(),'data',f))]));const healthy=Object.values(sources).every(Boolean);return NextResponse.json({status:healthy?'ok':'degraded',sources},{status:healthy?200:503})}
