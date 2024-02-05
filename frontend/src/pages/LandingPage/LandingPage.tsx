import { NavLink } from "react-router-dom"
import Template from "../../components/templates/Template"
import DALLEIMG from "../../img/DALLEIMG.png"

const LandingPage = () => {
	return (
		<Template>
			<div className="min-h-[86.9vh] bg-gradient-to-br from-cyan-500 to-blue-700 flex flex-col justify-center items-center text-white overflow-hidden">
				<div
					className="w-full h-60vh flex flex-col md:flex-row justify-between items-center px-4 md:px-8 lg:px-12 xl:px-16 mx-auto bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl"
					style={{ height: "60vh" }}
				>
					<div className="md:w-1/2 text-center mb-4 md:mb-0">
						<h1 className="text-5xl font-extrabold mb-8 md:mb-12 text-white">
							Monitore seus gastos
							<br />e controle suas despesas!
						</h1>
						<NavLink to="/projects">
							<button className="text-xl mt-4 md:mt-0 px-8 py-4 bg-gradient-to-r bg_primary to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full font-bold shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
								Confira outros projetos
							</button>
						</NavLink>
					</div>
					<div className="md:w-1/2 flex justify-center">
						<img
							src={DALLEIMG}
							alt="Landing page visual"
							className="max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain shadow-xl rounded-xl"
						/>
					</div>
				</div>
			</div>
		</Template>
	)
}

export default LandingPage
