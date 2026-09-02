export type PipelineEvent='INTAKE_RECEIVED'|'RECORD_NORMALIZED'|'VITALS_VALIDATED'|'TRIAGE_SCORED'|'CLINICAL_REFERENCE_LOOKUP'|'PLACEMENT_EVALUATED'|'CASE_EMITTED'
export function logEvent(event:PipelineEvent, context:{caseId?:string;patientId?:string}){console.info(JSON.stringify({event,...context,timestamp:new Date().toISOString()}))}
