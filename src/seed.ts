import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

function createRandomUser() {
  return {
    fullName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

function createRandomPost() {
  return {
    title: faker.lorem.text(),
    content: faker.lorem.lines(5),
  };
}

const HOW_MUCH_AT_A_TIME = 1000;
const INTERVAL = 20 * 1000;

const doSeed = async () => {
  const USERS = faker.helpers.multiple(createRandomUser, {
    count: HOW_MUCH_AT_A_TIME,
  });
  // create 1 users
  const userList = await prisma.user.createMany({
    data: USERS,
    skipDuplicates: true,
  });
  console.log(`created ${userList.count} users`);
  // *  create post
  const POSTS = faker.helpers.multiple(createRandomPost, {
    count: HOW_MUCH_AT_A_TIME,
  });
  const postList = await prisma.post.createMany({
    data: POSTS,
    skipDuplicates: true,
  });
  console.log(`created ${postList.count} post`);
};

function runEvery20Seconds5Times(): void {
  let counter = 0;
  const intervalId = setInterval(() => {
    console.log(counter, " seed execution start");
    // Perform your desired task here
    doSeed()
      .then(async () => {
        console.log("=====seed done====");
      })
      .catch(async (e) => {
        console.log(e);
      });

    counter++;

    if (counter === 5) {
      clearInterval(intervalId);
    }
  }, INTERVAL);
}
runEvery20Seconds5Times();
