import { pgTable, uuid, varchar, text, integer, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ==========================================
// ENUMS & TIPOS CUSTOMIZADOS
// ==========================================

export const textStatusEnum = pgEnum('text_status', ['pendente', 'em_revisao', 'corrigido']);
export const textGenreEnum = pgEnum('text_genre', ['redacao_enem', 'conto', 'cronica', 'artigo_opiniao', 'outro']);

// Expandido para cobrir do fundamental ao Ensino Médio completo
export const gradeEnum = pgEnum('grade', [
  '6_fundamental', '7_fundamental', '8_fundamental', '9_fundamental',
  '1_medio', '2_medio', '3_medio'
]);

export const classroomNameEnum = pgEnum ('classroom_name',['A', 'B', 'C', 'D', 'E'])

// ==========================================
// TABELAS
// ==========================================

// 1. USER (Professores/Revisores autenticados via Clerk)
export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(), // ID vindo direto do Clerk
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 2. CLASSROOM (Turmas organizadas)
export const classrooms = pgTable('classrooms', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: classroomNameEnum('name').notNull(), // ex: "9º Ano A"
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
  educationLevel: varchar('education_level', { length: 100 }).notNull(), // ex: "Ensino Médio"
  grade: gradeEnum('grade').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 4. TEXTS (Produções Textuais)
export const texts = pgTable('texts', {
  id: uuid('id').defaultRandom().primaryKey(),
  authorId: uuid('author_id')
    .references(() => authors.id, { onDelete: 'cascade' })
    .notNull(),
  reviewerId: varchar('reviewer_id', { length: 255 })
    .references(() => users.id, { onDelete: 'set null' }), // Opcional (pode iniciar sem revisor)
  status: textStatusEnum('status').default('pendente').notNull(),
  genre: textGenreEnum('genre').notNull(),
  title: text('title').notNull(),
  complexity: varchar('complexity', { length: 50 }), // Métrica calculada pela IA se necessário
  content: text('content').notNull(), // O texto transcrito/digitado em si
  wordsCount: integer('words_count').default(0).notNull(),
  totalErrorsCount: integer('total_errors_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 5. FILES (Arquivos brutos enviados para o Cloudflare R2)
export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey(),
  fileUrl: text('file_url').notNull(), // URL pública ou assinada do R2
  extension: varchar('extension', { length: 10 }).notNull(), // .pdf, .png, .jpeg
  authorId: uuid('author_id')
    .references(() => authors.id, { onDelete: 'cascade' })
    .notNull(), // Corrigido a FK para apontar para a tabela de alunos
  textId: uuid('text_id')
    .references(() => texts.id, { onDelete: 'cascade' }), // Opcional se o arquivo subir antes da transcrição
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 6. ERROR DICTIONARY (Dicionário global de erros recorrentes)
export const errorDictionary = pgTable('error_dictionary', {
  id: uuid('id').defaultRandom().primaryKey(),
  wordFound: varchar('word_found', { length: 255 }).notNull().unique(), // Palavra errada base
  errorType: varchar('error_type', { length: 100 }).notNull(), // ex: "Ortografia", "Regência"
  explanation: text('explanation').notNull(), // Explicação pedagógica para o revisor/aluno
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 7. SPELLING ERRORS (Erros detectados pela IA em um texto específico)
export const spellingErrors = pgTable('spelling_errors', {
  id: uuid('id').defaultRandom().primaryKey(),
  textId: uuid('text_id')
    .references(() => texts.id, { onDelete: 'cascade' })
    .notNull(),
  dictionaryId: uuid('dictionary_id')
    .references(() => errorDictionary.id, { onDelete: 'set null' }), // FK vinculando ao dicionário global
  wordFound: varchar('word_found', { length: 255 }).notNull(), // A palavra como foi escrita no texto
  suggestion: varchar('suggestion', { length: 255 }).notNull(), // Sugestão da IA
  classification: varchar('classification', { length: 100 }).notNull(), // Categoria do desvio
  isCorrected: boolean('is_corrected').default(false).notNull(), // Se o revisor aceitou a correção
  createdAt: timestamp('created_at').defaultNow().notNull(),
});



// ==========================================
// DEFINIÇÃO DAS RELAÇÕES (DRIZZLE RELATIONAL API)
// ==========================================

// Relações da tabela Users (Professores)
export const usersRelations = relations(users, ({ many }) => ({
  texts: many(texts),
}));

// Relações da tabela Classroom (Turmas)
export const classroomsRelations = relations(classrooms, ({ many }) => ({
  authors: many(authors),
}));

// Relações da tabela Author (Alunos)
export const authorsRelations = relations(authors, ({ one, many }) => ({
  classroom: one(classrooms, {
    fields: [authors.classroomId],
    references: [classrooms.id],
  }),
  texts: many(texts),
  files: many(files),
}));

// Relações da tabela Texts (Produções Textuais)
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

// Relações da tabela Files (Arquivos no Cloudflare R2)
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

// Relações da tabela ErrorDictionary (Dicionário Global)
export const errorDictionaryRelations = relations(errorDictionary, ({ many }) => ({
  spellingErrors: many(spellingErrors),
}));

// Relações da tabela SpellingErrors (Erros por texto)
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