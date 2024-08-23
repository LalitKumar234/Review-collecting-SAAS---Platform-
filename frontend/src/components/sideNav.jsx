import React, { useState } from 'react'
import { sideNavItems } from '../constants/sideNavItems'
import { Link, NavLink, Navigate } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/ui/button"
import { SiGoogleforms } from "react-icons/si";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


const SideNav = ({ isOpen, setisOpen }) => {
    return (
        <section className="flex gap-6 h-full fixed z-50 border-r"
        >
            <div
                className={`bg-secondary-foreground min-h-screen ${isOpen ? "sideNav" : "collapse-sideNav"
                    } duration-500 text-gray-100 px-4`}
            >
                <div className="py-3 flex justify-end">
                    <IoIosArrowForward
                        size={26}
                        className="cursor-pointer"
                        onClick={() => setisOpen(!isOpen)}
                    />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    {sideNavItems?.map((menu, i) => (
                        <NavLink
                            to={menu?.redirect}
                            key={i}
                            className={({ isActive }) =>
                                `${isActive ? 'bg-slate-600 ' : ''}` +
                                `${menu?.margin && "mt-5"
                                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`
                            }
                        >
                            <div className='hover:'>{menu?.icon}</div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${!isOpen && "opacity-0 translate-x-28 overflow-hidden"
                                    }`}
                            >
                                {menu?.name}
                            </h2>
                        </NavLink>
                    ))}
                </div>
            </div>
        </section>

    )
}

export default SideNav