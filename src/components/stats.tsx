// next
import { useState } from "react";
import { useSession } from "next-auth/react";

// components
import { MetricsInputForm } from "@/components/metricsInputForm";
import { DateBar } from "@/components/dateBar";
import { MetricsChart } from "@/components/metricsChart";

// utils
import { api } from "../utils/api";

type IndividualStat = {
  id?: number;
  date?: Date;
  metricId?: number;
  value?: number;
}

interface StatsDict {
  [key: number]: IndividualStat;
}

export const Stats = () => {

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [updateStats, setUpdateStats] = useState<StatsDict>({});

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const { data: sessionData } = useSession();

  const { refetch: refetchStats } = api.stats.getDay.useQuery(
    { date: selectedDate }, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        const d = data.reduce<StatsDict>((acc, item) => {
          acc[item.metricId] = item; // <-- Use 'acc' instead of 'data'
          return acc;
        }, {});
        setUpdateStats(d ?? {});
      },
    }
  );

  const { data: metrics } = api.metrics.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const mappedData = metrics?.map((metric) => ({
    metric: metric.name,
    dailystat: updateStats[metric.id]?.value || 0,
  }));

  const createStat = api.stats.create.useMutation({
    onSuccess: () => {
      void refetchStats();
    },
  });

  return (
    <>
        <div className="min-h-screen bg-gray-100 flex flex-row items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:max-w-5xl px-4 py-6">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <DateBar onDateChange={handleDateChange} />
              <MetricsInputForm
                metricsData={metrics ?? []}
                statsData={updateStats}
                searchDate={selectedDate}
                onCreateStat={(data) => createStat.mutate(data)}
                setUpdateStats={setUpdateStats}
              />
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <MetricsChart mydata={mappedData ?? []} />
            </div>
          </div>
        </div>
    </>
  );
};
