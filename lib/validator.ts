import type { IntakePatient } from '@/types'
export function validateVitals(patient: IntakePatient) { return [patient.heartRate, patient.systolicBP, patient.diastolicBP, patient.oxygen, patient.temperature].every((value) => value !== null) }
export function validateOrFlag(patient: IntakePatient) { return validateVitals(patient) ? null : { status: 'FLAGGED' as const, reason: 'Incomplete vitals' } }
