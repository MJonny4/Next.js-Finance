import { accounts, categories, transactions } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { subDays } from "date-fns";
import {config} from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({
    path: ".env.local"
})

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)