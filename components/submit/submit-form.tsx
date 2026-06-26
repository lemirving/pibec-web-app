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
    authorId: z.uuid("Se")
})

export function SubmitForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      theme: "",
      genre: "redacao_enem", 
      status: "pendente"
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Elementos submetidos:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Uploads</CardTitle>
        <CardDescription>
            Preencha o formulário com os dados do texto e seus arquivos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/*Título */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Título
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex: Minha vida na Pandemia..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/*Tema */}

            <Controller
              name="theme"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Tema
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex: Saúde"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex justify-between gap-5">
                {/*Genero */}
            <Controller
              name="genre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="genre">Gênero Textual</FieldLabel>
                  <select 
                    {...field} 
                    id="genre" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            {/**Status */}
            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="status">Status</FieldLabel>
                  <select 
                    {...field} 
                    id="status" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Descrição (Opcional)
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="O texto se trata de um relato dos alunos sobre sua vida na época de pandemia..."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 caracteres
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
        
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/**Aqui vai ficar a parte da barra de pesquisa de autores no db(alunos)
             * e um button caso queiramos adicionar um aluno nunca registrado9ele vai abrir um popup espaço com outro forms
             */}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Apagar tudo
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submeter
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
