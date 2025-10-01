export type ScheduleDetailsProps = {
  patientId: string;
  scheduleId: string;
};

export type Appointment = {
  id?: string;
  date: string;
  hour: string;
  type: string;
  user_id: string;
  patient_id: string;
};

export type Patient = {
  id?: string;
  additional_info?: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  user_id: string;
};

export type User = {
  id?: string;
  role?: string;
  password?: string;
  name: string;
  email: string;
  contact: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: string;
  name: string;
  email: string;
  contact: string;
  role: string;
  access_token: string;
};
