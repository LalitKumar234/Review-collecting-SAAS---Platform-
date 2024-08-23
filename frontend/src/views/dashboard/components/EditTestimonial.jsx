import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FaRegEdit } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import useFileUpload from '../../../services/uploadFileService';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { backendConfig } from '../../../config';

const EditTestimonial = ({ testimonialId, setReRender, reRender }) => {
    const [open, setOpen] = useState(false)
    const token = useSelector((state) => state.auth.token);
    const [isLoading, setIsLoading] = useState(true)
    const { uploadFile, uploadProgress } = useFileUpload()
    const [profileLink, setProfileLink] = useState()

    const [testimonialData, setTestimonialData] = useState({
        textTestimonialData: {
            testimonialText: "",
            profileImageUrl: ""
        },
        videoTestimonialLink: "",
        extraDetails: {
            name: "",
            email: "",
            role_company: "",
            website: "",
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendConfig.baseUrl}testimonial/${testimonialId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.testimonial, 'response')
                if (response.data.testimonial) {
                    const { extraDetails, textTestimonialData } = response.data.testimonial
                    const { testimonialText, profileImageUrl } = textTestimonialData
                    const { email, name, role_company } = extraDetails
                    setTestimonialData({
                        ...testimonialData,
                        extraDetails: {
                            ...testimonialData.extraDetails,
                            role_company: role_company || "",
                            name: name || "",
                            email: email || ""
                        },
                        textTestimonialData: {
                            ...testimonialData.textTestimonialData,
                            testimonialText: testimonialText || "",
                            profileImageUrl: profileImageUrl || ""
                        }
                    })
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [token]);

    const handleFileUpload = async (file) => {
        const imageLink = await uploadFile(file)
        console.log(imageLink)
        setProfileLink(imageLink)
        setTestimonialData({
            ...testimonialData,
            textTestimonialData: {
                ...testimonialData.textTestimonialData,
                profileImageUrl: imageLink
            }
        });
    }

    console.log(testimonialData, 'testimonialData')

    const handleUpdateTestimonial = async (testimonialId) => {
        try {
            const response = await axios.put(`${backendConfig.baseUrl}testimonial/${testimonialId}`, testimonialData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.testimonial, 'response')
            setOpen(false)
            setReRender(!reRender)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1 cursor-pointer">
                    <FaRegEdit size={18} />
                    <h2 className="text-sm font-medium leading-none peer-disabled:opacity-70">Edit</h2>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>Edit the testimonial</DialogTitle>
                    <DialogDescription>
                        Edit testimonial to fit to your website
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-2 w-full">
                    <Label htmlFor="title">Name</Label>
                    <Input
                        id="title"
                        type="text"
                        placeholder="Name"
                        value={testimonialData.extraDetails.name}
                        onChange={(e) => setTestimonialData({
                            ...testimonialData,
                            extraDetails: {
                                ...testimonialData.extraDetails,
                                name: e.target.value
                            }
                        })}
                    />
                </div>
                <div className="grid gap-2 w-full">
                    <Label htmlFor="title">Testimonial text</Label>
                    <Textarea
                        id="content"
                        type="text"
                        placeholder="A short description about your form..."
                        rows="4"
                        value={testimonialData.textTestimonialData.testimonialText}
                        onChange={(e) => setTestimonialData({
                            ...testimonialData,
                            textTestimonialData: {
                                ...testimonialData.textTestimonialData,
                                testimonialText: e.target.value
                            }
                        })}
                    />
                </div>
                <div className="grid gap-2 w-full">
                    <Label htmlFor="title">Role & company</Label>
                    <Input
                        id="title"
                        type="text"
                        placeholder=""
                        value={testimonialData.extraDetails.role_company}
                        onChange={(e) => setTestimonialData({
                            ...testimonialData,
                            extraDetails: {
                                ...testimonialData.extraDetails,
                                role_company: e.target.value
                            }
                        })}

                    />
                </div>
                <div className="grid gap-2 w-full">
                    <Label htmlFor="title">Email</Label>
                    <Input
                        id="title"
                        type="text"
                        placeholder=""
                        value={testimonialData.extraDetails.email}
                        onChange={(e) => setTestimonialData({
                            ...testimonialData,
                            extraDetails: {
                                ...testimonialData.extraDetails,
                                email: e.target.value
                            }
                        })}
                    />
                </div>
                <div className="grid gap-2 w-full">
                    <Label htmlFor="title">Update avatar</Label>
                    <div className='flex gap-4 items-center'>
                        <div className='bg-muted-foreground w-10 h-10 rounded-md object-contain overflow-hidden'>
                            {testimonialData.textTestimonialData.profileImageUrl !== "" ? <img src={testimonialData.textTestimonialData.profileImageUrl} alt="profile_pic" /> : null}
                        </div>
                        <div>{uploadProgress && "uploading..."}</div>

                        <Input
                            id="file"
                            type="file"
                            className="w-3/6"
                            onChange={(e) => handleFileUpload(e.target.files[0])}
                        />
                    </div>
                </div>
                <Button className="mt-5" onClick={() => handleUpdateTestimonial(testimonialId)}>Update testimonial</Button>
            </DialogContent>
        </Dialog>
    )
}

export default EditTestimonial