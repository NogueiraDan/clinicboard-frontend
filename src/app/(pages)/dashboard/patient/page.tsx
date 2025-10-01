"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useUser } from "@/app/context/UserContext";
import { useCreatePatient } from "@/app/hooks/useCreatePatients";
import { Patient } from "@/types";
import PageHeader from "@/components/page-header";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  age: z.number(),
  observation: z.string(),
});

export default function Page() {
  const { user } = useUser();
  const { createPatient } = useCreatePatient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: 0,
      observation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body: Patient = {
      ...values,
      user_id: user?.id ?? "",
    };
    try {
      await createPatient(body);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <PageHeader title="Paciente" />
      <main className="px-5 my-10 flex w-full flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col"
          >
            <div className="border-b pb-1">
              <h1 className="text-2xl font-semibold leading-7 text-gray-900">
                Cadastre o seu paciente
              </h1>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Preencha atentamente as informações do seu paciente
              </p>
            </div>
            <div className="mt-10 sm:grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 my-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="João da Silva..."
                          type="text"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="sm:col-span-2 my-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="joao.silva@example.com"
                          type="email"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="sm:col-span-2 my-3">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone para contato</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(XX) XXXXX-XXXX"
                          type="tel"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="sm:col-span-1 my-3">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="25"
                          type="number"
                          min="0"
                          max="120"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="observation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Informações adicionais</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Campo para informações adicionais"
                          rows={5}
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Button type="submit" className="w-[50%] h-[42px]">
                Cadastrar
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
}
