"use client";

import React, { useReducer } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { usePatients } from "@/app/hooks/use-patients";
import { Button } from "@/components/ui/button";
import { useAvailableAppointments } from "@/app/hooks/use-available-appointments";
import { useUser } from "@/app/context/user-context";
import { toast } from "react-toastify";
import { useCreateAppointment } from "@/app/hooks/use-create-appointment";
import PageHeader from "@/components/page-header";
import { Appointment, Patient } from "@/types";

type State = {
  date: Date | undefined;
  schedule: string | undefined;
  selectedPatient: string;
};

type Action =
  | { type: "SET_DATE"; payload: Date | undefined }
  | { type: "SET_SCHEDULE"; payload: string | undefined }
  | { type: "SET_SELECTED_PATIENT"; payload: string };

const initialState: State = {
  date: new Date(),
  schedule: "",
  selectedPatient: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_SCHEDULE":
      return { ...state, schedule: action.payload };
    case "SET_SELECTED_PATIENT":
      return { ...state, selectedPatient: action.payload };
    default:
      return state;
  }
}

export default function Page() {
  const { user } = useUser();
  const { createAppointment } = useCreateAppointment();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { patients } = usePatients();
  const { refetchAppointments, appointments } = useAvailableAppointments(state.date);

  const handleChange = (type: Action["type"], payload: Action["payload"]) => {
    dispatch({ type, payload } as Action);
  };

  function handleChangeCalendarDay(date: Date) {
    handleChange("SET_DATE", date);
    refetchAppointments();
  }

  async function onSubmit() {
    const body: Appointment = {
      date: state.date ? state.date.toISOString().split("T")[0] : "",
      hour: state.schedule ?? "",
      user_id: user?.id ?? "",
      patient_id: state.selectedPatient,
      type: "MARCACAO",
    };
    if (Object.values(body).some((value) => value === "")) {
      toast.error("Por favor! Selecione a DATA, o PACIENTE, e o HORÁRIO.");
      return;
    }

    try {
      await createAppointment(body);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="pt-2 mt-0 h-full">
      <PageHeader title="Agendamento" />
      <h1 className="text-3xl font-bold text-gray-700 mb-10 md:text-center">
        Agende o horário
      </h1>

      <div className="flex flex-row justify-start md:justify-center">
        <div className="flex flex-col gap-10 sm:w-full md:w-[45%] lg:w-[35%]">
          <div>
            <label className="font-semibold">Horários Livres</label>
            <Select
              onValueChange={(value) => handleChange("SET_SCHEDULE", value)}
            >
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Selecione o horário" />
              </SelectTrigger>
              <SelectContent>
                {appointments.map((appointment: Appointment) => (
                  <SelectItem key={appointment.id} value={appointment.id ?? ""}>
                    {appointment.hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="font-semibold">Paciente</label>
            <Select
              onValueChange={(value) =>
                handleChange("SET_SELECTED_PATIENT", value)
              }
            >
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Selecione o paciente" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient: Patient) => (
                  <SelectItem key={patient.id} value={patient.id ?? ""}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={onSubmit}
            className="w-full max-w-xs bg-gray-800 text-white font-semibold"
          >
            Criar agendamento
          </Button>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <p className="text-xl font-semibold mb-4">
            Selecione a data do agendamento
          </p>
          <Calendar
            mode="single"
            selected={state.date}
            onSelect={(date) => handleChange("SET_DATE", date)}
            onDayClick={handleChangeCalendarDay}
            className="rounded-md border p-4 w-full items-center justify-center flex"
          />
        </div>
      </div>
    </div>
  );
}
