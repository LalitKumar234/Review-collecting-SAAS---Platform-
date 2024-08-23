import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

const Create = () => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [formDetails, setFormDetails] = useState({
        name: '',
        description: ''
    })

    // const handleCreateForm = async () => {
    //     if (!formDetails.name && !formDetails.description) {
    //         toast({
    //             variant: "destructive",
    //             title: "Uh oh!",
    //             description: "Fields can't be empty",
    //         })
    //     }
    //     axiosPost('form', formDetails)
    //         .then((res) => {
    //             console.log(res)
    //             if(res.status === 200){
    //                 toast({
    //                     // variant: "success",
    //                     title: "Hurray!",
    //                     description: "Your form is created",
    //                 })
    //                 navigate(`/forms/choose-templates/${res.data.newForm.formId}`)
    //             }
    //         }
    //         ).catch((err) => console.log(err))

    // }
    console.log(formDetails)

    return (
        <>
            <Toaster />
            <div className='w-3/5'>
                <h1 className='font-semibold text-lg'>Create form</h1>
                <div className="grid gap-2 mt-5">
                    <Label htmlFor="title">Name<span className='text-red-400'>*</span></Label>
                    <Input
                        id="title"
                        type="text"
                        placeholder="ex: Facebook campaign, Contact form"
                        onChange={(e) => setFormDetails({ ...formDetails, name: e.target.value })}
                    />
                </div>
                <div className="grid gap-2 mt-8">
                    <Label htmlFor="content">Description<span className='text-red-400'>*</span></Label>
                    <Textarea
                        id="content"
                        type="text"
                        placeholder="A short description about your form..."
                        rows="4"
                        onChange={(e) => setFormDetails({ ...formDetails, description: e.target.value })}
                    />
                </div>
                <Button className="w-full mt-5" onClick={handleCreateForm}>Create</Button>
            </div>
        </>
    )
}

export default Create