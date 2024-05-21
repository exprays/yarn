import { Command, Search } from "lucide-react";

interface ServerSearchProps {
    data: {
        label:  string;
        type: "channel" | "member",
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined;
    }[]
}


export const ServerSearch = ({ data }: ServerSearchProps) => {
    return (
        <>
            <button className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400"/>
                <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                    Search
                </p>
                <kbd className="pointer-events-none inline-flex h-5 gap-1 select-none items-center rounded border bg-muted px-1.5 font-mono font-medium text-muted-foreground ml-auto">
                    <Command className="h-3 w-3"/><span className="text-small">+ K</span>
                </kbd>
            </button>
        </>
    )
}