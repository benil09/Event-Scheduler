import { prisma } from "../src/config/database.js";
import { regenerateHostSlots } from "../src/services/slot.service.js";

async function main() {
    console.log("⏱️ Starting benchmark...");
    const host = await prisma.user.findFirst();
    if (!host) {
        console.error("❌ No host found in database. Please seed the database first.");
        return;
    }

    console.log(`👤 Found host: ${host.name} (ID: ${host.id})`);

    // Let's create some dummy event types and rules if they don't exist
    // (They should exist because we ran the seed script)
    
    const startTime = performance.now();
    try {
        console.log("🏃 Running regenerateHostSlots...");
        
        // We set a safety timeout of 10 seconds because we expect it to hang/infinite loop
        const timeout = setTimeout(() => {
            console.error("🚨 Timeout reached! The function is hanging (likely due to an infinite loop).");
            process.exit(1);
        }, 10000);

        await regenerateHostSlots({ hostId: host.id });
        
        clearTimeout(timeout);
        const endTime = performance.now();
        console.log(`✅ Completed in ${(endTime - startTime).toFixed(2)}ms`);
    } catch (error) {
        console.error("❌ Error running regenerateHostSlots:", error);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
