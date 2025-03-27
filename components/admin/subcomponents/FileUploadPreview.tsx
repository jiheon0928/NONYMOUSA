import React, { JSX } from "react";

type FileUploadPreviewProps = {
  files: File[];
};

const FileUploadPreview = ({ files }: FileUploadPreviewProps): JSX.Element => (
  <>
    {files.length > 0 && (
      <div className="mt-2">
        <p className="text-sm font-semibold">새로운 이미지:</p>
        <div className="flex flex-row flex-wrap gap-2">
          {files.map((file, i) => (
            <img
              key={`new-img-${i}-${file.name}`}
              src={URL.createObjectURL(file)}
              alt={`새로운 이미지 ${i + 1}`}
              className="w-24 h-24 object-cover rounded border"
            />
          ))}
        </div>
      </div>
    )}
  </>
);

export default FileUploadPreview;
