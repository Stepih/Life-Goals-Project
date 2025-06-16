"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose, title }: { children: ReactNode; onClose: () => void, title?:string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">{title}</h1>
          <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        {children}
      </div>
    </div>,
    document.body
  );
}
