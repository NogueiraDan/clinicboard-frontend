"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import psiboard from "@/public/psiboard.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  contact: z.string(),
  password: z.string(),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className=" flex flex-col items-center">
        <img
          src={psiboard.src}
          alt="Logo"
          className="h-16 w-auto cursor-pointer"
        />
        <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-[f3f3f3]">
          Comece hoje no PsiBoard
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Digite seu nome</FormLabel>
                  <FormControl>
                    <Input placeholder="João da Silva..." type="text" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Digite seu email</FormLabel>
                  <FormControl>
                    <Input placeholder="joão.silva@example.com" type="email" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Digite sua senha</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Entrar</Button>
          </form>
        </Form>


        <div className="flex items-start flex-col gap-2 mt-2">
          <p className="text-center text-sm text-[f3f3f3]">
            Já possui conta?
            <Link
              href="/login"
              className="font-semibold leading-6 text-[f3f3f3] ml-1"
            >
              Faça login
            </Link>
          </p>
          <Link className="text-sm" href="/">
            Voltar para home
          </Link>
        </div>
      </div>
    </div>
  );
}
