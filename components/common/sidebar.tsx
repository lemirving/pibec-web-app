"use client"
import { BookUser, ChartColumnIncreasing, House, LibraryBig, Mail, PanelRight, Scroll, Settings, SquareArrowRightExit } from "lucide-react";
import { SheetContent, SheetTrigger, Sheet } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function Sidebar() {
    return(
        <>
            {/* DESKTOP SIDEBAR */}
            <aside className="sticky top-20 h-[calc(100vh-5rem)] hidden w-14 flex-col border-r bg-background sm:flex z-40">
                <nav className="flex flex-col items-center gap-5 px-2 py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={"/"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:text-muted-foreground">
                                    <House className="size-5" />
                                    <span className="sr-only">Início</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Início</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={"/textos"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:text-muted-foreground">
                                    <LibraryBig className="size-5" />
                                    <span className="sr-only">Textos</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Acervo</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={"/alunos"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:text-muted-foreground">
                                    <BookUser className="size-5" />
                                    <span className="sr-only">Alunos</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Alunos</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={"/relatorios"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:text-muted-foreground">
                                    <ChartColumnIncreasing className="size-5" />
                                    <span className="sr-only">Estatísticas</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Estatísticas</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={"#"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:text-muted-foreground">
                                    <Mail className="size-5" />
                                    <span className="sr-only">Notificações</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Notificações</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>  
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger >
                                <Link href={"#"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:text-muted-foreground">
                                    <Settings className="size-5" />
                                    <span className="sr-only">Configurações</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Configurações</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={"/login"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:text-red-600">
                                    <SquareArrowRightExit className="size-5" />
                                    <span className="sr-only">Sair</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Sair</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>

            {/* MOBILE SIDEBAR (Menu Hambúrguer) */}
            <div className="sm:hidden flex flex-none p-4 border-b">
                <header className="flex gap-2 items-center text-sm font-bold w-full">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button size={"icon"} variant={"outline"} className="items-center justify-center">
                            <PanelRight className="w-5 h-5"/>
                            <span className="sr-only">Abrir/fechar menu</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="sm:max-w-xs">
                        <nav className="grid gap-5 text-lg font-medium mt-6 ml-5">
                            <Link href={"#"} className="flex h-10 w-10 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2" prefetch={false}>
                                <Scroll className="size-5 transition-all"/>
                                <span className="sr-only"> Logo do Projeto </span>
                            </Link>

                            <Link href={"/"} className="flex mt-8 items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                                <House className="size-5 transition-all"/>
                                <span> Início </span>
                            </Link>

                            <Link href={"/textos"} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                                <LibraryBig className="size-5 transition-all"/>
                                <span> Textos </span>
                            </Link>

                            <Link href={"/alunos"} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                                <BookUser className="size-5 transition-all"/>
                                <span> Alunos </span>
                            </Link>

                            <Link href={"/relatorios"} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                                <ChartColumnIncreasing className="size-5 transition-all"/>
                                <span> Estatísticas </span>
                            </Link>

                            <Link href={"/notificacao"} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                                <Mail className="size-5 transition-all"/>
                                <span> Notificações </span>
                            </Link>

                            <Link href={"/configuracoes"} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                                <Settings className="size-5 transition-all"/>
                                <span> Configurações </span>
                            </Link>

                            <Link href={"/login"} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                                <SquareArrowRightExit className="size-5 transition-all"/>
                                <span> Sair </span>
                            </Link>
                        </nav>
                      </SheetContent>
                    </Sheet>
                </header>
            </div>
        </>
    );
}