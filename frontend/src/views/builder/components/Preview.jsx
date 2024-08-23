import React from 'react'
import { HiMiniVideoCamera } from "react-icons/hi2";
import { HiOutlinePencil } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { RiSettings4Line } from "react-icons/ri";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const Preview = ({ page, setPage, formDetails}) => {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <Card className='max-w-[450px] w-full py-2 shadow-lg relative'>
                <div className='absolute top-[-20px] right-4 bg-green-200 text-green-600 py-2 px-5 rounded-full text-sm font-semibold'>Live Preview</div>
                {
                    page === 0 && <>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">
                                {formDetails.title}
                            </CardTitle>
                            <CardDescription className="text-center pt-2">
                            {formDetails.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <CardDescription className="uppercase font-bold text-md">
                                Questions
                            </CardDescription>
                            {
                                formDetails.formConfig.questions.length > 0 && <ul className='text-muted-foreground text-sm px-5'>
                                {
                                    formDetails.formConfig.questions.map((question, index)=> (
                                        <li className='list-disc' key={index}>{question}</li>
                                    ))
                                }
                            </ul>
                            }
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3 pt-7">
                           {formDetails.formConfig.enableVideo && <Button className="w-full flex gap-2"><HiMiniVideoCamera size={20} />Record a video</Button>} 
                            <Button className="w-full flex gap-2 bg-slate-900 hover:bg-slate-700"><HiOutlinePencil size={20} />Send in text</Button>
                        </CardFooter>
                    </>
                }
                {
                    page === 1 && <>
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
                                    />
                                </div>
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="email">Your email<span className='text-red-500'>*</span></Label>
                                    <Input
                                        id="email"
                                        type="text"
                                        placeholder=""
                                    />
                                </div>
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="title">Your role & company<span className='text-red-500'>*</span></Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder=""
                                    />
                                </div>
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="title">Your website<span className='text-red-500'>*</span></Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder=""
                                    />
                                </div>
                                <div className="items-top flex space-x-2">
                            <Checkbox id="email" />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="email"
                                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I grant you permission to use this testimonial for marketing and promotional efforts
                                </label>
                            </div>
                        </div>
                                <Button>Submit your testimonial</Button>
                            </CardContent>
                        </CardHeader>
                    </>
                }
                {
                    page === 2 && <>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">
                                {formDetails.formConfig.thankYouTitle}
                            </CardTitle>
                            <CardDescription className="text-center pt-2">
                            {formDetails.formConfig.thankYouMessage}
                            </CardDescription>
                            <CardFooter className="pt-5">
                                {formDetails.formConfig.includeCta && <Button className="w-full">Visit our website</Button> }
                            </CardFooter>
                        </CardHeader>
                    </>
                }
            </Card>
            <div className='flex gap-5 max-w-[450px] w-full mt-5'>
                {
                    page === 0 ? <>
                        <Button className="w-full flex gap-2" variant="outline" onClick={() => setPage(1)}><FaRegEdit size={20} />Thank you page</Button>
                        <Button className="w-full flex gap-2" variant="outline"><RiSettings4Line size={20} />Extra Settings</Button></> :
                        <Button className="w-2/5 flex gap-2" variant="outline" onClick={() => setPage(0)}><IoMdArrowBack size={20} />Go back</Button>
                }
            </div>
        </div>
    )
}

export default Preview