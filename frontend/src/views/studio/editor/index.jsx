import React, { useState } from 'react'
import { LuMousePointerClick } from "react-icons/lu";
import { CgWebsite } from "react-icons/cg";
import { PiPaintBrushBroadBold } from "react-icons/pi";
import { Card } from "@/components/ui/card"
import Testimonial1 from '../testimonials/Testimonial1';
import Testimonial2 from '../testimonials/Testimonial2';
import { Button } from "@/components/ui/button"
import DesignTab from '../components/DesignTab';
import { testimonials, widgets } from '../constants';

const Editor = () => {
    const [tab, setTab] = useState("templates")
    return (
        <div className='w-full h-screen builder'>
            <div className='fixed bg-primary w-full top-0 z-10 py-8'>
            </div>
            {/* <div className=' bg-secondary-foreground w-[5.5rem] h-screen fixed left-0 top-0'>
                <ul className='mt-20 flex flex-col gap-6'>
                    <li className='text-white text-xs flex flex-col justify-center items-center gap-2 cursor-pointer'>
                        <LuMousePointerClick size={22} />
                        <p className='text-center'>Testimonials</p>
                    </li>
                    <li className='text-white text-xs flex flex-col justify-center items-center gap-2 cursor-pointer'>
                        <CgWebsite size={20} />
                        <p className='text-center'>Widgets</p>
                    </li>
                    <li className='text-white text-xs flex flex-col justify-center items-center gap-2 cursor-pointer'>
                        <PiPaintBrushBroadBold size={20} />
                        <p className='text-center'>Design</p>
                    </li>
                </ul>
            </div> */}
            <div className='w-[22rem] bg-secondary-foreground h-[calc(100vh-4rem)] top-[4rem] fixed left-0 overflow-y-scroll border-r'>
                <div className='flex justify-between items-center'>
                    <li className={`text-xs flex justify-center items-center gap-2 cursor-pointer w-1/2 py-4 ${tab === "templates" ? "border-b-2 border-green-400 text-green-400" : "text-white border-b-transparent"}`} onClick={() => setTab("templates")}>
                        <CgWebsite size={20} />
                        <p className='text-center'>Templates</p>
                    </li>
                    <li className={` text-xs flex justify-center items-center gap-2 cursor-pointer w-1/2 py-4 ${tab === "design" ? "border-b-2 border-green-400 text-green-400" : "text-white border-b-transparent"}`} onClick={() => setTab("design")}>
                        <PiPaintBrushBroadBold size={20} />
                        <p className='text-center'>Design</p>
                    </li>
                </div>
                {
                    tab === "templates" && <div className="grid grid-cols-2 gap-3 p-3 pt-10">
                        {widgets.map((card) => (
                            <Card key={card.id} className="bg-muted bg-opacity-40 p-2 rounded-md">
                                <img src={card.image} alt="" />
                            </Card>
                        ))}
                    </div>
                }
                <div className='px-4 mt-5'>
                    {
                        tab === "design" && <DesignTab />
                    }
                </div>
            </div>
            <div className='w-[calc(100% - 22rem)] ml-[22rem] mt-[7rem] px-5'>
                {/* <Testimonial1 testimonials={testimonials}/> */}
                <Testimonial2 testimonials={testimonials} />
            </div>
        </div>
    )
}

export default Editor