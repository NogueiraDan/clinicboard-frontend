"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { SchedulingSkeleton } from "./skeletons/schedulings-skeleton";
import { useAppointments } from "@/app/hooks/use-appointments";
import ScheduleDetails from "./schedule-details";
import { Appointment } from "@/types";

export default function Schedulings() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { appointments, refetchAppointments, isFetching } = useAppointments(date);

  function handleChangeCalendarDay(date: Date) {
    setDate(date);
    refetchAppointments();
  }
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-base">Agendamentos do dia</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          onDayClick={handleChangeCalendarDay}
          className="rounded-md border w-[300px] flex items-center justify-center"
        />
        <div className="w-[60%] max-h-64 overflow-y-auto">
          {isFetching ? (
            <SchedulingSkeleton />
          ) : (
            <>
              {appointments && (
                <React.Fragment>
                  {appointments?.map((appointment: Appointment) => (
                    <div
                      key={appointment.id}
                      className="rounded border h-auto w-[90%] ml-5 mb-3 p-3 flex flex-col gap-1"
                    >
                      <p className="text-lg font-medium">
                        Horário: {appointment.hour}
                      </p>
                      <p className="text-base font-medium">
                        Data: {appointment.date}
                      </p>
                      <ScheduleDetails patientId={appointment.patient_id} scheduleId={appointment.id ?? ""}/>
                    </div>
                  ))}
                </React.Fragment>
              )}

              {appointments?.length <= 0 && !isFetching && (
                <h3 className="text-primary text-3xl ml-0">
                  Sem agendamentos para este dia!
                </h3>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
