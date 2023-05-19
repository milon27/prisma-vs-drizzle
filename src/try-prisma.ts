import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const testPrisma = async () => {
  const start = new Date();
  const userRows = await prisma.user.findMany({});
  const end = new Date();
  const userExecutionTime = end.getTime() - start.getTime();
  console.log({
    totalUser: userRows.length,
    userExecutionTime,
  });

  // const postStart = new Date();
  // const postRows = await prisma.post.findMany({});
  // const postEnd = new Date();
  // const postExecutionTime = postEnd.getTime() - postStart.getTime();
  // console.log({ totalPost: postRows.length, postExecutionTime });
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
