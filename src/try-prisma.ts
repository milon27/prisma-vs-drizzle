import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});
prisma.$on("query", (e) => {
  console.log(`Prisma Query Duration : ${e.duration}ms`);
});

const testPrisma = async () => {
  const userRows = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
    },
  });
  console.log({ totalUser: userRows.length });

  const postRows = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  console.log({ totalPost: postRows.length });
};

testPrisma()
  .then(async () => {
    await prisma.$disconnect();
    console.log("=====prisma query run done====");
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
