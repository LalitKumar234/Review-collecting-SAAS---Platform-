import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { FaLock } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { backendConfig } from '../../../config';

const BasicSettings = () => {
    const token = useSelector((state) => state.auth.token);
    const [isLoading, setIsLoading] = useState(true)
    const [checkedItems, setCheckedItems] = useState({
        removeBranding: false,
        darkTheme: false,
        hideDate: false,
        showAnimation: false,
        hideSourceIcons: false,
        randomize: false,
        maxNumber: 20,
        cardSize: 350
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendConfig.baseUrl}testimonial/config`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response.data.wallOfLoveConfigs, 'api')
                if (response.data.wallOfLoveConfigs) {
                    const { removeBranding, darkTheme, hideDate, showAnimation, hideSourceIcons, randomize, maxNumber, cardSize, } = response.data.wallOfLoveConfigs;
                    setCheckedItems({
                        removeBranding: removeBranding || false,
                        darkTheme: darkTheme || false,
                        hideDate: hideDate || false,
                        showAnimation: showAnimation || false,
                        randomize: randomize || false,
                        hideSourceIcons: hideSourceIcons || false,
                        maxNumber: maxNumber || 20,
                        cardSize: cardSize || 350
                    });
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [token]);

    console.log(checkedItems, 'checkedItems')

    useEffect(() => {
        const updateFormSettings = async () => {
            if (!isLoading) {
                try {
                    await axios.put(`${backendConfig.baseUrl}testimonial/config`, checkedItems, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        };
        updateFormSettings();
    }, [isLoading, checkedItems, token]);



    return (
        <>
            <div className="items-top flex items-center space-x-2 mt-5">
                <Checkbox
                    disabled
                    id="removeBranding"
                    checked={checkedItems.removeBranding}
                    onCheckedChange={() => setCheckedItems(prevState => ({ ...prevState, removeBranding: !prevState.removeBranding }))} />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="removeBranding"
                        className="cursor-pointer flex gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                    >
                        Remove Testimonia branding
                        <FaLock className=" text-yellow-500" />
                    </label>
                </div>
            </div>

            <div className="items-top flex items-center space-x-2 mt-5">
                <Checkbox
                    id="darkTheme"
                    checked={checkedItems.darkTheme}
                    onCheckedChange={() => setCheckedItems(prevState => ({ ...prevState, darkTheme: !prevState.darkTheme }))}
                />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="darkTheme"
                        className="cursor-pointer flex gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                    >
                        Dark theme
                    </label>
                </div>
            </div>

            <div className="items-top flex items-center space-x-2 mt-5">
                <Checkbox
                    id="hideDate"
                    checked={checkedItems.hideDate}
                    onCheckedChange={() => setCheckedItems(prevState => ({ ...prevState, hideDate: !prevState.hideDate }))}
                />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="hideDate"
                        className="cursor-pointer flex gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                    >
                        Hide the date
                    </label>
                </div>
            </div>
            <div className="items-top flex items-center space-x-2 mt-5">
                <Checkbox
                    id="hideSourceIcons"
                    checked={checkedItems.hideSourceIcons}
                    onCheckedChange={() => setCheckedItems({ ...checkedItems, hideSourceIcons: !checkedItems.hideSourceIcons })}
                />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="darkTheme"
                        className="cursor-pointer flex gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                    >
                        Hide source icons
                    </label>
                </div>
            </div>
            <div className="items-top flex items-center space-x-2 mt-5">
                <Checkbox
                    id="showAnimation"
                    checked={checkedItems.showAnimation}
                    onCheckedChange={() => setCheckedItems({ ...checkedItems, showAnimation: !checkedItems.showAnimation })}
                />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="darkTheme"
                        className="cursor-pointer flex gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                    >
                        Show heart animation
                    </label>
                </div>
            </div>
            <div className="items-top flex items-center space-x-2 mt-5">
                <Checkbox
                    id="darkTheme"
                    checked={checkedItems.randomize}
                    onCheckedChange={() => setCheckedItems({ ...checkedItems, randomize: !checkedItems.randomize })}
                />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="darkTheme"
                        className="cursor-pointer flex gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                    >
                        Randomize the order on page refresh
                    </label>
                </div>
            </div>
            <div className='mt-5 flex flex-col gap-2'>
                <Label htmlFor="number" className="cursor-pointer flex gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none">Max number of testimonials in the initial load (max 100)</Label>
                <Input
                    type="number"
                    id="number"
                    value={checkedItems.maxNumber}
                    onChange={(e) => setCheckedItems({ ...checkedItems, maxNumber: e.target.value })}
                />
            </div>
            <div className="grid gap-2 w-full mt-5">
                <Select onValueChange={(value) => { setCheckedItems({ ...checkedItems, cardSize: value }) }}>
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Card width ${checkedItems.cardSize} px(${checkedItems.cardSize === 250 ? "Small" : checkedItems.cardSize === 350 ? "Base" : "Large"})`} />                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="250">Card width 250 px(Small)</SelectItem>
                        <SelectItem value="350">Card width 350 px(Base)</SelectItem>
                        <SelectItem value="450">Card width 450 px(Large)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}

export default BasicSettings