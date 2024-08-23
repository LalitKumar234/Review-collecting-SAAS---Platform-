import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formTemplates } from '../../../constants/formTemplates'
import { Button } from "@/components/ui/button"
import { BsSendArrowDownFill } from "react-icons/bs";


const Preview = () => {
    const params = useParams()
    const templateId = params.id.split('-')[0]
    const formId = params.id.split('-')[1]

    console.log(templateId)
    const [previewTemplate, setPreviewTemplate] = useState()
    console.log(params.id)

    useEffect(() => {
        const selectedTemplate = formTemplates.filter((data) => data.id === templateId)
        setPreviewTemplate(selectedTemplate[0].component(formId))
        console.log(selectedTemplate)
    }, [])

    

    return (
        <div className='w-full relative'>
            <div className='w-full shadow-md p-3 flex items-center justify-between fixed'>
                <h1 className='font-medium'>This is form preview publish it to make it live</h1>
                <Button className="gap-2"><BsSendArrowDownFill />Publish</Button>
            </div>
            <div className='h-screen flex items-center justify-center'>
                <div dangerouslySetInnerHTML={{ __html: previewTemplate }} />
            </div>
        </div>
    )
}

export default Preview