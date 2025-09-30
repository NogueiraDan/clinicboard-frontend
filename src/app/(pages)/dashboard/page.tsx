import { SidebarInset } from "@/components/ui/sidebar";
import { Metadata } from "next";
import Schedulings from "./components/schedulings";
// import Statistics from "./components/statistics";
import PageHeader from "@/components/page-header";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard do usuário",
};

export default function Page() {
  return (
    <SidebarInset>
      <PageHeader title="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50">
            {/* <Statistics /> */}
          </div>
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <Schedulings />
        </div>
      </div>
    </SidebarInset>
  );
}
