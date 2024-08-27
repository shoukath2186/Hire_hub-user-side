import { useState } from "react";
import { UserProfile } from "../../../datatypes.ts/IJobProfile";
import { Edit } from "@mui/icons-material";

interface UserData {
  profile: UserProfile;
  setEditProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const Resume: React.FC<UserData> = ({ profile, setEditProfile }) => {
  const [resume, setResume] = useState<string | File>(profile.resume);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const isValidFileType =
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      if (isValidFileType) {
        setResume(file);
        setEditMode(true);
        setError("");
      } else {
        setResume(profile.resume);
        setError("Please upload a PDF or Word document.");
      }
    }
  };

  const handleSaveResume = () => {
    if (typeof resume === "string") {
      setEditProfile((prev) =>
        prev !== null ? { ...prev, resume: resume } : prev
      );
    } else if (resume instanceof File) {
      setEditProfile((prev) =>
        prev !== null ? { ...prev, resume: resume } : prev
      );
    }
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setResume(profile.resume);
    setEditMode(false);
    setError("");
  };

  const openResumeInNewTab = () => {
    if (typeof resume === "string") {
      window.open(resume, "_blank");
    } else if (resume instanceof File) {
      const fileUrl = URL.createObjectURL(resume);
      window.open(fileUrl, "_blank");
      URL.revokeObjectURL(fileUrl);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-4-color text-2xl font-bold mb-2" htmlFor="">
        Resume
      </label>
      {editMode ? (
        <div className="flex flex-col items-start">
          <input
            type="file"
            onChange={handleResumeChange}
            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="flex space-x-4">
            <button
              onClick={handleSaveResume}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <Edit /> Add Resume
          </button>
          {resume? (
            <button
              onClick={openResumeInNewTab}
              className="text-blue-500 hover:text-blue-700"
            >
              View Resume
            </button>
          ):(
            <p className="text-red-700">No resume uploaded</p>
          )}
          
        </div>
      )}
      <hr className="w-full border-t-2 border-3-color my-4" />
    </div>
  );
};

export default Resume;