import React, { useState, ChangeEvent } from "react";
import { FileDataProps, uploadFetchFile } from "../../api/Upload/Upload";
import { Flex, Spin, message } from "antd";

interface FileUploadProps {
  onChange: (file: FileDataProps) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange }) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      const file = await uploadFetchFile(formData);
      onChange(file);
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex gap={5} align="center">
      <input type="file" onChange={handleFileChange} />
      {loading && <Spin />}
    </Flex>
  );
};

export default FileUpload;
