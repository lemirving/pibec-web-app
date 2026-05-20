import { LucideIcon } from "lucide-react";

export default function StatsCard(
    {
        icon: Icon, label, value
    }:{
        icon:LucideIcon,
        label:string,
        value:string
    }
){

    return(

        <div>
            <div className=" flex f items-center justify-center gap-2">
                <Icon className="size-5 text-primary/70"/>
                <p className="text-2xl sm:text-3xl font-bold">{value}</p>
            </div>
                <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    );
}