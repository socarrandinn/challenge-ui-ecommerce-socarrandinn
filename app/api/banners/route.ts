import { NextRequest } from 'next/server';
import { handleBannersResponse } from '../../../lib/api-helpers';
import { BANNER_POSITION } from '@/interfaces/banner.interface';

export async function GET(req: NextRequest, { position }: { position: BANNER_POSITION }) {
  console.log(position, 'position')
  return handleBannersResponse(position ?? BANNER_POSITION.HERO);
}