"use client";

import {useAvailableAppointments } from "@/app/hooks/use-available-appointments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";

export default function Statistics() {
  const date = useMemo(() => new Date(), []);
  const { appointments, isFetching } = useAvailableAppointments(date);
  return (
    <>
      <Card className="min-h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">Horários livres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            {isFetching ? "Carregando..." : appointments.length}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
