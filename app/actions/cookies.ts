"use server";
import { cookies } from "next/headers";

const next15Day = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

export async function setCookie(name: string, value: any): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(name, value, { expires: next15Day });
}

export async function getCookie(cookieName: string) {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value;
}

export async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

export async function setMultipleCookies(
  cookiesData: { name: string; value: any }[]
): Promise<void> {
  const cookieStore = await cookies();
  cookiesData.forEach(({ name, value }) => {
    cookieStore.set(name, value, { expires: next15Day });
  });
}
