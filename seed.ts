import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./src/generated/prisma/client.ts";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: Date;
  email: string;
  country: string;
}

const personList: Person[] = [
  {
    id: 1,
    first_name: "Tural",
    last_name: "Mammadov",
    gender: "male",
    date_of_birth: new Date("1997-11-22"),
    email: "tural.ma@bestcomp.net",
    country: "Azerbaijan",
  },
  {
    id: 2,
    first_name: "Orkhan",
    last_name: "Rzali",
    gender: "male",
    date_of_birth: new Date("1998-01-01"),
    email: "orkhan.r@bestcomp.net",
    country: "Azerbaijan",
  },
];

async function main() {
  for (const person of personList) {
    await prisma.person.create({
      data: {
        id: person.id,
        first_name: person.first_name,
        last_name: person.last_name,
        gender: person.gender,
        date_of_birth: person.date_of_birth,
        email: person.email,
        country: person.country,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    prisma.$disconnect;
    process.exit(1);
  });
