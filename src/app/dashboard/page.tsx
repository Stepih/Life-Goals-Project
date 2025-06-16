"use client";

import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { store, RootState, AppDispatch } from "@/store/dashboardStore";
import { setDashboardData } from "@/store/dashboardSlice";
import { useRouter } from "next/navigation";

import DistributionTasks from "./components/distribution/DistributionTasks";
import MyTodayTasks from "./components/Tasks/MyTodayTasks";
import MyGoals from "./components/goals/MyGoals";

import Privet from "@/components/privet/Privet";

import { fetchWithAuth } from "@/lib/fetchWithAuth";

import { IDashboardData } from "@/interfaces/dashboardData";
import UserPanel from "./components/userPanel/UserPanel";
import Productivity from "./components/productivity/Productivity";



function DashboardContent() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { userName } = useSelector((state: RootState) => state.dashboard);
  const [isLoading, setIsLoading] = useState(true);
  const [delayedLoaded, setDelayedLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetchWithAuth("/api/dashboard");
        
        if (!res.ok) {
          // throw new Error(`Ошибка загрузки: ${res.status}`);
          
        }

        const data: IDashboardData = await res.json();
        
        dispatch(setDashboardData(data));
        setError(null);
      } 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (err: any) {
        
        setError(err.message);
        if (err.message.includes("NEXT_REDIRECT")) {
          router.push("/");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [dispatch, router]);

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => setDelayedLoaded(true), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  return (
    <section>
      <Privet userEmail={userName} isLoading={isLoading} />
      <AnimatePresence>
      {delayedLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          key="dashboard-content"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6">
            <UserPanel />
            <MyTodayTasks isLoading={false} error={error} />
            <MyGoals isLoading={false} error={error} />
          </div>
          <div className='space-y-6'>
            <DistributionTasks/>
            <Productivity />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </section>
  );
}

export default function DashboardClient() {
  return (
    <Provider store={store}>
      <DashboardContent />
    </Provider>
  );
}
