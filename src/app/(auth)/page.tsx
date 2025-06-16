"use client"

import AuthForm from "@/app/(auth)/authForm/AuthForm";

import { useState } from "react";

type IAuth = 'login' | 'register'

export default function LoginPage() {
  const [type, setType] = useState<IAuth>('login');


  return (
      <div className=' max-w-xs w-full p-6 pb-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded shadow-lg'>
        <div className=" mb-4 ">
          {['login', 'register'].map((item, idx) => (
            <span
              key={item}
              onClick={() => setType(item as 'login' | 'register')}
              className={`font-bold cursor-pointer transition-opacity duration-150 active:opacity-50 ${
                type === item ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {item === 'login' ? 'Вход' : 'Регистрация'}
              {idx < 1 && <span className="mx-1">/</span>}
            </span>
          ))}
        </div>
        <AuthForm type={type} />
      </div>

  )
}
