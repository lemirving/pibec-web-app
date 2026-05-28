import { Scroll, Upload } from "lucide-react";
import Link from "next/link";
import NotificationDropdown from "./notification-dropdown";
import { ProfileDropdownMenu } from "./profile-dropdownmenu";
import { Button } from "../ui/button";
import { SignIn, SignUp, SignInButton, SignUpButton, Show, UserButton} from "@clerk/nextjs";

const Logo = () => {
    return (
        <Link href={"/"} className="flex items-center gap-2 group">
            <div className="flex items-center gap-2 ">
                <div className="size-9 rounded-full bg-primary flex items-center justify-center">
                    <Scroll className="size-6 text-secondary"/>
                </div>
                <span className="text-xl font-bold">WebApp</span>
            </div>
        </Link>
    );
}

export default function Header() {
    const isSignedIn = true;
    return(
        // Mudado de fixed para sticky. Mantemos o z-50 para ele ficar por cima de tudo.
        <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
            <div className="px-6 w-full">
                <div className="flex h-20 items-center justify-between">
                    <Logo />
                    <div className="flex gap-5">
                        <div className="flex items-center gap-5 ">
                            <Show when="signed-out">
                                <SignInButton>
                                    <Button variant={"ghost"} className="text-base rounded-xl font-semibold  hover:text-black hover:bg-chart-4 hover:font-bold w-25"> Entrar </Button>
                                </SignInButton>
                                <SignUpButton>
                                    <Button className="text-base rounded-sm font-semibold  hover:text-secondary hover:font-bold w-30"> Criar conta</Button>
                                </SignUpButton>
                            </Show>
                            <Show when="signed-in">
                                <Button asChild className="font-bold text-base  rounded-xs ">
                                    <Link href={"/upload"}> <Upload className="size-4"/>Publicar</Link>
                                </Button>
                                <NotificationDropdown />
                                <UserButton />
                            </Show>
                        </div>
                       < div className="flex gap-2">
                       </div>
                    </div>
                </div>
            </div>
        </header>
    );
}