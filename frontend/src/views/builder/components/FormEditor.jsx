import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RiSettings4Line } from "react-icons/ri";
import { MdSaveAlt } from "react-icons/md";
import { MdDone } from "react-icons/md";
import FormSettings from './Tabs/FormSettings';
import ThankYou from './Tabs/ThankYou'
import SubmitPage from './Tabs/SubmitPage'
import { Button } from "@/components/ui/button"

const FormEditor = ({ setPage, formDetails, setFormDetails, handleQuestions, handleEditQuestion, handleDeleteQuestion }) => {
    return (
        <div className='flex items-center border-r flex-col bg-white pt-[2rem]'>
            <div className='w-[500px] px-6 overflow-y-auto'>
                <Tabs defaultValue="settings" className="">
                    <TabsList className="w-full mb-5">
                        <TabsTrigger value="settings" className="w-full " onClick={() => setPage(0)}>
                            <RiSettings4Line size={20} className="mr-2" />Form settings</TabsTrigger>
                        <TabsTrigger value="submitpage" className="w-full" onClick={() => setPage(1)}>
                            <MdSaveAlt size={20} className="mr-2" />Submit page
                        </TabsTrigger>
                        <TabsTrigger value="thankyou" className="w-full" onClick={() => setPage(2)}>
                            <MdDone size={20} className="mr-2" />Thankyou page
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="settings" className="flex flex-col gap-5 justify-center px-1">
                        <FormSettings
                            formDetails={formDetails}
                            setFormDetails={setFormDetails}
                            handleQuestions={handleQuestions}
                            handleEditQuestion={handleEditQuestion}
                            handleDeleteQuestion={handleDeleteQuestion} />
                    </TabsContent>
                    <TabsContent value="submitpage" className="flex flex-col gap-5 justify-center px-1">
                        <SubmitPage />
                    </TabsContent>
                    <TabsContent value="thankyou" className="flex flex-col gap-5 justify-center px-1">
                        <ThankYou setFormDetails={setFormDetails} formDetails={formDetails} />
                    </TabsContent>

                </Tabs>
                {/* <Button className="fixed bottom-5 w-full">Preview Link</Button> */}
            </div>
        </div>
    )
}

export default FormEditor