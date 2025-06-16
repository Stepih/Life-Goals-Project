'use client';

import { redirect } from "next/navigation";

interface RedirectError extends Error {
  redirectTo?: string;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: Response) => void;
  reject: (reason?: unknown) => void;
  url: string;
  options: RequestInit;
}> = [];

const processQueue = (error?: RedirectError) => {
  failedQueue.forEach(({ resolve, reject, url, options }) => {
    if (error) {
      reject(error);
    } else {
      fetch(url, { ...options, credentials: 'include' }).then(resolve).catch(reject);
    }
  });
  failedQueue = [];
};

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  try {
    let res = await fetch(url, { ...options, credentials: 'include' });

    if (res.status === 401 && !isRefreshing) {
      isRefreshing = true;
      

      const refreshRes = await fetch('/api/refresh', { 
        method: 'POST', 
        credentials: 'include' 
      });

      if (refreshRes.ok) {
        
        res = await fetch(url, { ...options, credentials: 'include' });
        processQueue();
        return res;
      } else {
        const data = await refreshRes.json().catch(() => ({}));
        const error: RedirectError = new Error('Unauthorized');
        error.redirectTo = data?.redirectTo || '/';
        processQueue(error);
        redirect(data.redirectTo)
      }
    }
    else if (res.status === 401 && isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve,
          reject,
          url,
          options
        });
      });
    }

    return res;
  } finally {
    isRefreshing = false;
  }
}