"use client";
import React from "react";
import { useUser } from "@/app/context/user-context";
import PageHeader from "@/components/page-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "@/app/hooks/use-update-user";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  contact: z.string(),
});

export default function Page() {
  const { user } = useUser();
  const { updateUser } = useUpdateUser();
  const [isEditing, setIsEditing] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      contact: user?.contact || "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    try {
      await updateUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SidebarInset>
      <PageHeader title="Perfil" />
      <div className="flex items-center justify-between px-5">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20 rounded-[50%]">
            <AvatarImage alt={user?.name} />
            <AvatarFallback className="rounded-lg">
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
        <Button
          variant={isEditing ? "destructive" : "default"}
          className=""
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Cancelar" : "Editar"}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6 px-5 mt-5"
        >
          <div>
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
                      disabled={!isEditing}
                      className="w-full h-[48px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
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
                      disabled={!isEditing}
                      className="w-full h-[48px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone para contato</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(XX) XXXXX-XXXX"
                      type="tel"
                      required
                      disabled={!isEditing}
                      className="w-full h-[48px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-center mt-10 w-full">
            <Button variant="default" className="w-[200px] h-10" type="submit">
              Alterar
            </Button>
          </div>
        </form>
      </Form>
    </SidebarInset>
  );
}
