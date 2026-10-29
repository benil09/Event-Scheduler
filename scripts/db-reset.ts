#!/usr/bin/env tsx
/**
 * db:reset — Full database reset script
 *
 * What it does:
 *  1. Drops and recreates the application DB (or TRUNCATEs all tables if drop is skipped)
 *  2. Runs all Prisma migrations (prisma migrate reset --force)
 *  3. Optionally seeds with fresh demo data (prisma db seed)
 *
 * Usage:
 *   npm run db:reset              → Reset + run migrations (no seed data)
 *   npm run db:reset -- --seed   → Reset + migrate + seed demo data
 *   npm run db:reset -- --skip-migrate → Just TRUNCATE tables (faster, no migration)
 */

import "dotenv/config";
import { execSync } from "child_process";
import pg from "pg";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://nil:Nilkamal09@localhost:5432/calenderly-db?schema=public";

const args = process.argv.slice(2);
const SEED = args.includes("--seed");
const SKIP_MIGRATE = args.includes("--skip-migrate");

// ─── Parse DB name from connection string ───────────────────────────────────
function parseDbName(url: string): string {
  const match = url.match(/\/([^/?]+)(\?|$)/);
  return match ? match[1] : "calenderly-db";
}

// ─── Build root connection string (connect to postgres DB to drop/create) ───
function rootConnStr(url: string): string {
  return url.replace(/\/[^/?]+(\?.*)?$/, "/postgres$1");
}

// ─── Pretty log helpers ──────────────────────────────────────────────────────
const log = (msg: string) => console.log(`\n  ${msg}`);
const step = (msg: string) => console.log(`\n\x1b[36m▶  ${msg}\x1b[0m`);
const ok = (msg: string) => console.log(`\x1b[32m  ✓ ${msg}\x1b[0m`);
const warn = (msg: string) => console.log(`\x1b[33m  ⚠ ${msg}\x1b[0m`);

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n\x1b[1m═══════════════════════════════════════════\x1b[0m");
  console.log("  🗑️  Event Scheduler — Database Reset Tool  ");
  console.log("\x1b[1m═══════════════════════════════════════════\x1b[0m");

  const dbName = parseDbName(DATABASE_URL);
  log(`Target database: \x1b[1m${dbName}\x1b[0m`);
  log(`Mode: ${SKIP_MIGRATE ? "TRUNCATE only" : "Full reset (drop + migrate)"}`);
  if (SEED) log("Seed: \x1b[32mEnabled\x1b[0m");

  if (SKIP_MIGRATE) {
    // ── Fast path: just TRUNCATE all application tables ──────────────────────
    step("Truncating all tables (RESTART IDENTITY CASCADE)...");
    const client = new pg.Client({ connectionString: DATABASE_URL });
    try {
      await client.connect();
      await client.query(`
        TRUNCATE TABLE
          "bookings",
          "slots",
          "availability_exceptions",
          "availability_rules",
          "event_types",
          "users"
        RESTART IDENTITY CASCADE;
      `);
      ok("All tables truncated and sequences reset!");
    } finally {
      await client.end();
    }
  } else {
    // ── Full reset: drop DB, recreate, run Prisma migrations ─────────────────
    step("Connecting to PostgreSQL server to drop/recreate database...");
    const rootClient = new pg.Client({ connectionString: rootConnStr(DATABASE_URL) });

    try {
      await rootClient.connect();

      // Terminate active connections
      step(`Terminating active connections to '${dbName}'...`);
      await rootClient.query(`
        SELECT pg_terminate_backend(pid)
        FROM pg_stat_activity
        WHERE datname = '${dbName}'
          AND pid <> pg_backend_pid();
      `).catch(() => {});
      ok("Active connections terminated.");

      // Drop DB
      step(`Dropping database '${dbName}'...`);
      await rootClient.query(`DROP DATABASE IF EXISTS "${dbName}";`);
      ok(`Database '${dbName}' dropped.`);

      // Recreate DB
      step(`Creating fresh database '${dbName}'...`);
      await rootClient.query(`CREATE DATABASE "${dbName}";`);
      ok(`Database '${dbName}' created.`);
    } finally {
      await rootClient.end();
    }

    // Run Prisma migrations
    step("Running Prisma migrations...");
    try {
      execSync("npx prisma migrate deploy", {
        stdio: "inherit",
        env: { ...process.env, DATABASE_URL },
      });
      ok("Migrations applied successfully.");
    } catch {
      warn("prisma migrate deploy failed, trying migrate dev...");
      execSync("npx prisma migrate dev --name reset", {
        stdio: "inherit",
        env: { ...process.env, DATABASE_URL },
      });
      ok("Migrations applied via migrate dev.");
    }

    // Regenerate Prisma client
    step("Regenerating Prisma client...");
    execSync("npx prisma generate", { stdio: "inherit" });
    ok("Prisma client regenerated.");
  }

  // ── Optional seed ─────────────────────────────────────────────────────────
  if (SEED) {
    step("Seeding database with demo data...");
    execSync("npx prisma db seed", {
      stdio: "inherit",
      env: { ...process.env, DATABASE_URL },
    });
    ok("Database seeded with demo data.");
  }

  console.log("\n\x1b[1m═══════════════════════════════════════════\x1b[0m");
  console.log("  ✅  Database reset complete! Ready to go.  ");
  console.log("\x1b[1m═══════════════════════════════════════════\x1b[0m\n");
}

main().catch((err) => {
  console.error("\n\x1b[31m❌ Reset failed:\x1b[0m", err.message || err);
  process.exit(1);
});
