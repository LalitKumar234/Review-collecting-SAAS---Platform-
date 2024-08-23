import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { FiPlus } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useAxiosGet } from '../../../services/axiosService';
import { DataTable } from '../../../components/DataTable';
import { columns } from './Table/Columns';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"


const Forms = () => {
    const navigate = useNavigate();
    const { toast } = useToast()
    const { data, loading, error } = useAxiosGet('form');


    useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                title: "Some error",
                description: error,
            })
        }
    }, [error])

    return (
        <>
            <Toaster />
            <div>
                <Button className="gap-3" onClick={() => navigate('/forms/create')}>
                    <FiPlus size={20} />
                    Create a Form
                </Button>
                <h1 className='mt-8 font-semibold mb-4'>Your recent forms</h1>
                {
                    loading ? 'Loading...' : <DataTable columns={columns} data={data?.allForms?.forms} />
                }
            </div>
        </>
    )
}

export default Forms