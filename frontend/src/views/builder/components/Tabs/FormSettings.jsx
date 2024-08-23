import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MdDragIndicator } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox"

const FormSettings = ({ setFormDetails, formDetails, handleQuestions, handleEditQuestion, handleDeleteQuestion }) => {
    return (
        <>
            <div className="grid gap-2 w-full">
                <Label htmlFor="name">Form name<span className='text-red-500'>*</span></Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Your form name"
                    value={formDetails.name}
                    onChange={(e) => setFormDetails({ ...formDetails, name: e.target.value })}
                />
            </div>
            <div className="grid gap-2 w-full">
                <Label htmlFor="title">Form title<span className='text-red-500'>*</span></Label>
                <Input
                    id="title"
                    type="text"
                    placeholder="Would you like to give a shoutout?"
                    value={formDetails.title}
                    onChange={(e) => setFormDetails({ ...formDetails, title: e.target.value })}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="content">Description<span className='text-red-400'>*</span></Label>
                <Textarea
                    id="content"
                    type="text"
                    placeholder="A short description about your form..."
                    rows="4"
                    value={formDetails.description}
                    onChange={(e) => setFormDetails({ ...formDetails, description: e.target.value })}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="content">Questions<span className='text-red-400'>*</span></Label>
                {
                    formDetails.formConfig.questions.length > 0 && formDetails.formConfig.questions.map((question, index) =>
                        <div className='flex items-center justify-center mt-3' key={index}>
                            <MdDragIndicator size={24} className='cursor-grab text-foreground hover:text-muted-foreground' />
                            <Input
                                id="title"
                                type="text"
                                value={question}
                                onChange={handleEditQuestion(index)}
                                name={"question"}
                                placeholder="Write a question"
                            />
                            <MdOutlineDelete size={25} className='text-muted-foreground ml-3 cursor-pointer' onClick={() => handleDeleteQuestion(index)} />
                        </div>)
                }
                {
                    formDetails.formConfig.questions.length < 5 ? <div className='flex items-center gap-1 mt-2 cursor-pointer text-foreground' onClick={handleQuestions}>
                        <IoAddCircleOutline size={20} />
                        <span className='text-sm'>Add upto 5 questions</span>
                    </div> : null
                }
            </div>
            <div className="items-top flex space-x-2 mt-5">
                <Checkbox id="video"
                    checked={formDetails.formConfig.enableVideo}
                    onCheckedChange={() =>
                        setFormDetails({
                            ...formDetails,
                            formConfig: {
                                ...formDetails.formConfig,
                                enableVideo: !formDetails.formConfig.enableVideo,
                            },
                        })
                    }
                />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="video"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Enable video responses
                    </label>
                </div>
            </div>
        </>
    )
}

export default FormSettings