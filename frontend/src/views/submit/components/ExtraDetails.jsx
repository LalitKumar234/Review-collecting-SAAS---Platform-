import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoArrowBackSharp } from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox"
import {
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const ExrtaDetails = ({ submitTestimonial, setTestimonialData, testimonialData, setPage }) => {

    const handleChange = (value, type) => {
        setTestimonialData(prevData => ({
            ...prevData,
            extraDetails: {
                ...prevData.extraDetails,
                [type]: value
            }
        }));
    }

    return (
        <>
            <Button variant="ghost" className="hover:bg-transparent" onClick={() => setPage(1)}><IoArrowBackSharp />Back</Button>
            <CardHeader className="space-y-1 p-2">
                <CardTitle className="text-2xl text-center">
                    Add your details
                </CardTitle>
                <CardContent className="flex flex-col gap-5 justify-center pt-5">
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="name">Your name<span className='text-red-500'>*</span></Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder=""
                            onChange={(e) => handleChange(e.target.value, 'name')}
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="email">Your email<span className='text-red-500'>*</span></Label>
                        <Input
                            id="email"
                            type="text"
                            placeholder=""
                            onChange={(e) => handleChange(e.target.value, 'email')}
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="title">Your role & company<span className='text-red-500'>*</span></Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder=""
                            onChange={(e) => handleChange(e.target.value, 'role_company')}
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="title">Your website<span className='text-red-500'>*</span></Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder=""
                            onChange={(e) => handleChange(e.target.value, 'website')}
                        />
                    </div>
                    <div className="items-top flex space-x-2">
                        <Checkbox id="email"
                            checked={testimonialData.extraDetails.grantPermission}
                            onCheckedChange={() =>
                                setTestimonialData(prevData => ({
                                    ...prevData,
                                    extraDetails: {
                                        ...prevData.extraDetails,
                                        grantPermission: !testimonialData.extraDetails.grantPermission
                                    }
                                }))
                            }
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="email"
                                className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I grant you permission to use this testimonial for marketing and promotional efforts
                            </label>
                        </div>
                    </div>
                    <Button onClick={submitTestimonial}>Submit your testimonial</Button>
                </CardContent>
            </CardHeader>
        </>
    )
}

export default ExrtaDetails