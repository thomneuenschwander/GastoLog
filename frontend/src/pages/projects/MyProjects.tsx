/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRepositoriesService } from "../../resources/projects/repositories.service"
import { Project } from "../../resources/projects/repositories.resource"
import Template from "../../components/templates/Template"
import ProjectCard from "./ProjectCard"
import Button from "../../components/Button"

const MyProjects: React.FC = () => {
	const [projects, setProjects] = useState<Project[]>([])
	const { fetchGithub } = useRepositoriesService()

  const navigate  = useNavigate()

	useEffect(() => {
		const setResData = async () => {
			const res = await fetchGithub()
      if (res.length > 12) res.length = 12
			setProjects(res)
		}
		setResData()
	}, [])

	return (
    <Template>
      <ul className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(({id, name, url, language, createdAt}) => (
          <li key={id}>
            <ProjectCard name={name} url={url} createdAt={createdAt} language={language}/>
          </li>
        )
        )}
      </ul>
      <div className="fixed bottom-20 left-0 right-0 flex justify-center">

      <Button style="bg-primary text-2xl transition duration-300 ease-in-out transform hover:-translate-y-1" label="voltar" onClick={() => navigate('/')} />
      </div>
    </Template>
  )
}

export default MyProjects
