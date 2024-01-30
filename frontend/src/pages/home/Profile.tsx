
import FileUpload from "../../components/input/FileUpload";


const Profile = () => {
 


   return (
      <div>
         <FileUpload
            fileBoxStyle="bg-primary text-white w-full opacity-90"
            generalStyle="text-xl  w-full "
         />
         <div>
            <h2>Perfil do Usuário</h2>
         </div>
      </div>
   );
};

export default Profile;
