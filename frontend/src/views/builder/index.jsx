import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { BsSendArrowDownFill } from "react-icons/bs";
import Preview from './components/Preview'
import FormEditor from './components/FormEditor'
import { LuExternalLink } from "react-icons/lu";
import axios from "axios"
import { backendConfig } from '../../config';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxiosGet, useAxiosPost, useAxiosPut } from '../../services/axiosService';
import { useSelector } from 'react-redux'
import { MdArrowBack } from "react-icons/md";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { IoEyeOutline } from "react-icons/io5";

const Builder = () => {
    const token = useSelector((state) => state.auth.token);
    const userDetails = useSelector((state) => state.auth.userDetails);
    const axiosPrivate = useAxiosPrivate();
    const [page, setPage] = useState(0);
    const id = userDetails.formId;
    const navigate = useNavigate()
    const [formDetails, setFormDetails] = useState({
        name: "Form 1",
        title: "Would you like to write a review for us?",
        description: "Write a review for us and get offers on next order",
        isPublished: false,
        formConfig: {
            questions: [
                "What is the best thing about [our product / service]",
                "How has [our product / service] helped you?",
                "Who are you / what are you working on?"
            ],
            enableVideo: false,
            thankYouTitle: "Thankyou",
            thankYouMessage: "Thank you so much for your shoutout! It means a ton for us! ",
            includeCta: true
        }
    });

    const [isLoading, setIsLoading] = useState(true);
    const handleEditQuestion = (index) => (event) => {
        const { value } = event.target;

        setFormDetails((prevFormDetails) => {
            const updatedQuestions = [...prevFormDetails.formConfig.questions];
            updatedQuestions[index] = value;

            return {
                ...prevFormDetails,
                formConfig: {
                    ...prevFormDetails.formConfig,
                    questions: updatedQuestions,
                },
            };
        });
    };

    const handleQuestions = () => {
        const newQuestion = "";

        setFormDetails((prevFormDetails) => ({
            ...prevFormDetails,
            formConfig: {
                ...prevFormDetails.formConfig,
                questions: [...prevFormDetails.formConfig.questions, newQuestion],
            },
        }));
    };
    
    const handleDeleteQuestion = (index) => {
        setFormDetails((prevFormDetails) => {
            const updatedQuestions = [...prevFormDetails.formConfig.questions];
            updatedQuestions.splice(index, 1);

            return {
                ...prevFormDetails,
                formConfig: {
                    ...prevFormDetails.formConfig,
                    questions: updatedQuestions,
                },
            };
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get(`${backendConfig.baseUrl}form/get-form/${id}`)
                console.log(response, "form")
                if (response.data.form) {
                    const { name, title, description, isPublished, formConfig } = response.data.form;
                    setFormDetails({
                        name: name || "",
                        title: title || "",
                        description: description || "",
                        isPublished: isPublished || false,
                        formConfig: {
                            ...formDetails.formConfig,
                            ...formConfig,
                        },
                    });
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, token]);

    useEffect(() => {
        const updateFormSettings = async () => {
            if (!isLoading) {
                try {
                    await axiosPrivate.put(`${backendConfig.baseUrl}form/update-form-settings/${id}`, formDetails);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        updateFormSettings();
    }, [isLoading, formDetails, id, token]);

    const handleCreateForm = async () => {
        axiosPrivate.post(`${backendConfig.baseUrl}form/create`, formDetails)
            .then((res) => {
                console.log(res, "form created")

            }
            ).catch((err) => console.log(err))
    }

    return (
        <div className='builder relative'>
            <div className='bg-white flex items-center justify-between z-10'>
                <div className='flex gap-2 items-center justify-end bg-primary-foreground border-b w-full py-2 px-4'>
                    {isLoading ? <p className='text-muted-foreground'>Saving...</p> : <p className='text-muted-foreground'></p>}
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate(`/submit/${id}`)}>
                        <LuExternalLink />
                        Share link
                    </Button>
                    <Button className="gap-2" size="sm" onClick={() => navigate(`/submit/${id}`)}>
                        <IoEyeOutline /> Preview
                    </Button>
                </div>
            </div>
            <div className='h-screen flex'>
                <FormEditor
                    setPage={setPage}
                    setFormDetails={setFormDetails}
                    formDetails={formDetails}
                    handleQuestions={handleQuestions}
                    handleEditQuestion={handleEditQuestion}
                    handleDeleteQuestion={handleDeleteQuestion}
                />
                <Preview page={page} setPage={setPage} formDetails={formDetails} />
            </div>
        </div>
    )
}

export default Builder