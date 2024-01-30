export type FileDataProps = {
  filename: string;
  location: string;
  originalname: string;
}

export const uploadFetchFile = async (formData: FormData) => {
  try {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/files/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
    const file = await response.json();
    return file as FileDataProps;
  } catch (error: any) {
    console.error("Error uploading file:", error);
    throw new Error(error.message);
  }
};
