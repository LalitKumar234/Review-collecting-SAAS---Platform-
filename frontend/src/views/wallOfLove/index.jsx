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
import 'iframe-resizer/js/iframeResizer.contentWindow';
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

const WallOfLove = () => {
    const { id } = useParams()
    const location = useLocation();
    const [isPlaying, setIsPlaying] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const videoRef = useRef(null)

    const [open, setOpen] = useState(false)

    const paramValue = queryParams.get('paramName');

    const { data, loading, error } = useAxiosGet(`testimonial/wall-of-love/${id}`);

    console.log(data, 'wallOfLove')


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

    if(loading){
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div className='max-w-[1200px] my-[0px] mx-auto columns-4 column-gap'>
                {data?.wallOfLove.wallOfLove &&
                    data?.wallOfLove.wallOfLove.map((item) =>
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

export default WallOfLove