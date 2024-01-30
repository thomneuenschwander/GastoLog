/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useRepositoriesService } from "../../resources/projects/repositories.service"
import { Project } from "../../resources/projects/repositories.resource"
import Template from "../../components/templates/Template"
import ProjectCard from "./ProjectCard"

const MyProjects: React.FC = () => {
	const [projects, setProjects] = useState<Project[]>([])
	const { fetchGithub } = useRepositoriesService()

	useEffect(() => {
		const setResData = async () => {
			const res = await fetchGithub()
			setProjects(res)
		}
		setResData()
	}, [])

	return (
    <Template>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(({id, name, url, language, createdAt}) => (
          <li key={id}>
            <ProjectCard name={name} url={url} createdAt={createdAt} language={language}/>
          </li>
        )
        )}
      </ul>
    </Template>
  )
}

export default MyProjects
