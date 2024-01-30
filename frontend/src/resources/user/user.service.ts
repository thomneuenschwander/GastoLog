import { api } from "../api"
import { UserSessionToken } from "./user.resource"

export function getUserLocalStorage() {
	const json = localStorage.getItem("_auth")
	if (!json) {
		return null
	}
	const user = JSON.parse(json)

	return user ?? null
}

class UserService {
	baseURL: string = "/user"

	authenticateRequests(): UserSessionToken {
		const user = getUserLocalStorage()
		if (!user || !user.accessToken) {
			throw new Error("Invalid or null token")
		}
		api.defaults.headers.common["Authorization"] = `Bearer ${user.accessToken}`
		return user
	}

	async getImageProfile() {
		try {
			const user = getUserLocalStorage()
			api.defaults.headers.common[
				"Authorization"
			] = `Bearer ${user.accessToken}`

			const res = await api.get(`/user/image/get/${user.email}`, {
				responseType: "blob",
			})
			console.log(res.status)
         
			const blob = res.data
			const reader = new FileReader()

			return new Promise<string>((resolve, reject) => {
				reader.onloadend = () => {
					const imageData = reader.result as string
					const imageUrl = `data:image/jpeg;base64,${btoa(imageData)}`
					resolve(imageUrl)
				}

				reader.onerror = () => {
					reject(new Error("Failed to read image data."))
				}

				reader.readAsBinaryString(blob)
			})
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async postImage(file: File): Promise<void> {
		try {
			const user = getUserLocalStorage()
			if (!user || !user.accessToken) {
				throw new Error("Invalid or null token")
			}
			const formData = new FormData()
			formData.append("file", file)

			await api
				.post("/user/image/add", formData, {
					headers: {
						Authorization: `Bearer ${user.accessToken}`,
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => console.log(res.status))
		} catch (error) {
			console.error(error)
		}
	}
}

export const useUserService = () => new UserService()
