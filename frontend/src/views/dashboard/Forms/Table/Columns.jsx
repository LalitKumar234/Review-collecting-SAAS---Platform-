import React from 'react'
// import { ColumnDef } from "@tanstack/react-table"
import { PiDotOutlineFill } from "react-icons/pi";
import { PiDotsThreeOutlineVerticalThin } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
export const columns = [
    {
        accessorKey: "formId",
        header: "Form Id",
        cell: ({ row }) => {
            const id = row.original.formId
            return (
                <div className='text-left font-semibold'>{id}</div>
            )
        }
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => {
            const isPublished = row.original?.isPublished
            // console.log(isPublished)
            return (
                <div className='text-center'>
                    {isPublished ?
                        <span className='text-xs px-3 py-1 rounded-full font-semibold text-green-500 bg-green-100'>
                            Live</span> : <span className="text-yellow-500 bg-yellow-100 text-xs px-3 py-1 rounded-full font-semibold">Draft</span>}
                </div>
            )
        }
    },
    {
        accessorKey: "submissions",
        header: () => <div className="text-center">Submissions</div>,
        cell: ({ row }) => {
            const submissions = row.original.submissions?.length
            // console.log(submissions)
            return (
                <p className='text-center'>{submissions}</p>
            )
        }

    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const formId = row.original?.formId
            return (
                <Link to={`/builder/${formId}`}>
                    <div className='flex items-center justify-start gap-2'><FaRegEdit size={18} />Edit</div>
                </Link>
            )
        }
    },
]