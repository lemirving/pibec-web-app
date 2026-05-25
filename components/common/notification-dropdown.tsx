import { Bell } from "lucide-react";
import { Button } from "../ui/button";


export default function NotificationDropdown() {

    return(
        <Button variant="outline"className="rounded-full w-9 h-9"><Bell className="size-4"/> </Button>
    );
}