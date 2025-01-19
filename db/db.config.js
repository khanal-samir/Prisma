import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  // log: ["query"], // prints the query
});

export default prisma;
