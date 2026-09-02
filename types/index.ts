export type Vital = number | null
export type Severity = 'Low' | 'Moderate' | 'High' | 'Critical'
export type TriageStatus = 'VALID' | 'FLAGGED'
export interface IntakePatient { id: string; name: string; age: number; gender: string; heartRate: Vital; systolicBP: Vital; diastolicBP: Vital; oxygen: Vital; temperature: Vital; symptoms: string[] }
export interface Ward { ward: string; beds: number; staff: number; capacity: number }
export interface TriageResult { score?: number; severity?: Severity; status: TriageStatus; reason?: string }
export interface TriageCase { id: string; patient: { name: string; age: number; gender: string }; vitals: { heartRate: Vital; bloodPressure: string | null; oxygen: Vital; temperature: Vital }; triage: TriageResult; placement: { ward: string; bedAssigned: boolean }; timestamp: string }
export interface AllocationResult { allocation: string; bedAssigned: boolean }
