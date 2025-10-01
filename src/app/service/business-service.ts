import api from "./api";
import { API_ENDPOINTS } from "../constants/endpoints";
import { Appointment, Patient } from "@/types";
import { fetchHeaders } from "../utils/fetch-headers";

export const patientService = {
  create: async (patient: Omit<Patient, "id">): Promise<Patient> => {
    const { data } = await api.post<Patient>(
      API_ENDPOINTS.BUSINESS_SERVICE.CREATE_PATIENT,
      patient,
      { headers: fetchHeaders() }
    );
    return data;
  },

  findAll: async (): Promise<Patient[]> => {
    const { data } = await api.get<Patient[]>(
      API_ENDPOINTS.BUSINESS_SERVICE.FIND_ALL_PATIENT,
      { headers: fetchHeaders() }
    );
    return data;
  },

  findById: async (id: string): Promise<Patient> => {
    const { data } = await api.get<Patient>(
      API_ENDPOINTS.BUSINESS_SERVICE.FIND_PATIENT_BY_ID(id),
      { headers: fetchHeaders() }
    );
    return data;
  },

  update: async (id: string, patient: Partial<Patient>): Promise<Patient> => {
    const { data } = await api.put<Patient>(
      API_ENDPOINTS.BUSINESS_SERVICE.UPDATE_PATIENT(id),
      patient,
      { headers: fetchHeaders() }
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.BUSINESS_SERVICE.DELETE_PATIENT(id), {
      headers: fetchHeaders(),
    });
  },
};

export const appointmentService = {
  create: async (
    appointment: Omit<Appointment, "id">
  ): Promise<Appointment> => {
    const { data } = await api.post<Appointment>(
      API_ENDPOINTS.BUSINESS_SERVICE.CREATE_APPOINTMENT,
      appointment,
      {
        headers: fetchHeaders(),
      }
    );
    return data;
  },

  findAll: async (): Promise<Appointment[]> => {
    const { data } = await api.get<Appointment[]>(
      API_ENDPOINTS.BUSINESS_SERVICE.FIND_ALL_APPOINTMENT,
      { headers: fetchHeaders() }
    );
    return data;
  },

  findByDate: async (userId = "", date: string): Promise<Appointment[]> => {
    const { data } = await api.get<Appointment[]>(
      API_ENDPOINTS.BUSINESS_SERVICE.FIND_APPOINTMENT_BY_DATE(userId, date),
      { headers: fetchHeaders() }
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.BUSINESS_SERVICE.DELETE_APPOINTMENT(id), {
      headers: fetchHeaders(),
    });
  },
};
