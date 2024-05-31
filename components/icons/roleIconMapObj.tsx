//ICON MAP FOR DISTINCT MEMBER ROLES
//USE IN INDIVIDUAL FILES OR AS GLOBAL IMPORT
//UPDATES COMING SOON
//VERSION 1.0
//@FXSO
//LUCIDE-ICONS

import { ShieldAlert, ShieldCheck } from "lucide-react";

//role-Icons
export const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-600"/>,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-600"/>
}