import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { customAlphabet } from 'nanoid';

export const runtime = 'edge';

const randomAlpha = customAlphabet(
  '01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
);

export default async function POST(req: Request) {
  const file = req.body ?? '';
  const contentType = req.headers.get('content-type') ?? 'text/plain';
  const fileName = `${randomAlpha()}.${contentType.split('/')[1]}`;
  const blob = await put(fileName, file, {
    contentType,
    access: 'public',
  });

  return NextResponse.json(blob);
}
