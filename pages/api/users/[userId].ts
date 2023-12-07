import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    const usersWithUserId = await prisma.user.findMany({
      where: { followingIds: { has: userId } },
      select: { id: true }, // Assuming 'id' is the field that uniquely identifies each user
    });
    const uniqueUserIds = new Set(usersWithUserId.map((user) => user.id));
    const followersCount = uniqueUserIds.size;

    return res.status(200).json({ ...existingUser, followersCount });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
