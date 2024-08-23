import React from 'react'
import { formTemplates } from '../../../constants/formTemplates'
import {
    Card,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from 'react-router-dom'

const ChooseTemplates = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    return (
        <div>
            <h1 className='font-semibold'>Choose Templates</h1>
            <div className='flex flex-wrap gap-5 mt-5'>
                {
                    formTemplates.map((data) => (
                        <Card key={data.id} className="p-2 cursor-pointer w-[20rem] text-center">
                            <CardContent className="pb-1">{data.name}</CardContent>
                            <CardDescription className="mb-2">{data.description}</CardDescription>
                            <Button className="w-full" onClick={() => navigate(`/preview/${data.id}-${id}`)}>Preview</Button>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default ChooseTemplates