import React from 'react'
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { AiOutlineBgColors } from "react-icons/ai";
import { GoSortAsc } from "react-icons/go";
import { MdTextFields } from "react-icons/md";
import { FiLayout } from "react-icons/fi";
import { TbSettingsCode } from "react-icons/tb";

const DesignTab = () => {
    return (
        <Accordion type="single" collapsible className="text-white">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className='flex items-center gap-3 py-2'>
                        <GoSortAsc size={22} />
                        Sort
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className='grid gap-3'>
                        <Label htmlFor="username">Sort testimonials</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">By date</SelectItem>
                                <SelectItem value="rating">By rating</SelectItem>
                                <SelectItem value="randomly">Randomly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" >
                <AccordionTrigger>
                    <div className='flex items-center gap-3 py-2'>
                        <AiOutlineBgColors size={22} />
                        Colors
                    </div>

                </AccordionTrigger>
                <AccordionContent>
                    <div className='grid gap-3'>
                        <Label htmlFor="username">Sort testimonials</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">By date</SelectItem>
                                <SelectItem value="rating">By rating</SelectItem>
                                <SelectItem value="randomly">Randomly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" >
                <AccordionTrigger>
                    <div className='flex items-center gap-3 py-2'>
                        <MdTextFields size={22} />
                        Typography
                    </div>

                </AccordionTrigger>
                <AccordionContent>
                    <div className='grid gap-3 '>
                        <Label htmlFor="username">Sort testimonials</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">By date</SelectItem>
                                <SelectItem value="rating">By rating</SelectItem>
                                <SelectItem value="randomly">Randomly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" >
                <AccordionTrigger>
                    <div className='flex items-center gap-3 py-2'>
                        <FiLayout size={20} />
                        Layout
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className='grid gap-3'>
                        <Label htmlFor="username">Sort testimonials</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">By date</SelectItem>
                                <SelectItem value="rating">By rating</SelectItem>
                                <SelectItem value="randomly">Randomly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" >
                <AccordionTrigger>
                    <div className='flex items-center gap-3 py-2'>
                        <TbSettingsCode size={22} />
                        Advanced
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className='grid gap-3'>
                        <Label htmlFor="username">Sort testimonials</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">By date</SelectItem>
                                <SelectItem value="rating">By rating</SelectItem>
                                <SelectItem value="randomly">Randomly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

    )
}

export default DesignTab