import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button"
const Delete = () => {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1 cursor-pointer text-red-500 border-red-500 hover:text-red-500 hover:bg-red-100">
                    <MdDeleteOutline size={20} />
                    {/* <h2 className="text-sm font-medium leading-none peer-disabled:opacity-70">Delete</h2> */}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>Embed wall of love</DialogTitle>
                    <DialogDescription>
                        Customise your wall of love
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default Delete