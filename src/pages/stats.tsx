import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";

import { Header } from "@/components/header";
import { MetricsInputForm } from "@/components/metricsInputForm";
import { DateBar } from "@/components/dateBar";
import { MetricsChart } from "@/components/metricsChart";

const Metrics: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  // const { data: sessionData } = useSession();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Head>
        <title>Metrics</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className="min-h-screen bg-gray-100 flex flex-row items-center justify-center">
          <div className="w-1/2 max-w-xl bg-white shadow-md p-6 rounded-lg">
            <DateBar onDateChange={handleDateChange} />
            <MetricsInputForm searchDate={selectedDate} />
            
          </div>
          <div className="h-[50vh] w-1/2">
            <MetricsChart />
          </div>
        </div>
      </main>
    </>
  );
};

export default Metrics;