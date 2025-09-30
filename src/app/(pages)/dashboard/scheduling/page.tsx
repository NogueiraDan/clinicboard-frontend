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
import { usePatients } from "@/app/hooks/usePatients";
import { Button } from "@/components/ui/button";
import { useAvailableSchedules } from "@/app/hooks/useAvailableSchedules";
import { useUser } from "@/app/context/UserContext";
import { toast } from "react-toastify";
import { useCreateSchedule } from "@/app/hooks/useCreateSchedule";
import PageHeader from "@/components/page-header";
import { PatientResponse, ScheduleRequest } from "../types";
import { combineDateAndTime } from "@/app/utils/combine-date";

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
  const { createSchedule } = useCreateSchedule();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { patients } = usePatients();
  const { refetchSchedules, schedules } = useAvailableSchedules(state.date);

  const handleChange = (type: Action["type"], payload: Action["payload"]) => {
    dispatch({ type, payload } as Action);
  };

  function handleChangeCalendarDay(date: Date) {
    handleChange("SET_DATE", date);
    refetchSchedules();
  }

  async function onSubmit() {
    const body: ScheduleRequest = {
      date: combineDateAndTime(state.date, state.schedule),
      professionalId: user?.id ?? "",
      patientId: state.selectedPatient,
    };
    if (Object.values(body).some((value) => value === "")) {
      toast.error("Por favor! Selecione a DATA, o PACIENTE, e o HORÁRIO.");
      return;
    }

    try {
      await createSchedule(body);
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
                {schedules.map((schedule: string) => (
                  <SelectItem key={schedule} value={schedule}>
                    {schedule}
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
                {patients.map((patient: PatientResponse) => (
                  <SelectItem key={patient.id} value={patient.id}>
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
