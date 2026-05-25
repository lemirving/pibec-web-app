import { Scroll } from "lucide-react";
import Link from "next/link";
import NotificationDropdown from "./notification-dropdown";
import { ProfileDropdownMenu } from "./profile-dropdownmenu";

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
    return(
        // Mudado de fixed para sticky. Mantemos o z-50 para ele ficar por cima de tudo.
        <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
            <div className="px-6 w-full">
                <div className="flex h-20 items-center justify-between">
                    <Logo />
                    <div className="flex gap-5">
                        <NotificationDropdown />
                        <ProfileDropdownMenu />
                    </div>
                </div>
            </div>
        </header>
    );
}