import { useRef, useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const useFileUpload = () => {
    const [uploadProgress, setUploadProgress] = useState(false);

    const uploadFile = async (file, acl = 'public-read') => {
        setUploadProgress(true)
        try {
            const s3Client = new S3Client({
                region: 'ap-south-1',
                credentials: {
                    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY_ID,
                    secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
                },
            });
            const key = `profiles/profiles_${uuidv4()}.jpeg`
            const params = {
                Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
                Key: key,
                Body: file,
                ACL: acl,
                ContentType: 'image/jpeg'
            };
            const command = new PutObjectCommand(params);
            const data = await s3Client.send(command);

            const previewLink = `https://${import.meta.env.VITE_S3_BUCKET_NAME}.s3.${'ap-south-1'}.amazonaws.com/${key}`;
            console.log('File uploaded successfully.', previewLink);
            console.log(data, "datadatadata")
            return previewLink;
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setUploadProgress(false)
        }
    };

    const uploadVideo = async (videoFile, acl = 'public-read') => {
        setUploadProgress(true);
        try {
            const s3Client = new S3Client({
                region: 'ap-south-1',
                credentials: {
                    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY_ID,
                    secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
                },
            });
            const key = `videos/video_${uuidv4()}.mp4`; // Assuming the recorded video is in webm format
            const params = {
                Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
                Key: key,
                Body: videoFile,
                ACL: acl,
                ContentType: 'video/mp4' // Set the content type according to your video format
            };
            const command = new PutObjectCommand(params);
            const data = await s3Client.send(command);

            const videoUrl = `https://${import.meta.env.VITE_S3_BUCKET_NAME}.s3.${'ap-south-1'}.amazonaws.com/${key}`;
            console.log('Video uploaded successfully.', videoUrl);
            console.log(data, "datadatadata");
            return videoUrl;
        } catch (error) {
            console.error('Error uploading video:', error);
        } finally {
            setUploadProgress(false);
        }
    };

    return { uploadFile, uploadProgress, uploadVideo };
};

export default useFileUpload;
