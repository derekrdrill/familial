import { NextApiResponse, NextApiRequest } from 'next';
import { createClerkClient } from '@clerk/nextjs/server';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

  const { emailAddress, firstName, lastName, phoneNumber } = JSON.parse(req.body);

  console.log(JSON.parse(req.body));

  try {
    const user = await clerk.users.createUser({
      emailAddress: [emailAddress],
      firstName: firstName,
      lastName: lastName,
      phoneNumber: [phoneNumber],
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}
