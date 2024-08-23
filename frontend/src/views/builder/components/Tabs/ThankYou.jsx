import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

const ThankYou = ({ setFormDetails, formDetails }) => {
    return (
        <>
            <div className="grid gap-2 w-full">
                <Label htmlFor="name">Thankyou title<span className='text-red-500'>*</span></Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Thank you!"
                    value={formDetails.formConfig.thankYouTitle}
                    onChange={(e) => setFormDetails({
                        ...formDetails,
                        formConfig: {
                            ...formDetails.formConfig,
                            thankYouTitle: e.target.value,
                        },
                    })}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="content">Thankyou message<span className='text-red-400'>*</span></Label>
                <Textarea
                    id="content"
                    type="text"
                    value={formDetails.formConfig.thankYouMessage}
                    onChange={(e) => setFormDetails({
                        ...formDetails,
                        formConfig: {
                            ...formDetails.formConfig,
                            thankYouMessage: e.target.value,
                        },
                    })}
                    defaultValue="Thank you so much for your shoutout! It means a ton for us! "
                    placeholder="A short description about your form..."
                    rows="4"

                />
            </div>
            <div className="items-top flex space-x-2">
                <Checkbox id="includecta"
                    checked={formDetails.formConfig.includeCta}
                    onCheckedChange={() =>
                        setFormDetails({
                            ...formDetails,
                            formConfig: {
                                ...formDetails.formConfig,
                                includeCta: !formDetails.formConfig.includeCta,
                            },
                        })
                    }
                />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="includecta"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Include a call to action button
                    </label>
                </div>
            </div>
            {
                formDetails.formConfig.includeCta && <>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="name">Button Text</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Button text"
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="name">Button Url</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Button Url"
                        />
                    </div>
                </>
            }

        </>
    )
}

export default ThankYou