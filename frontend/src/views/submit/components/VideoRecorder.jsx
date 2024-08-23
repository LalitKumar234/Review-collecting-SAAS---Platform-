// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { PiRecordFill } from "react-icons/pi";
// import { PiStopCircleFill } from "react-icons/pi";
// import useFileUpload from "../../../services/uploadFileService";

// const mimeType = 'video/webm; codecs="opus,vp8"';

// const VideoRecorder = () => {
//     const [permission, setPermission] = useState(false);
//     const { uploadVideo } = useFileUpload()
//     const mediaRecorder = useRef(null);
//     const liveVideoFeed = useRef(null);
//     const [recordingStatus, setRecordingStatus] = useState("inactive");
//     const [stream, setStream] = useState(null);
//     const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);
//     const [videoChunks, setVideoChunks] = useState([]);
//     const [timer, setTimer] = useState(0);

//     const TIMER_DURATION = 120; // Duration in seconds

//     const getCameraPermission = async () => {
//         setRecordedVideoBlob(null);
//         if ("MediaRecorder" in window) {
//             try {
//                 const videoConstraints = {
//                     audio: false,
//                     video: true,
//                 };
//                 const audioConstraints = { audio: true };
//                 const audioStream = await navigator.mediaDevices.getUserMedia(
//                     audioConstraints
//                 );
//                 const videoStream = await navigator.mediaDevices.getUserMedia(
//                     videoConstraints
//                 );
//                 setPermission(true);
//                 const combinedStream = new MediaStream([
//                     ...videoStream.getVideoTracks(),
//                     ...audioStream.getAudioTracks(),
//                 ]);

//                 setStream(combinedStream);
//                 liveVideoFeed.current.srcObject = videoStream;
//             } catch (err) {
//                 alert(err.message);
//                 console.log(err.message)
//             }
//         } else {
//             alert("The MediaRecorder API is not supported in your browser.");
//         }
//     };

//     // const startRecording = async () => {
//     //     setRecordingStatus("recording");
//     //     const media = new MediaRecorder(stream, { mimeType });
//     //     mediaRecorder.current = media;
//     //     mediaRecorder.current.start();
//     //     let localVideoChunks = [];
//     //     mediaRecorder.current.ondataavailable = (event) => {
//     //         if (typeof event.data === "undefined") return;
//     //         if (event.data.size === 0) return;
//     //         localVideoChunks.push(event.data);
//     //     };
//     //     setVideoChunks(localVideoChunks);
//     // };

//     const startRecording = () => {
//         setRecordingStatus("recording");
//         setTimer(0);
//         const media = new MediaRecorder(stream, { mimeType });
//         mediaRecorder.current = media;
//         mediaRecorder.current.start();
//         let localVideoChunks = [];
//         mediaRecorder.current.ondataavailable = (event) => {
//             if (typeof event.data === "undefined") return;
//             if (event.data.size === 0) return;
//             localVideoChunks.push(event.data);
//         };
//         setVideoChunks(localVideoChunks);

//         // Start timer
//         const intervalId = setInterval(() => {
//             setTimer((prevTimer) => prevTimer + 1);
//         }, 1000);

//         // Stop recording after TIMER_DURATION seconds
//         setTimeout(() => {
//             stopRecording();
//             clearInterval(intervalId);
//         }, TIMER_DURATION * 1000);
//     };

//     const stopRecording = () => {
//         setPermission(false);
//         setRecordingStatus("inactive");
//         mediaRecorder.current.stop();

//         mediaRecorder.current.onstop = () => {
//             const videoBlob = new Blob(videoChunks, { type: mimeType });
//             setRecordedVideoBlob(videoBlob);
//             setVideoChunks([]);
//         };
//     };

//     const handleUpload = async () => {
//         try {
//             if (recordedVideoBlob) {
//                 const videoLink = await uploadVideo(recordedVideoBlob);
//                 console.log(videoLink);
//             } else {
//                 console.error("No recorded video to upload.");
//             }
//         } catch (error) {
//             console.error("Error uploading video:", error);
//         }
//     };

