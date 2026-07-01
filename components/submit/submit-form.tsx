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
import { FileAttachments, PendingFile } from "./file-attachments"
import { uploadFiles } from "@/lib/r2/upload-files"
import { createText } from "@/lib/texts/create-text"
import { Loader2 } from "lucide-react"


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
  const [attachments, setAttachments] = React.useState<PendingFile[]>([]);
  const [submitting, setSubmitting] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);

  async function onSubmit(data: z.infer<typeof formSchema>) {
      console.log("onSubmit chamado", data); 
    if (attachments.length === 0) {
      toast.error("Anexe pelo menos um arquivo.");
      return;
    }

    setSubmitting(true);

    try {
      const uploaded = await uploadFiles(attachments);

      await createText({ ...data, attachments: uploaded });

      toast.success("Texto submetido com sucesso!", {
        position: "top-center",
        style: {
          background: "green",
          color: "white",
        },
      });
      form.reset();
      setAttachments([]);
      setResetKey((k) => k + 1); 
    } catch (err) {
      console.error("ERRO:", err);
      toast.error(
        err instanceof Error ? err.message : "Erro ao submeter o texto."
      );
    } finally {
      setSubmitting(false);
    }
  }

    function onReset() {

        setSubmitting(false);

        try {
          form.reset();
          setAttachments([]);
          setResetKey((k) => k + 1); 
        } catch (err) {
          console.error("ERRO:", err);
          toast.error(
            err instanceof Error ? err.message : "Erro ao resetar forms."
          );
        } finally {
          setSubmitting(false);
        }
    }
  return (
    <Card className="w-full max-w-280">
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl font-bold">Uploads</CardTitle>
        <CardDescription className="text-lg">
          Preencha o formulário com os dados do texto e seus arquivos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-8">
            
            {/* Aluno */}
            <Controller
              name="authorId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel className="text-lg font-semibold">Aluno (autor do texto)</FieldLabel>
                  <AuthorCombobox
                    key={resetKey}
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
                    className="h-12 text-base" 
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
                    className="h-12 text-base" 
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
                      className="min-h-28 resize-none text-base" 
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
            {/*Files */}
            <Field>
              <FieldLabel className="text-lg font-semibold">
                Arquivos do texto
              </FieldLabel>
              <FileAttachments files={attachments} onChange={setAttachments} />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="w-full justify-end gap-4">
          <Button type="button" variant="outline" className="h-11 px-5 text-base hover:bg-red-500 hover:text-white" onClick={onReset}>
            Apagar tudo
          </Button>
          <Button type="submit" form="form-rhf-demo" className="h-11 px-5 text-base hover:" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Enviando...</span>
              </>
              )  
              : ("Submeter")
            }
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}