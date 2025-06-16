'use client';

import React from 'react';
import { redirect } from 'next/navigation';

export default function LogoutButton() {

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch('/api/logout', {
      method: 'POST',
    });

    const data = await res.json()

   redirect(data.redirectTo); 
  };

  return (
    <button onClick={handleLogout} className="cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-600">
      <i className="fas fa-sign-out-alt"></i> 
    </button>
  );
}
