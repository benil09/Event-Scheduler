import pg from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://pgadmin:Nilkamal09.@event-scheduler-22536.postgres.database.azure.com:5432/postgres?sslmode=require";

// Connect to default postgres maintenance database to drop/create other DBs
const rootConnStr = connectionString.replace(/\/[^/?]+(\?.*)?$/, "/postgres$1");

async function resetTemporalDatabases() {
  const client = new pg.Client({
    connectionString: rootConnStr,
  });

  try {
    console.log("[Temporal Reset] Connecting to PostgreSQL server...");
    await client.connect();

    console.log("[Temporal Reset] Terminating existing connections to temporal databases...");
    await client.query(`
      SELECT pg_terminate_backend(pid) 
      FROM pg_stat_activity 
      WHERE datname IN ('temporal', 'temporal_visibility') 
        AND pid <> pg_backend_pid();
    `).catch(() => {});

    console.log("[Temporal Reset] Dropping old databases...");
    await client.query(`DROP DATABASE IF EXISTS temporal;`);
    await client.query(`DROP DATABASE IF EXISTS temporal_visibility;`);

    console.log("[Temporal Reset] Creating fresh 'temporal' database...");
    await client.query(`CREATE DATABASE temporal;`);

    console.log("[Temporal Reset] Creating fresh 'temporal_visibility' database...");
    await client.query(`CREATE DATABASE temporal_visibility;`);

    console.log("✅ Successfully created fresh 'temporal' and 'temporal_visibility' databases!");
  } catch (error) {
    console.error("❌ Error resetting databases:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

resetTemporalDatabases();