//     return (
//         <div>
//             <div className="flex justify-center items-center">
//                 {!permission && recordingStatus === "inactive" && !recordedVideoBlob ? (
//                     <Button onClick={getCameraPermission} type="button" className="mt-5">
//                         Turn on camera
//                     </Button>
//                 ) : null}
//             </div>
//             <div className="realtive">
//                 {!recordedVideoBlob ? (
//                     <>
//                         <video ref={liveVideoFeed} autoPlay className="rounded-md"></video>
//                         {/* {timer}timer */}
//                         {permission && recordingStatus === "inactive" ? (
//                             <Button onClick={startRecording}
//                                 className="absolute bottom-[50px] w-[9rem] left-0 right-0 mx-auto bg-red-500 hover:bg-red-600 bg-opacity-75 rounded-full border-2 border-white flex gap-2">
//                                 <PiRecordFill size={20} /> Record
//                             </Button>
//                         ) : recordingStatus === "recording" ? <Button className="absolute bottom-[50px] w-[11rem] left-0 right-0 mx-auto bg-red-500 hover:bg-red-600 bg-opacity-75 rounded-full border-2 border-white flex gap-2" onClick={stopRecording} type="button">
//                             <PiStopCircleFill size={22} /> Stop Recording
//                         </Button> : null}
//                     </>
//                 ) : null}
//                 {recordedVideoBlob ? (
//                     <div className="recorded-player">
//                         <video className="recorded" src={URL.createObjectURL(recordedVideoBlob)} controls></video>
//                         <div className="flex justify-between mt-5">
//                             <Button variant="outline" onClick={() => {
//                                 setRecordedVideoBlob(null)
//                                 setRecordingStatus("inactive")
//                                 setPermission(false)
//                             }}>Try again</Button>
//                             <Button onClick={handleUpload}>Upload Video</Button>
//                         </div>
//                     </div>
//                 ) : null}
//             </div>
//         </div>
//     );
// };

// export default VideoRecorder;

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { PiRecordFill } from "react-icons/pi";
import { PiStopCircleFill } from "react-icons/pi";
import useFileUpload from "../../../services/uploadFileService";

const mimeType = 'video/webm; codecs="opus,vp8"';

const VideoRecorder = ({setPage, testimonialData, setTestimonialData}) => {
    const [permission, setPermission] = useState(false);
    const { uploadVideo } = useFileUpload()
    const mediaRecorder = useRef(null);
    const liveVideoFeed = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);
    const [videoChunks, setVideoChunks] = useState([]);
    const [timer, setTimer] = useState(0);

    const getCameraPermission = async () => {
        setRecordedVideoBlob(null);
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: false,
                    video: true,
                };
                const audioConstraints = { audio: true };
                const audioStream = await navigator.mediaDevices.getUserMedia(
                    audioConstraints
                );
                const videoStream = await navigator.mediaDevices.getUserMedia(
                    videoConstraints
                );
                setPermission(true);
                const combinedStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);

                setStream(combinedStream);
                liveVideoFeed.current.srcObject = videoStream;
            } catch (err) {
                alert(err.message);
                console.log(err.message)
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localVideoChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };
        setVideoChunks(localVideoChunks);
    };

    const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            setRecordedVideoBlob(videoBlob)
            setVideoChunks([]);
        };
    };

    const handleUpload = async () => {
        try {
            if (recordedVideoBlob) {
                const videoLink = await uploadVideo(recordedVideoBlob);
                console.log(videoLink);
                setTestimonialData({...testimonialData, videoTestimonialLink: videoLink})
            } else {
                console.error("No recorded video to upload.");
            }
        } catch (error) {
            console.error("Error uploading video:", error);
        }finally{
            setPage(3)
        }
    };

    return (
        <div>
            <main>
                <div className="flex justify-center items-center">
                    {!permission && recordingStatus === "inactive" && !recordedVideoBlob ? (
                        <Button onClick={getCameraPermission} type="button" className="mt-5">
                            Turn on camera
                        </Button>
                    ) : null}
                </div>
            </main>

            <div className="realtive">
                {!recordedVideoBlob ? (
                    <>
                        <video ref={liveVideoFeed} autoPlay className="rounded-md"></video>
                        {permission && recordingStatus === "inactive" ? (
                            <Button onClick={startRecording}
                                className="absolute bottom-[50px] w-[9rem] left-0 right-0 mx-auto bg-red-500 hover:bg-red-600 bg-opacity-75 rounded-full border-2 border-white flex gap-2">
                                <PiRecordFill size={20} /> Record
                            </Button>
                        ) : recordingStatus === "recording" ?
                            <>
                            <span>01:20</span>
                                <Button className="absolute bottom-[50px] w-[11rem] left-0 right-0 mx-auto bg-red-500 hover:bg-red-600 bg-opacity-75 rounded-full border-2 border-white flex gap-2" onClick={stopRecording} type="button">
                                    <PiStopCircleFill size={22} /> Stop Recording
                                </Button>
                            </>
                            : null}
                    </>
                ) : null}
                {recordedVideoBlob ? (
                    <div className="recorded-player">
                        <video className="recorded" src={URL.createObjectURL(recordedVideoBlob)} controls></video>
                        <div className="flex justify-between mt-5">
                            <Button variant="outline" onClick={() => {
                                setRecordedVideoBlob(null)
                                setRecordingStatus("inactive")
                                setPermission(false)
                            }}>Try again</Button>
                            <Button onClick={handleUpload}>Submit Video</Button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default VideoRecorder;
