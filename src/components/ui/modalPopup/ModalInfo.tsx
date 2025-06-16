"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function ModalInfo({ error, success }: {error?:string, success?:string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const title = error ?? success

  return createPortal(
    <motion.div initial={{y: -100}} animate={{y: 20}} exit={{y: -100}} className="fixed top-0 left-1/2 transform translate-x-[-50%] z-50">
      <div className={`${error && 'bg-red-700'} ${success && 'bg-green-700'} rounded-lg shadow-lg p-6 relative max-w-lg w-full`}>
        <h1 className='font-bold text-white'>{title}</h1>
      </div>
    </motion.div>,
    document.body
  );
}
