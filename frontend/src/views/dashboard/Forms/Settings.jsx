import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button"

const Settings = () => {
  const params = useParams()
  const [designForm, setDesignForm] = useState('')
  const [formTitle, setFormTitle] = useState('')
  const [selectedLayout, setSelectedLayout] = useState()

  const [showLayouts, setShowLayouts] = useState(false)

  const handleAdd = () => {
    setShowLayouts(!showLayouts)
  }

  const handleAddFields = (layout) => {
    setShowLayouts(false)
    if (layout === 1) {
      setDesignForm(`<div>+<div>`)
    }
    else if (layout === 2) {
      setDesignForm(`<div>+<div><div>+<div>`)
    }
    else {
      setDesignForm(`<div>+<div><div>+<div><div>+<div>`)
    }
  }




  return (
    <div>
      <h1 className='font-semibold'>Form id: <span className='font-normal'>{params.id}</span></h1>
      <Card className='max-w-[400px] w-full mt-4'>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Contact form</CardTitle>
          <div className='flex items-center justify-center relative'>
            <Button variant="secondary" className="w-10 h-10 rounded-full p-0" onClick={handleAdd}>
              <FiPlus size={18} />
            </Button>
            {
              showLayouts && <div className='absolute top-[50px] flex gap-2 rounded'>
                <div className='flex items-center justify-center p-2 bg-slate-400 rounded cursor-pointer' onClick={() => handleAddFields(1)}>
                  <div className='w-3 h-6 bg-slate-600'></div>
                </div>
                <div className='flex items-center justify-center gap-1 p-2 bg-slate-400 rounded cursor-pointer' onClick={() => handleAddFields(2)}>
                  <div className='w-3 h-6 bg-slate-600'></div>
                  <div className='w-3 h-6 bg-slate-600'></div>
                </div>
                <div className='flex items-center justify-center gap-1 p-2 bg-slate-400 rounded cursor-pointer' onClick={() => handleAddFields(3)}>
                  <div className='w-3 h-6 bg-slate-600'></div>
                  <div className='w-3 h-6 bg-slate-600'></div>
                  <div className='w-3 h-6 bg-slate-600'></div>
                </div>
              </div>
            }
          </div>
        </CardHeader>
        {/* <div dangerouslySetInnerHTML={{ __html: designForm }}/> */}
      </Card>
    </div>
  )
}

export default Settings