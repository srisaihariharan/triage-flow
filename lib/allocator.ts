import wards from '@/data/wards.json'; import type { Severity, Ward } from '@/types'
const wardFor: Record<Severity, string> = { Critical: 'ICU', High: 'Emergency', Moderate: 'General', Low: 'Observation' }
export function allocateBed(severity: Severity, source: Ward[] = wards) { const wardName = wardFor[severity]; const ward = source.find((item) => item.ward === wardName); if (!ward || ward.beds <= 0) return { allocation: 'WAITLIST', bedAssigned: false }; ward.beds -= 1; return { allocation: wardName, bedAssigned: true } }
export { wardFor }
