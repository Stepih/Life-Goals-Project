"use client";
import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IPrivet {
  userEmail: string;
  isLoading: boolean;
}

const Privet: FC<IPrivet> = ({ isLoading }) => {
  const [visible, setVisible] = useState(true); 
  const [minShown, setMinShown] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinShown(true); 
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && minShown) {
      setVisible(false);
    }
  }, [isLoading, minShown]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-3xl sm:text-5xl font-semibold text-center z-50"
        >
         Добро пожаловать!
        </motion.h1>
      )}
    </AnimatePresence>
  );
};

export default Privet;
