import React, { useRef, useState } from "react";
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import { useAxiosGet } from '../../services/axiosService';
import { FaPlay, FaPause } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { FaStar } from "react-icons/fa6";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { FaRegCopy } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BasicSettings from "./components/BasicSettings";

const RenderTestimonial = () => {
    const params = useParams();
    const location = useLocation();
    const [isPlaying, setIsPlaying] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const videoRef = useRef(null);

    const [open, setOpen] = useState(false)

    const paramValue = queryParams.get('paramName');

    const { data, loading, error } = useAxiosGet("testimonial/all");


    const handlePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play()
                setIsPlaying(true)
            } else {
                videoRef.current.pause()
                setIsPlaying(false)
            }
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="mb-10 flex items-center gap-2"><MdOutlineDashboardCustomize size={20} />Customise wall of love</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[650px]">
                    <DialogHeader>
                        <DialogTitle>Embed wall of love</DialogTitle>
                        <DialogDescription>
                            Customise your wall of love
                        </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="basic" className="w-full">
                        <TabsList>
                            <TabsTrigger value="basic">Basic</TabsTrigger>
                            <TabsTrigger value="advanced">Advanced</TabsTrigger>
                        </TabsList>
                        <TabsContent value="basic">
                            <BasicSettings />
                        </TabsContent>
                        <TabsContent value="advanced">Change your password here.</TabsContent>
                    </Tabs>
                    <div className='flex w-full mt-5 gap-2'>
                        <Button variant="secondary" className="w-1/2">Close</Button>
                        <Button className="w-1/2 flex gap-2"><FaRegCopy size={18} />Copy embed code</Button>
                    </div>
                </DialogContent>
            </Dialog>
            <div className=' my-[0px] mx-auto columns-4 column-gap'>
                {data?.wallOfLove[0]?.wallOfLove.length > 0 &&
                    data?.wallOfLove[0].wallOfLove.map((item) =>
                        <div key={item._id} className='rounded-md overflow-hidden bg-white max-w-[20rem] border mb-[10px] break-inside-avoid'>
                            {item.videoTestimonialLink && item.videoTestimonialLink !== "" ? <div className="relative text-white">
                                <video
                                    className="cursor-pointer"
                                    src={item.videoTestimonialLink}
                                    ref={videoRef}
                                    onClick={handlePlayPause}
                                >

                                </video>
                                {!isPlaying ? <div className=" bg-blue-600 bg-opacity-60 w-12 h-12 rounded-full flex items-center justify-center absolute bottom-8 right-8 cursor-pointer">
                                    <FaPlay onClick={handlePlayPause} size={20} />
                                </div> : <></>}
                            </div> : <div className="p-6">
                                <p>{item.textTestimonialData.testimonialText}</p>
                                <div className="mt-3 flex text-yellow-400">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                                <div className='flex items-center gap-2 mt-3'>
                                    <img src={item.textTestimonialData.profileImageUrl} className="w-12 h-12 object-contain rounded-full" alt="" />
                                    <div>
                                        <h2 className=" font-medium">{item.extraDetails.name}</h2>
                                        <p className="text-sm text-slate-600">{item.extraDetails.role_company}</p>
                                    </div>
                                </div>
                            </div>}
                        </div>)}
            </div>
        </>
    )
}

export default RenderTestimonial