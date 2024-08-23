import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { backendConfig } from '../config'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/reducers/authSlice'

const Navbar = () => {
    const userDetails = useSelector((state) => state.auth.userDetails);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        localStorage.clear()
        dispatch(logout());
        navigate('/login');
    }
    return (
        <div className='border-b w-full px-8 py-2 flex justify-end items-center bg-primary-foreground'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarFallback>{userDetails.email.slice(0, 1).toUpperCase()}</AvatarFallback>
                        <AvatarImage src="" />
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="flex flex-col">
                        <p className="font-normal">{userDetails.username}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuItem>{userDetails.email}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Navbar