import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"

const Profile = () => {
   const [img, setImg] = useState<string>()
   const auth = useAuth()

   useEffect(()=>{
      setImg(auth?.url)
   }, [auth?.isAuthenticate])
   
   return (
      <div>
         <img src={img} />
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
         excepturi itaque vel hic labore amet perferendis nobis vitae ab
         laudantium. 
      </div>
   )
}

export default Profile
