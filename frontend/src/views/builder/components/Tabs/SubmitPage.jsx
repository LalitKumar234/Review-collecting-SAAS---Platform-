import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"

const SubmitPage = () => {
    return (
        <>
            <div className="items-top flex space-x-2">
                <Checkbox id="avatar" />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="avatar"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Avatar field
                    </label>
                </div>
            </div>
            <div className="items-top flex space-x-2">
                <Checkbox id="name" />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Name field
                    </label>
                </div>
            </div>
            <div className="items-top flex space-x-2">
                <Checkbox id="email" />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Email field required
                    </label>
                </div>
            </div>
            <div className="items-top flex space-x-2">
                <Checkbox id="role" />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="role"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Role/company field
                    </label>
                </div>
            </div>
        </>
    )
}

export default SubmitPage