import React, { useEffect, useState } from 'react'
import { HiMiniVideoCamera } from "react-icons/hi2";
import { HiOutlinePencil } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { RiSettings4Line } from "react-icons/ri";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { backendConfig } from '../../config';
import { useSelector } from 'react-redux';
import { ReactMediaRecorder, useReactMediaRecorder, useMediaRecorder } from 'react-media-recorder';
import VideoRecorder from './components/VideoRecorder';
import { IoArrowBackSharp } from "react-icons/io5";
import TextTestimonialForm from './components/TextTestimonialForm';
import ExtraDetails from './components/ExtraDetails';

const LiveSubmitFormPage = () => {

    const token = useSelector((state) => state.auth.token);
    const [page, setPage] = useState(0);
    const [formDetails, setFormDetails] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const [testimonialData, setTestimonialData] = useState({
        formId: id,
        textTestimonialData: {
            testimonialText: "",
            profileImageUrl: ""
        },
        videoTestimonialLink:"",
        extraDetails: {
            name: "",
            email: "",
            role_company: "",
            website: "",
            grantPermission: false
        }
    })

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendConfig.baseUrl}form/get-form/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.form) {
                    setFormDetails(response.data.form)
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, token]);

    console.log(testimonialData, 'testimonialData')

    const submitTestimonial = async () => {
        const url = `http://localhost:5500/submit/${id}`

        try {
            const response = await axios.post(url, testimonialData)
            console.log(response)
        } catch (err) {
            console.log(err)
        } finally {
            setPage(4)
        }
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <Card className='max-w-[500px] w-full py-2 shadow-lg relative'>
                {
                    page === 0 && <>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">
                                {formDetails?.title}
                            </CardTitle>
                            <CardDescription className="text-center pt-2">
                                {formDetails?.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 ">
                            <CardDescription className="uppercase font-bold text-md">
                                Questions
                            </CardDescription>
                            {
                                formDetails?.formConfig?.questions.length && <ul className='text-muted-foreground text-sm px-5'>
                                    {
                                        formDetails?.formConfig.questions.map((question, index) => (
                                            <li className='list-disc' key={index}>{question}</li>
                                        ))
                                    }
                                </ul>
                            }

                        </CardContent>
                        <CardFooter className="flex flex-col gap-3 pt-7">
                            {formDetails?.formConfig?.enableVideo && <Button className="w-full flex gap-2" onClick={() => setPage(1)}><HiMiniVideoCamera size={20} />Record a video</Button>}
                            <Button className="w-full flex gap-2 bg-slate-900 hover:bg-slate-700" onClick={() => setPage(2)}><HiOutlinePencil size={20} />Send in text</Button>
                        </CardFooter>
                    </>
                }
                {
                    page === 1 && <>
                        <Button variant="ghost" className="hover:bg-transparent" onClick={() => setPage(0)}><IoArrowBackSharp />Back</Button>
                        <CardContent>
                            <VideoRecorder setPage={setPage} setTestimonialData={setTestimonialData} testimonialData={testimonialData}/>
                        </CardContent>
                    </>
                }
                {page === 2 && <TextTestimonialForm setPage={setPage} setTestimonialData={setTestimonialData} testimonialData={testimonialData} />}
                {page === 3 && <ExtraDetails setPage={setPage} submitTestimonial={submitTestimonial} setTestimonialData={setTestimonialData} testimonialData={testimonialData} />}
                {
                    page === 4 && <>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">
                                {formDetails?.formConfig.thankYouTitle}
                            </CardTitle>
                            <CardDescription className="text-center pt-2">
                                {formDetails?.formConfig.thankYouMessage}
                            </CardDescription>
                            <CardFooter className="pt-5">
                                {formDetails?.formConfig.includeCta && <Button className="w-full">Visit our website</Button>}
                            </CardFooter>
                        </CardHeader>
                    </>
                }
            </Card>
        </div>
    )
}

export default LiveSubmitFormPage