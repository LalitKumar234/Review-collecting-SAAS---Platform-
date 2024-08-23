import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'
import { FaStar } from "react-icons/fa6";

const templates = [
    {
        id: 1,
        templateImage: "https://bashooka.com/wp-content/uploads/2018/12/testimonial-ui-designs-31.jpg"
    },
    {
        id: 2,
        templateImage: "https://bashooka.com/wp-content/uploads/2018/12/testimonial-ui-designs-27.jpg"
    },
    {
        id: 3,
        templateImage: "https://bashooka.com/wp-content/uploads/2018/12/testimonial-ui-designs-27.jpg"
    }, {
        id: 4,
        templateImage: "https://bashooka.com/wp-content/uploads/2018/12/testimonial-ui-designs-27.jpg"
    }, {
        id: 5,
        templateImage: "https://bashooka.com/wp-content/uploads/2018/12/testimonial-ui-designs-27.jpg"
    }, {
        id: 6,
        templateImage: "https://bashooka.com/wp-content/uploads/2018/12/testimonial-ui-designs-27.jpg"
    }, {
        id: 7,
        templateImage: "https://bashooka.com/wp-content/uploads/2018/12/testimonial-ui-designs-27.jpg"
    }, {
        id: 8,
        templateImage: "https://bashooka.com/wp-content/uploads/2018/12/testimonial-ui-designs-27.jpg"
    }, {
        id: 9,
        templateImage: "https://bashooka.com/wp-content/uploads/2018/12/testimonial-ui-designs-27.jpg"
    }, {
        id: 10,
        templateImage: "https://bashooka.com/wp-content/uploads/2018/12/testimonial-ui-designs-27.jpg"
    }, {
        id: 11,
        templateImage: "https://bashooka.com/wp-content/uploads/2018/12/testimonial-ui-designs-27.jpg"
    },

]

const Studio = () => {

    const [selectedTemplate, setSelectedTemplate] = useState(null)

    return (
        <>
            <div className='grid grid-cols-[250px_minmax(400px,_1fr)_300px] gap-5'>
                <Card className='h-[700px] rounded-md flex flex-col gap-5 p-5 overflow-auto'>
                    {
                        templates.map((temp) => (
                            <img
                                className="rounded-md cursor-pointer"
                                key={temp.id}
                                src={temp.templateImage}
                                alt={`template-${temp.id}`}
                                onClick={() => setSelectedTemplate(temp.id)}
                            />
                        ))
                    }
                </Card>
                <Card className=' rounded-md bg-gray-100 flex justify-center items-center builder p-5'>
                    {
                        selectedTemplate === 1 && (
                            <div className='max-w-[600px] w-full h-[350px] bg-white rounded-md shadow-lg flex flex-col items-center justify-center p-10 gap-1'>
                                <img className="w-[5rem] h-[5rem] object-cover object-position: center top rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                <h3 className=' uppercase font-bold text-slate-500 mt-4'>James</h3>
                                <p className='text-xs text-slate-500'>CEO at Paradyes</p>
                                <p className='text-center text-sm text-slate-700'>Senja has been an absolute game changer for how I collect and show user testimonials on our website, couldn't recommend it enough.</p>
                                <div className=" flex text-yellow-400 items-center mt-5">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                            </div>
                        )
                    }
                </Card>
                <Card className=' rounded-md'>
                </Card>
            </div>

        </>
    )
}

export default Studio