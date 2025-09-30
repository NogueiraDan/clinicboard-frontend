export type ScheduleDetailsProps = {
  patientId: string;
  scheduleId: string;
};

export type Schedule = {
  id: string;
  date: string;
  hour: string;
  type: string;
  user_id: string;
  patientId: string;
};

export type PatientRequest = {
  name: string;
  email: string;
  contact: string;
  professionalId: string;
  observation?: string;
};

export type PatientResponse = {
  id: string;
  name: string;
  age: number;
  email: string;
  contact: string;
  professionalId: string;
};

export type ScheduleRequest = {
  date: string;
  patientId: string;
  professionalId: string;
  observation?: string;
  type?: string;
};

export type ScheduleResponse = {
  id: string;
  date: string;
  hour: string | undefined;
  type: string;
  patient_id: string;
  user_id: string | undefined;
};

export type UserUpdateRequest = {
  name: string;
  email: string;
  contact: string;
};

export type UserUpdateResponse = {
  id: string;
  name: string;
  email: string;
  contact: string;
  role: string;
};
