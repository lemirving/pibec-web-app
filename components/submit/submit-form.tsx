"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription, 
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { getFeaturedTexts } from "@/lib/texts/select-texts"
import { AuthorCombobox } from "../authors/authors-combobox"


const textStatusEnum = ['pendente', 'em_revisao', 'corrigido'];
const textGenreEnum = ['redacao_enem', 'conto', 'cronica', 'artigo_opiniao', 'outro'];

const formSchema = z.object({
  title: z
    .string()
    .min(5, "O título deve conter pelo menos 5 caracteres.")
    .max(50, "O título deve conter no máximo 50 caracteres."),
  description: z
    .string()
    // .min(20, "A descrição deve conter pelo menos 20 caracteres.")
    .max(100, "Description must be at most 100 characters."),

  theme: z
    .string()
    .min(5, "O tema deve conter pelo menos 5 caracteres.")
    .max(50, "O tema deve conter no máximo 50 caracteres."),

    genre: z.enum(['redacao_enem', 'conto', 'cronica', 'artigo_opiniao', 'outro'], {
        error: "Selecione um gênero textual válido.",
    }),
    status: z.enum( ['pendente', 'em_revisao', 'corrigido'], {
        error: "Selecione um status válido.",
    }),
    authorId: z.uuid("Selecione o autor do texto")
})
interface SubmitFormProps {
  classrooms: { id: string; name: string }[];
}

export function SubmitForm({ classrooms }: SubmitFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      theme: "",
      genre: "redacao_enem",
      status: "pendente",
      authorId: undefined
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Elementos submetidos:", {
      description: (
        <pre className="mt-2 w-full overflow-x-auto rounded-md bg-code p-4 text-code-foreground text-sm">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
    })
  }

  return (
    // Removido o 'sm:max-w-md' para que o form possa crescer livremente na largura
    <Card className="w-full">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold">Uploads</CardTitle>
        <CardDescription className="text-lg">
          Preencha o formulário com os dados do texto e seus arquivos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-6">
            
            {/* Aluno */}
            <Controller
              name="authorId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel className="text-lg font-semibold">Aluno (autor do texto)</FieldLabel>
                  <AuthorCombobox
                    value={field.value}
                    onChange={field.onChange}
                    classrooms={classrooms}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Título */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor="form-title" className="text-lg font-semibold">
                    Título
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex: Minha vida na Pandemia..."
                    autoComplete="off"
                    className="h-12 text-base" /* Aumentado aqui */
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Tema */}
            <Controller
              name="theme"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor="form-theme" className="text-lg font-semibold">
                    Tema
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-theme"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex: Saúde"
                    autoComplete="off"
                    className="h-12 text-base" /* Aumentado aqui */
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Gênero e Status lado a lado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gênero */}
              <Controller
                name="genre"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel htmlFor="genre" className="text-lg font-semibold">Gênero Textual</FieldLabel>
                    <select
                      {...field}
                      id="genre"
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" /* Mudado h-10 para h-12 e text-sm para text-base */
                    >
                      <option value="redacao_enem">Redação ENEM</option>
                      <option value="conto">Conto</option>
                      <option value="cronica">Crônica</option>
                      <option value="artigo_opiniao">Artigo de Opinião</option>
                      <option value="outro">Outro</option>
                    </select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Status */}
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel htmlFor="status" className="text-lg font-semibold">Status</FieldLabel>
                    <select
                      {...field}
                      id="status"
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" /* Mudado h-10 para h-12 e text-sm para text-base */
                    >
                      <option value="pendente">Pendente</option>
                      <option value="em_revisao">Em revisão</option>
                      <option value="corrigido">Corrigido</option>
                    </select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Descrição */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor="form-description" className="text-lg font-semibold">
                    Descrição (Opcional)
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-description"
                      placeholder="O texto se trata de um relato dos alunos sobre sua vida..."
                      rows={5}
                      className="min-h-28 resize-none text-base" /* Aumentada a fonte e altura inicial */
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums text-sm">
                        {(field.value || "").length}/100
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="w-full justify-end gap-4">
          <Button type="button" variant="outline" className="h-11 px-5 text-base" onClick={() => form.reset()}>
            Apagar tudo
          </Button>
          <Button type="submit" form="form-rhf-demo" className="h-11 px-5 text-base">
            Submeter
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}