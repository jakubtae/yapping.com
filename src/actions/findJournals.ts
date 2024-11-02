import { prisma } from "@/prisma";

interface findTypes {
  quantity: number;
}

const findJournals = async ({ quantity }: findTypes) => {
  try {
    const journals = await prisma.posts.findMany({
      take: quantity,
    });
    return journals;
  } catch (error) {
    console.error(error);
    return {
      error: error,
    };
  }
};

export default findJournals;
