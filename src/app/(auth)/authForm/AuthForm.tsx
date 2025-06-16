'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

import InputField from '../../../components/ui/form/InputField';
import SubmitButton from '../../../components/ui/buttons/SubmitButton';
import ModalInfo from '@/components/ui/modalPopup/ModalInfo';


type Props = { type: 'login' | 'register' };

export default function AuthForm({ type }: Props) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true); 

  
    try {
      const res = await fetch(`/api/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      const data = await res.json(); 
  
      if (res.ok) {
        setSuccess(data.message || 'Успешно!');
        if (type === 'login') {
          router.push('/dashboard');
        }
      } else {
        setError(data.error || 'Ошибка');
      }
    } catch {
      setError('Произошла ошибка запроса');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <InputField
        name="email"
        type="email"
        label="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <InputField
        name="password"
        type="password"
        label="Пароль"
        value={form.password}
        onChange={handleChange}
        required
      />
      <SubmitButton loading={isLoading}>
        {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </SubmitButton>

      <AnimatePresence>
          {error && <ModalInfo error={error} />}
          {success && <ModalInfo success={success} />}
      </AnimatePresence>
    </form>
  );
}
