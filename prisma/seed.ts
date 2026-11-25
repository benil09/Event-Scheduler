import { prisma } from "../src/config/database.js";

const TOTAL_USERS = 10000;
const BATCH_SIZE = 1000;

const FIRST_NAMES = [
  "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
  "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
  "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa",
  "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley",
  "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
  "Kenneth", "Dorothy", "Kevin", "Carol", "Brian", "Amanda", "George", "Melissa",
  "Edward", "Deborah", "Ronald", "Stephanie", "Timothy", "Rebecca", "Jason", "Sharon",
  "Jeffrey", "Laura", "Ryan", "Cynthia", "Jacob", "Kathleen", "Gary", "Amy",
  "Nicholas", "Angela", "Eric", "Shirley", "Jonathan", "Anna", "Stephen", "Brenda",
  "Larry", "Pamela", "Justin", "Emma", "Scott", "Nicole", "Brandon", "Helen",
  "Benjamin", "Samantha", "Samuel", "Katherine", "Gregory", "Christine", "Frank", "Debra",
  "Alexander", "Rachel", "Raymond", "Carolyn", "Patrick", "Janet", "Jack", "Catherine",
  "Dennis", "Maria", "Jerry", "Heather", "Tyler", "Diane", "Aaron", "Ruth"
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
  "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
  "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young",
  "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell",
  "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker",
  "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales", "Murphy",
  "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey",
  "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
  "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Mendoza", "Gray",
  "Aguilar", "Hughes", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long",
  "Ross", "Foster", "Jimenez", "Powell", "Jenkins", "Perry", "Russell", "Sullivan"
];

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Australia/Sydney"
];

const DOMAINS = ["example.com", "mail.com", "test.dev", "domain.org", "inbox.io"];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUserData(index: number) {
  const firstName = getRandomItem(FIRST_NAMES);
  const lastName = getRandomItem(LAST_NAMES);
  const fullName = `${firstName} ${lastName}`;
  const domain = getRandomItem(DOMAINS);
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${index}@${domain}`;
  const slug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${index}`;
  const timezone = getRandomItem(TIMEZONES);
  const isVerified = Math.random() > 0.3; // 70% verified

  return {
    Email: email,
    name: fullName,
    slug: slug,
    timezone: timezone,
    isVerified: isVerified,
    passwordHash: null,
  };
}

async function main() {
  console.log(`🌱 Starting database seeding for ${TOTAL_USERS} users...`);
  const startTime = Date.now();

  let insertedCount = 0;

  for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
    const currentBatchSize = Math.min(BATCH_SIZE, TOTAL_USERS - i);
    const usersBatch = [];

    for (let j = 0; j < currentBatchSize; j++) {
      const userIndex = i + j + 1;
      usersBatch.push(generateUserData(userIndex));
    }

    await prisma.user.createMany({
      data: usersBatch,
      skipDuplicates: true,
    });

    insertedCount += currentBatchSize;
    const progress = ((insertedCount / TOTAL_USERS) * 100).toFixed(1);
    console.log(`[Users] Inserted ${insertedCount}/${TOTAL_USERS} (${progress}%)`);
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✅ Successfully seeded ${insertedCount} users in ${durationSec}s!`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
