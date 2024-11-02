import { NextApiResponse, NextApiRequest } from 'next';
import { createClerkClient } from '@clerk/nextjs/server';
import conn from '../../../data/connection';
import { Users } from '../../../data/models';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  await conn();
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

  const { emailAddress, firstName, lastName, phoneNumber } = JSON.parse(req.body);

  try {
    const clerkUser = await clerk.users.createUser({
      emailAddress: [emailAddress],
      firstName: firstName,
      lastName: lastName,
      phoneNumber: [phoneNumber],
    });

    const newUserAdd = {
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      emailAddress: clerkUser.emailAddresses[0].emailAddress,
      phoneNumber: clerkUser.phoneNumbers[0].phoneNumber,
      userID: clerkUser.id,
    };

    await Users.insertMany([newUserAdd]);

    res.status(200).json(newUserAdd);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}
