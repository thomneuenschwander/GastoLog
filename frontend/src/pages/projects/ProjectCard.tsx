import { Project } from "../../resources/projects/repositories.resource";

const ProjectCard: React.FC<Project> = ({ name, url, language, createdAt }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block transition duration-100 transform hover:scale-105 font-medium">
      <div className="bg-gradient-to-br from-blue-800 via-blue-500 to-blue-700 text-white rounded-lg overflow-hidden shadow-md p-6">
        <h1 className="text-3xl font-semibold mb-4">{name}</h1>
        <div className="flex items-center justify-between">
          <p className="text-2xl text-gray-100">{language}</p>
          <p className="text-gray-200 text-2xl">{createdAt && new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
