"use client";

import { usePatients } from "@/app/hooks/use-patients";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SkeletonTable from "../components/skeletons/table-skeleton";
import PageHeader from "@/components/page-header";
import { Patient } from "@/types";

export default function Page() {
  const { patients, isFetching } = usePatients();
  return (
    <main className="flex w-full flex-col">
      <PageHeader title="Pacientes" />
      {isFetching ? (
        <SkeletonTable />
      ) : (
        <Table className="cursor-pointer">
          <TableHeader>
            <TableRow>
              <TableHead className="w-auto">Nome</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient: Patient ) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
}
