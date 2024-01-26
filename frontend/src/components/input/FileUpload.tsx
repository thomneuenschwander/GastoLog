import { ChangeEvent, useState } from "react"
import { useUserService } from "../../resources/user/user.service"

interface FileUploadProps {
   generalStyle?: string
   fileBoxStyle?: string
}

const FileUpload: React.FC<FileUploadProps> = ({
   fileBoxStyle,
   generalStyle,
}) => {
   const [selectedFile, setSelectedFile] = useState<File | null>(null)
   const { postImage } = useUserService()

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0]
      setSelectedFile(file || null)
   }

   const handleUpload = async () => {
      if (selectedFile) {
         try {
            await postImage(selectedFile)
            setSelectedFile(null)
         } catch (error) {
            console.error(error)
         }
      }
   }

   const handleOpenFileExplorer = () => {
      const fileInput = document.getElementById("fileInput") as HTMLInputElement
      fileInput.click()
   }
   const handleCloseSelectedFile = () => {
      setSelectedFile(null)
   }

   return (
      <div className={`flex items-center gap-4 p-2 ${generalStyle}`}>
         <div className="flex gap-1">
            {selectedFile && (
               <>
                  <button
                  className={`bg-blue-500 text-white p-2 rounded ${
                     !selectedFile && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={handleUpload}
                  disabled={!selectedFile}
               >
                  Enviar
               </button>

               <button
               className={`bg-red-500 text-white p-2 rounded ${
                  !selectedFile && "opacity-50 cursor-not-allowed"
               }`}
               onClick={handleCloseSelectedFile}
               disabled={!selectedFile}
            >
               X
            </button>
               </>
            )}
         </div>
         <span
            className={`text-gray-700 p-2 overflow-hidden rounded lg:w-full sm:w-1/2 ${
               selectedFile && fileBoxStyle
            }`}
         >
            {selectedFile && selectedFile.name}
         </span>
         <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            className="hidden"
         />
         <button
            className="bg-blue-500 text-white p-2 rounded-full flex justify-center items-center ml-auto"
            onClick={handleOpenFileExplorer}
         >
            +
         </button>
      </div>
   )
}

export default FileUpload
