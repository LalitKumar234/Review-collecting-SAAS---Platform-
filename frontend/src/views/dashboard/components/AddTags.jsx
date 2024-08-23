import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TiTags } from "react-icons/ti";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const AddTags = () => {
    const [open, setOpen] = useState(false)

    const [showStatusBar, setShowStatusBar] = useState(true)
    const [showActivityBar, setShowActivityBar] = useState(false)
    const [showPanel, setShowPanel] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1 cursor-pointer">
                    <TiTags size={18} />
                    <h2 className="text-sm font-medium leading-none peer-disabled:opacity-70">Tags</h2>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>Apply tags to this testimonial</DialogTitle>
                    <DialogDescription>
                        You can add upto 5 tags. Manage all your tags here.
                    </DialogDescription>
                </DialogHeader>

                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">SELECT...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                            checked={showStatusBar}
                            onCheckedChange={setShowStatusBar}
                        >
                            Status Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showActivityBar}
                            onCheckedChange={setShowActivityBar}
                        >
                            Activity Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showPanel}
                            onCheckedChange={setShowPanel}
                        >
                            Panel
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </DialogContent>
        </Dialog>
    )
}

export default AddTags