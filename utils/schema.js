import { create } from "domain";
import { serial, varchar ,text} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
// import { text } from "stream/consumers";

export const mockInterview = pgTable('mockInterview' , {
    id : serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExp:varchar('jobExp').notNull(),
    createdBy : varchar('createdBy').notNull(),
    createdAt : varchar('createdAt').notNull(),
    mockId : varchar('mockId').notNull(),
})