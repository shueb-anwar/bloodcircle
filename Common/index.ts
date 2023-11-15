import { For } from "../Home/useRequestBloodForm"


export const BloodGroupOptions = [
  { label: 'A Negative', value: 'A-' },
  { label: 'A Positive', value: 'A+' },
  { label: 'B Negative', value: 'B-' },
  { label: 'B Positive', value: 'B+' },
  { label: 'AB Negative', value: 'AB-' },
  { label: 'AB Positive', value: 'AB+' },
  { label: 'O Negative', value: 'O-' },
  { label: 'O Positive', value: 'O+' }
]

export const ForOptions: { label: string, value: For }[] = [
  { label: 'MySelf', value: 'myself' },
  { label: 'Friend', value: 'friend' },
  { label: 'Family', value: 'family' }
]

export const MedicalConditionOptions: { label: string, value: string }[] = [
  { label: 'Critical', value: 'critical' },
  { label: 'Below Critical', value: 'below-critical' },
  { label: 'Urgent', value: 'urgent' }
]