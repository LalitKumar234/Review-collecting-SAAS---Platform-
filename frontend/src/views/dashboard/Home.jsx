import React, { useEffect, useState } from 'react'
import { useAxiosGet, useAxiosPost } from '../../services/axiosService';
import { Input } from "@/components/ui/input"
import { IoIosSearch } from "react-icons/io";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import EditTestimonial from './components/EditTestimonial';
import AddTags from './components/AddTags';
import Delete from './components/Delete';
import { RiHeartAddLine } from "react-icons/ri";
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { backendConfig } from '../../config';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { FaStar } from "react-icons/fa6";
import NoDataFound from '../../assets/illustrations/NoDataFound';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const token = useSelector((state) => state.auth.token);
    const userDetails = useSelector((state) => state.auth.userDetails);
    const { data, loading, error, setReRender, reRender } = useAxiosGet(`form/submissions/${userDetails.formId}`);
    const [formId, setFormId] = useState('');
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleAddToWallOfLove = async (id) => {
        try {
            const res = await axios.post(`${backendConfig.baseUrl}testimonial/${id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            setReRender(!reRender)
            toast({
                description: "Successfully updated"
            })
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return (<p>Loading...</p>)
    }
    if (error) {
        return (<p>Something went wrong...</p>)
    }
    return (
        <>
            <Toaster />
            <div className='flex justify-between items-center'>
                <div className='flex items-center justify-center w-1/2'>
                    <IoIosSearch size={20} /><Input
                        id="title"
                        type="text"
                        className="border-0 shadow-none focus:outline-none"
                        placeholder="Search by name, email, or testimonial keywords"
                    />
                </div>
            </div>
            {data?.submissions.length > 0 ?
                <div className='grid grid-cols-1 gap-4 mt-10 w-3/4'>
                    {data.submissions.map((data) => (
                        <div key={data._id} className="rounded-none border-b">
                            <div className="flex items-start">
                                <div className='grid grid-cols-2'>
                                    {data.textTestimonialData && <>
                                        <div className="flex gap-4">
                                            <img src={data.textTestimonialData.profileImageUrl} className='w-[7rem] h-[7rem] rounded-md object-cover' alt="" />
                                            <div>
                                                {/* <h3 className='text-sm font-medium text-slate-400'>Name</h3> */}
                                                <p className='text-sm font-semibold text-slate-600'>{data.extraDetails?.name}</p>
                                                {/* <h3 className='text-sm font-medium text-slate-400'>Email</h3> */}
                                                <p className='text-xs text-slate-400 '>{data.extraDetails?.email}</p>
                                                {/* <h3 className='text-sm font-medium text-slate-400'>Role & company</h3> */}
                                                <p className='text-xs text-slate-400 '>{data.extraDetails?.role_company}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='flex items-center mt-3 gap-2'>
                                                <div className=" flex text-yellow-400 items-center">
                                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                                </div>
                                                <p className='text-xs text-slate-600'>24-01-2024</p>
                                            </div>
                                            <p className='text-sm text-slate-500 mt-2'>{data.textTestimonialData.testimonialText}</p>
                                        </div>

                                    </>
                                    }
                                </div>
                                {/* <span className='text-sm text-green-500 bg-green-100 px-3 font-medium py-1 rounded-full'>{data.textTestimonialData?.testimonialText ? "Text" : "Video"}</span> */}
                            </div>
                            <div className="py-6 flex justify-between text-slate-600">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button
                                                onClick={() => handleAddToWallOfLove(data._id)}
                                                variant="ghost"
                                                className={`gap-1 cursor-pointer ${data?.addedToWall ? 'text-red-500 hover:text-red-600 bg-red-100 hover:bg-red-200' : ''} `}>
                                                <RiHeartAddLine size={22} />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {data?.addedToWall ? <p>Remove from wall of love</p> : <p>Add to wall of love</p>}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <div className="flex justify-end text-slate-600 gap-4">
                                    <EditTestimonial testimonialId={data._id} setReRender={setReRender} reRender={reRender} />
                                    <AddTags />
                                    <Delete />
                                </div>
                            </div>
                        </div>
                    ))}
                </div> :
                <div className='flex flex-col gap-8 justify-center items-center' style={{height: "calc(100vh - 20rem)"}}>
                    <NoDataFound className="w-[10rem] h-auto"/>
                    <h2>You don't have any reviews yet. Start with creating a form</h2>
                    <Button onClick={()=>navigate("/form")}>Create form</Button>
                </div>
            }
        </>
    )
}

export default Home