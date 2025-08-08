'use server';
import { cookies } from 'next/headers';

export async function setCookie(name: string, value: any): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(name, value);
}

export async function getCookie(cookieName: string) {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value;
}

export async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}
