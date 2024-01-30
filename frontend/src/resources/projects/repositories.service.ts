import axios from "axios"
import { Project } from "./repositories.resource"

class RepositoriesService {
	async fetchGithub() {
		try {
			const res = await axios.get(
				"https://api.github.com/users/thomneuenschwander/repos"
			)
			const projectsData = res.data

			const projects: Project[] = projectsData.map((projectData: any) => {
				return {
					id: projectData.id,
					name: projectData.name,
					url: projectData.html_url,
					language: projectData.language,
					createdAt: new Date(projectData.created_at),
				}
			})
			return projects
		} catch (error) {
			console.error("Error fetching data:", error)
			throw error
		}
	}
}

export const useRepositoriesService = () => new RepositoriesService()
