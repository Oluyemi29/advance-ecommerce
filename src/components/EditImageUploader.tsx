"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { DeleteCloudImage } from "@/Action/PaymentIntent";

interface cloudinaryResponse {
  asset_id: string;
  public_id: string;
  secure_url: string;
}

type ImageProps = {
  previousImages: string[] | undefined;
  uploadedImages: cloudinaryResponse[];
  setUploadedImages: React.Dispatch<React.SetStateAction<cloudinaryResponse[]>>;
};

const EditImageUploader = ({
  previousImages,
  uploadedImages,
  setUploadedImages,
}: ImageProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setUploading(true);
        setError(null);
        const uploadPromises = acceptedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "oluyemistore");
          formData.append("cloud_name", "devoluyemi");

          const responsed = await axios.post(
            "https://api.cloudinary.com/v1_1/devoluyemi/image/upload",
            formData
          );
          return responsed.data;
        });

        const result = await Promise.all(uploadPromises);
        setUploadedImages((prevData) => [...prevData, ...result]);
      } catch (error) {
        setError("An error occured");
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
    [setUploadedImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDelete = async (id: string) => {
    try {
      await DeleteCloudImage(id);
      setUploadedImages((prevData) => {
        return prevData.filter((image) => {
          return image.public_id !== id;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <>
        <div
          {...getRootProps()}
          style={{
            border: "1px dashed gray",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files</p>
          ) : (
            <p>Drag n drop some files here, or click to select files</p>
          )}
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {uploading && <p>loading...</p>}

        <div className=" flex gap-4">
          {uploadedImages.length > 0 ? (
            <>
              {uploadedImages?.map((uploadedImage, index) => {
                return (
                  <div key={index}>
                    <Image
                      src={uploadedImage.secure_url}
                      alt="uploadImage"
                      width={70}
                      height={70}
                      priority
                      quality={100}
                      className="rounded-md"
                    />
                    <Button
                      size="sm"
                      color="danger"
                      onPress={() => handleDelete(uploadedImage.public_id)}
                    >
                      Delete
                    </Button>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {previousImages?.map((prevImage, index) => {
                return (
                  <div key={index}>
                    <Image
                      src={prevImage}
                      alt="previousImage"
                      width={70}
                      height={70}
                      priority
                      quality={100}
                      className="rounded-md"
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default EditImageUploader;
