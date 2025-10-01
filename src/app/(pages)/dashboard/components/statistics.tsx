"use client";

import { useAvailableSchedules } from "@/app/hooks/useAvailableAppointments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";

export default function Statistics() {
  const date = useMemo(() => new Date(), []);
  const { schedules, isFetching } = useAvailableSchedules(date);
  return (
    <>
      <Card className="min-h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">Horários livres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            {isFetching ? "Carregando..." : schedules.length}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
