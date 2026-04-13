import * as React from "react";
import { cn } from "@/lib/utils";

function Card ({className, ...props}){
    return(
        <div
        className={cn("rounded-xl border bg-white shadow-sm", className)} {...props}/>
    );
}

function CardContent({className, ...props}){
    return(
        <div className={cn("p-4", className)} {...props} />
    );
}

export {Card , CardContent};