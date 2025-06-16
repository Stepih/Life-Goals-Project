"use client"

import { FC } from "react";
import LogoutButton from "@/components/ui/buttons/LogoutButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/dashboardStore";


const UserPanel: FC = () => {
    const {userName} = useSelector((state: RootState) => state.dashboard);
  return (
    <div className="relative bg-white rounded-xl shadow py-6 px-3 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xs sm:text-xl font-semibold text-gray-800">Привет, {userName} 👋</h2>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default UserPanel;
