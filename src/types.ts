export interface Senior {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  room: string;
  status: 'Stable' | 'Warning' | 'Critical';
  riskScore: number;
  photo: string;
  address: string;
  guardianContact: string;
  specialNotes: string[];
}

export interface HealthLog {
  id: string;
  seniorId: string;
  type: 'BloodPressure' | 'BloodGlucose' | 'Medication' | 'Meal' | 'Emotion';
  timestamp: string;
  value: string;
  status?: string;
  note?: string;
}

export interface TodoTask {
  id: string;
  seniorId: string;
  title: string;
  type: 'Medication' | 'VitalSigns' | 'Meal' | 'Emotion';
  scheduledTime: string;
  completedTime?: string;
  status: 'Pending' | 'Completed' | 'Delayed';
}
