/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import FileUpload from "../../components/input/FileUpload"
import { useUserService } from "../../resources/user/user.service"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useExpenseContext } from "../../hooks/useExpenseContext"
import { ExpenseContext } from "../../context/expense/ExpenseContext"

const Profile = () => {
	const [image, setImage] = useState<string>()
	const { getImageProfile } = useUserService()
	const authContext = useAuthContext()
	const { totalSpent } = useExpenseContext() as ExpenseContext

	useEffect(() => {
		if (authContext?.isAuthenticate) {
			const fetchImage = async () => {
				const img = await getImageProfile()
				setImage(img)
			}
			fetchImage()
			console.log('image '+ image)
		}
	}, [])
	

	return (
		<div className="bg-white p-6 rounded-lg shadow-md p-4">
			<FileUpload
				fileBoxStyle="text-primary text-medium w-full opacity-90"
				generalStyle="text-xl w-full"
			/>
			<h1 className="text-2xl font-semibold mb-6">Perfil do Usuário</h1>
			<div className="flex items-center justify-center space-x-4 mb-6">
				{image ? (
					<img
						src={image}
						alt="Foto de perfil"
						className="w-32 h-32 rounded-full object-cover"
					/>
				) : (
					<img
						src='https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free.png'
						alt="Foto de perfil"
						className="w-32 h-32 rounded-full object-cover"
					/>
				)}
			</div>
			<div className="text-left p-2">
				<h2 className="text-xl font-medium letter-space-2">
					Total gasto: <span className="ml-2 whiteSpace:break-spaces">R${totalSpent.toFixed(2)}</span>
				</h2>
			</div>
		</div>
	)
}

export default Profile
