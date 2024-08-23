import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { IoArrowBackSharp } from "react-icons/io5";
import useFileUpload from "../../../services/uploadFileService"
import { useState } from "react"

const TextTestimonialForm = ({ setPage, setTestimonialData, testimonialData }) => {

    const { uploadFile, uploadProgress } = useFileUpload()
    const [profilePic, setProfileLink] = useState("")

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

    const handleTestimonialText = (text) => {
        setTestimonialData({
            ...testimonialData,
            textTestimonialData: {
                ...testimonialData.textTestimonialData,
                testimonialText: text
            }
        });
    }
    return (
        <>
            <Button variant="ghost" className="hover:bg-transparent" onClick={() => setPage(0)}><IoArrowBackSharp />Back</Button>
            <CardHeader className="space-y-1 p-2">
                <CardTitle className="text-2xl text-center">
                    Share your testimonial
                </CardTitle>
                <CardDescription className="text-center pt-2">
                    What do you like most about us? Why would you recommend us to others?
                </CardDescription>
                <CardContent className="pt-5 flex gap-3 flex-col">
                    <div className="grid gap-2">
                        <Textarea
                            id="content"
                            type="text"
                            placeholder="A short description about your form..."
                            rows="4"
                            onChange={(e) => handleTestimonialText(e.target.value)}
                        />
                    </div>
                    <Label htmlFor="name" className="pt-5">Photo (optional)</Label>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-4 items-center'>
                            <div className='bg-muted-foreground w-10 h-10 rounded-md object-contain overflow-hidden'>
                                {profilePic !== "" && <img src={profilePic} alt="profile_pic" />}
                            </div>
                            <div>{uploadProgress && "uploading..."}</div>
                            <Input
                                id="file"
                                type="file"
                                className="w-1/2"
                                onChange={(e) => handleFileUpload(e.target.files[0])}
                            />
                        </div>
                        <Button onClick={() => setPage(3)}>Continue</Button>
                    </div>
                </CardContent>
            </CardHeader>
        </>
    )
}

export default TextTestimonialForm