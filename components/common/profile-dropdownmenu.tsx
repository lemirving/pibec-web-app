"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, SquareArrowRightExit, User2, UserPen } from "lucide-react"
import Link from "next/link"

export function ProfileDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full w-9 h-9"><User2 className="size-5"/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full pr-4" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm">Minha conta</DropdownMenuLabel>
            <DropdownMenuItem asChild>
                <Link href="/perfil" className="flex gap-2 items-center">
                    <UserPen className="size-4" /> Perfil
                </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
                <Link href="/configuracoes" className="flex gap-2 items-center">
                    <Settings className="size-4" /> Configurações
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/login" className="flex gap-2 items-center">
                    <SquareArrowRightExit className="size-4" /> Sair
                </Link>
            </DropdownMenuItem>

        </DropdownMenuGroup>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
