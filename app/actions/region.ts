
'use server'

import { ENV_CONFIG } from '@/lib/config/env.config';
import { redirect } from 'next/navigation'
import { setMultipleCookies } from './cookies';
import { IState } from '@/interfaces/common.types';

export async function setRegion(state: IState) {
  await setMultipleCookies([
    { name: ENV_CONFIG.cookies.X_REGION, value: state?.slug },
    { name: ENV_CONFIG.cookies.X_STATE_CODE, value: state?.code },
    { name: ENV_CONFIG.cookies.X_STATE_NAME, value: state?.name },
  ]);

  redirect(`/${state?.slug}`)
}
