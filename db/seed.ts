// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import * as schema from './schema'; // Ajuste o caminho conforme sua estrutura de pastas

// // Inicialização da conexão com o Neon usando a variável de ambiente
// const sql = neon(process.env.DATABASE_URL!);
// const db = drizzle(sql, { schema });

// async function main() {
//   console.log('🌱 Começando o processo de seeding...');

//   // 0. LIMPEZA TOTAL (Opcional, mas excelente para ambientes de teste não acumularem lixo)
//   console.log('🧹 Limpando dados antigos...');
//   await db.delete(schema.spellingErrors);
//   await db.delete(schema.errorDictionary);
//   await db.delete(schema.files);
//   await db.delete(schema.texts);
//   await db.delete(schema.authors);
//   await db.delete(schema.classrooms);
//   await db.delete(schema.users);

//   // 1. INSERIR PROFESSOR (Simulando ID retornado pelo Clerk)
//   console.log('👥 Inserindo professores...');
//   const [professor] = await db.insert(schema.users).values({
//     id: 'user_clerk_987654321_pibec', // Formato de string estável vindo do Clerk
//     name: 'Prof. Carlos Silva',
//     email: 'carlos.linguistica@unir.br',
//   }).returning();

//   // 2. INSERIR TURMAS (Classrooms)
//   console.log('🏫 Inserindo turmas...');
//   const [fundamentalClass] = await db.insert(schema.classrooms).values({
//     name: '9º Ano A - Fundamental',
//     year: 2026,
//   }).returning();

//   const [medioClass] = await db.insert(schema.classrooms).values({
//     name: '3º Ano 01 - Ensino Médio',
//     year: 2026,
//   }).returning();

//   // 3. INSERIR ALUNOS (Authors)
//   console.log('✍️ Inserindo alunos...');
//   const [student1] = await db.insert(schema.authors).values({
//     name: 'Lucas Oliveira Santos',
//     classroomId: fundamentalClass.id,
//     educationLevel: 'Ensino Fundamental',
//     grade: '9_fundamental',
//   }).returning();

//   const [student2] = await db.insert(schema.authors).values({
//     name: 'Mariana Costa Souza',
//     classroomId: medioClass.id,
//     educationLevel: 'Ensino Médio',
//     grade: '3_medio',
//   }).returning();

//   // 4. INSERIR DICIONÁRIO DE ERROS LINGUÍSTICOS (Error Dictionary)
//   console.log('📚 Populando dicionário de erros recorrentes...');
//   const [errCasa] = await db.insert(schema.errorDictionary).values({
//     wordFound: 'caza',
//     errorType: 'Ortografia',
//     explanation: 'A palavra "casa" é grafada com "S", embora possua o fonema /z/ por estar entre duas vogais.',
//   }).returning();

//   const [errAgente] = await db.insert(schema.errorDictionary).values({
//     wordFound: 'agente',
//     errorType: 'Semântica/Ortografia',
//     explanation: 'Utiliza-se "a gente" (separado) como locução pronominal equivalente a "nós". A palavra "agente" (junto) refere-se a um cargo ou operador de uma ação (ex: agente secreto).',
//   }).returning();

//   // 5. INSERIR TEXTOS (Productions)
//   console.log('📝 Inserindo produções textuais...');
  
//   // Texto 1: Já revisado e corrigido pelo professor
//   const text1Content = 'Eu gosto de ficar em caza lendo livros. A gente aprende muito mais.';
//   const [text1] = await db.insert(schema.texts).values({
//     authorId: student1.id,
//     reviewerId: professor.id,
//     status: 'corrigido',
//     genre: 'cronica',
//     complexity: 'Fácil',
//     content: text1Content,
//     wordsCount: 13,
//     totalErrorsCount: 1,
//   }).returning();

//   // Texto 2: Pendente de revisão (Acabou de ser enviado pelo aluno)
//   const text2Content = 'O agente fomos na feira ontem.';
//   const [text2] = await db.insert(schema.texts).values({
//     authorId: student2.id,
//     reviewerId: null, // Ainda nenhum professor assumiu a correção
//     status: 'pendente',
//     genre: 'redacao_enem',
//     complexity: 'Média',
//     content: text2Content,
//     wordsCount: 6,
//     totalErrorsCount: 0, // Será calculado pela IA depois
//   }).returning();

//   // 6. INSERIR ARQUIVOS FICTÍCIOS NO CLOUDFLARE R2 (Files)
//   console.log('☁️ Vinculando metadados de arquivos do Cloudflare R2...');
//   await db.insert(schema.files).values([
//     {
//       fileUrl: 'https://pub-pibec-storage.r2.dev/redacoes/lucas_cronica_01.png',
//       extension: 'png',
//       authorId: student1.id,
//       textId: text1.id,
//     },
//     {
//       fileUrl: 'https://pub-pibec-storage.r2.dev/redacoes/mariana_enem_final.pdf',
//       extension: 'pdf',
//       authorId: student2.id,
//       textId: text2.id,
//     }
//   ]);

//   // 7. INSERIR ERROS DO TEXTO (Spelling Errors - Vinculados ao texto 1)
//   console.log('🤖 Inserindo desvios gramaticais detectados pela IA...');
//   await db.insert(schema.spellingErrors).values({
//     textId: text1.id,
//     dictionaryId: errCasa.id, // Conecta diretamente com a explicação pedagógica
//     wordFound: 'caza',
//     suggestion: 'casa',
//     classification: 'Ortografia',
//     isCorrected: true, // Professor validou a sugestão da IA
//   });

//   console.log('✨ Banco de dados populado com absoluto sucesso para o PIBEC!');
// }

// main()
//   .catch((e) => {
//     console.error('❌ Erro durante o seeding:', e);
//     process.exit(1);
//   });