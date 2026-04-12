import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex intems-center rounded-md px-2 py-0.5 text-xs font-medium",
    {
        variants : {
            variant : {
                default : "bg-primary text-white",
                secondary : "bg-gray-100 text-gray-700",
                outline : "border border-gray-300 text-gray-700",
                success : "bg-green-100 text-green-700",
                destructive : "bg-red-100 text-red-700",
            },
        },
        defaultVariants : {
            variant : "default",
        }
    }
);


function Badge ({className, variant, ...props}){
    return (
        <span className= {cn(badgeVariants ({variant}), className)}
        {...props}
        />
    );
}
export {Badge, badgeVariants};