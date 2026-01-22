import { integer, pgTable, text, timestamp, varchar, index } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, sql } from 'drizzle-orm';

export const links = pgTable(
  'links',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    shortCode: varchar('short_code', { length: 20 }).notNull().unique(),
    originalUrl: text('original_url').notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    shortCodeIdx: index('short_code_idx').on(table.shortCode),
    userIdIdx: index('user_id_idx').on(table.userId),
  })
);

// Export TypeScript types for type-safe database operations
export type Link = InferSelectModel<typeof links>;
export type NewLink = InferInsertModel<typeof links>;
