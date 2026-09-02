import data from '../../data/intake.json'
import { RawPatientRecord } from '../domain/schema'
export interface IntakeAdapter { getQueue(): Promise<RawPatientRecord[]> }
export class MockIntakeAdapter implements IntakeAdapter { async getQueue(){ return data as RawPatientRecord[] } }
export class IntakeService { constructor(private adapter:IntakeAdapter = new MockIntakeAdapter()){} getQueue(){ return this.adapter.getQueue() } }
