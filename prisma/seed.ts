import { prisma } from "../src/config/database.js";

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing tables and reset auto-increment sequences
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users", "event_types", "availability_rules", "availability_exceptions", "slots", "bookings" RESTART IDENTITY CASCADE;`);
  console.log("Cleared existing database records and reset ID sequences.");

  // 1. Create Users
  const john = await prisma.user.create({
    data: {
      Email: "john.doe@example.com",
      name: "John Doe",
      slug: "john-doe",
    },
  });

  const jane = await prisma.user.create({
    data: {
      Email: "jane.smith@example.com",
      name: "Jane Smith",
      slug: "jane-smith",
    },
  });

  console.log("Created users:", john.Email, jane.Email);

  // 2. Create Event Types for John Doe
  const johnEvent1 = await prisma.eventTypes.create({
    data: {
      hostId: john.id,
      title: "15 Min Coffee Chat",
      description: "Quick informal virtual coffee chat.",
      slug: "coffee-chat",
      locationType: "online",
      locationValue: "Google Meet",
      durationMin: 15,
      isActive: true,
      bufferBeforeMin: 0,
      bufferAfterMin: 5,
    },
  });

  const johnEvent2 = await prisma.eventTypes.create({
    data: {
      hostId: john.id,
      title: "30 Min Technical Consulting",
      description: "Deep dive technical alignment and architecture review.",
      slug: "tech-consulting",
      locationType: "online",
      locationValue: "Zoom Meet",
      durationMin: 30,
      isActive: true,
      bufferBeforeMin: 5,
      bufferAfterMin: 5,
    },
  });

  // 3. Create Event Types for Jane Smith
  const janeEvent1 = await prisma.eventTypes.create({
    data: {
      hostId: jane.id,
      title: "45 Min Design Portfolio Review",
      description: "Review of UI/UX designs and portfolio feedback.",
      slug: "portfolio-review",
      locationType: "online",
      locationValue: "Google Meet",
      durationMin: 45,
      isActive: true,
      bufferBeforeMin: 5,
      bufferAfterMin: 10,
    },
  });

  console.log("Created event types:", [
    johnEvent1.slug,
    johnEvent2.slug,
    janeEvent1.slug,
  ]);
  console.log("🌱 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
