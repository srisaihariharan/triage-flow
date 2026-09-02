import reference from '../../data/clinical-reference.json'
import type { Severity } from '../domain/schema'
export interface ClinicalReferenceAdapter { lookup(severity:Severity): Promise<{guidance:string}> }
export class MockClinicalReferenceAdapter implements ClinicalReferenceAdapter { async lookup(severity:Severity){return reference[severity] as {guidance:string}} }
export class ClinicalReferenceService { constructor(private adapter:ClinicalReferenceAdapter=new MockClinicalReferenceAdapter()){} lookup(severity:Severity){return this.adapter.lookup(severity)} }
