import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

<<<<<<< HEAD
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
=======
  console.log(isEditMode, "isEditMode");

  function handleImageFileChange(event) {
    console.log(event.target.files, "event.target.files");
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);

    if (selectedFile) setImageFile(selectedFile);
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
<<<<<<< HEAD
    if (droppedFile) {
      setImageFile(droppedFile);
    }
=======
    if (droppedFile) setImageFile(droppedFile);
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
  }

  function handleRemoveImage() {
    setImageFile(null);
<<<<<<< HEAD
    setUploadedImageUrl(null);
=======
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
<<<<<<< HEAD
    if (!imageFile) return;
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("my_file", imageFile); // ensure your backend expects 'my_file'

      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );

      if (response?.data?.success && response.data.result?.url) {
        setUploadedImageUrl(response.data.result.url);
      } else {
        console.error("Upload failed:", response.data.message || "No URL returned.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
    } finally {
=======
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
<<<<<<< HEAD
    if (imageFile && !isEditMode) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
=======
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div
      className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
<<<<<<< HEAD
          !imageFile || isEditMode ? "opacity-60" : "opacity-100"
=======
          isEditMode ? "opacity-60" : ""
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
<<<<<<< HEAD

=======
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
<<<<<<< HEAD
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex flex-col items-center justify-center h-32`}
=======
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
<<<<<<< HEAD
              <FileIcon className="w-8 h-8 text-primary mr-2" />
              <p className="text-sm font-medium">{imageFile.name}</p>
            </div>
            {!isEditMode && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            )}
          </div>
        )}
      </div>

      {uploadedImageUrl && (
        <img src={uploadedImageUrl} alt="Uploaded" className="mt-4 rounded-md max-h-64" />
      )}
=======
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
    </div>
  );
}

export default ProductImageUpload;
