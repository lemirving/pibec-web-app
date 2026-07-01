import { pgTable, uuid, varchar, text, integer, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';


export const textStatusEnum = pgEnum('text_status', ['pendente', 'em_revisao', 'corrigido']);
export const textGenreEnum = pgEnum('text_genre', ['redacao_enem', 'conto', 'cronica', 'artigo_opiniao', 'outro']);


export const gradeEnum = pgEnum('grade', [
  '6_fundamental', '7_fundamental', '8_fundamental', '9_fundamental',
  '1_medio', '2_medio', '3_medio'
]);

export const classroomNameEnum = pgEnum ('classroom_name',['A', 'B', 'C', 'D', 'E'])

export type Grade = (typeof gradeEnum.enumValues)[number];

export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(), 
  
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


export const classrooms = pgTable('classrooms', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: classroomNameEnum('name').notNull(), 
  year: integer('year').notNull(), // ex: 2026
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. AUTHOR (Alunos)
export const authors = pgTable('authors', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  classroomId: uuid('classroom_id')
    .references(() => classrooms.id, { onDelete: 'cascade' })
    .notNull(),
  grade: gradeEnum('grade').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const texts = pgTable('texts', {
  id: uuid('id').defaultRandom().primaryKey(),
  authorId: uuid('author_id')
    .references(() => authors.id, { onDelete: 'cascade' })
    .notNull(),
  reviewerId: varchar('reviewer_id', { length: 255 })
    .references(() => users.id, { onDelete: 'set null' }), 
  status: textStatusEnum('status').default('pendente').notNull(),
  genre: textGenreEnum('genre').notNull(),
  title: text('title').notNull(),
  theme: text('theme').notNull(),
  content: text('content'), 
  wordsCount: integer('words_count').default(0),
  totalErrorsCount: integer('total_errors_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey(),
  fileUrl: text('file_url').notNull(), 
  extension: varchar('extension', { length: 10 }).notNull(), 
  authorId: uuid('author_id')
    .references(() => authors.id, { onDelete: 'cascade' })
    .notNull(), 
  textId: uuid('text_id')
    .references(() => texts.id, { onDelete: 'cascade' }), 
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const errorDictionary = pgTable('error_dictionary', {
  id: uuid('id').defaultRandom().primaryKey(),
  wordFound: varchar('word_found', { length: 255 }).notNull().unique(), 
  errorType: varchar('error_type', { length: 100 }).notNull(), 
  explanation: text('explanation').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const spellingErrors = pgTable('spelling_errors', {
  id: uuid('id').defaultRandom().primaryKey(),
  textId: uuid('text_id')
    .references(() => texts.id, { onDelete: 'cascade' })
    .notNull(),
  dictionaryId: uuid('dictionary_id')
    .references(() => errorDictionary.id, { onDelete: 'set null' }), 
  wordFound: varchar('word_found', { length: 255 }).notNull(), 
  suggestion: varchar('suggestion', { length: 255 }).notNull(), 
  classification: varchar('classification', { length: 100 }).notNull(), 
  isCorrected: boolean('is_corrected').default(false).notNull(), 
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


export const usersRelations = relations(users, ({ many }) => ({
  texts: many(texts),
}));


export const classroomsRelations = relations(classrooms, ({ many }) => ({
  authors: many(authors),
}));


export const authorsRelations = relations(authors, ({ one, many }) => ({
  classroom: one(classrooms, {
    fields: [authors.classroomId],
    references: [classrooms.id],
  }),
  texts: many(texts),
  files: many(files),
}));


export const textsRelations = relations(texts, ({ one, many }) => ({
  author: one(authors, {
    fields: [texts.authorId],
    references: [authors.id],
  }),
  reviewer: one(users, {
    fields: [texts.reviewerId],
    references: [users.id],
  }),
  files: many(files),
  spellingErrors: many(spellingErrors),
}));


export const filesRelations = relations(files, ({ one }) => ({
  author: one(authors, {
    fields: [files.authorId],
    references: [authors.id],
  }),
  text: one(texts, {
    fields: [files.textId],
    references: [texts.id],
  }),
}));


export const errorDictionaryRelations = relations(errorDictionary, ({ many }) => ({
  spellingErrors: many(spellingErrors),
}));


export const spellingErrorsRelations = relations(spellingErrors, ({ one }) => ({
  text: one(texts, {
    fields: [spellingErrors.textId],
    references: [texts.id],
  }),
  dictionary: one(errorDictionary, {
    fields: [spellingErrors.dictionaryId],
    references: [errorDictionary.id],
  }),
}));