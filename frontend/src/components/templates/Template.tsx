import Footer from "./Footer"
import Header from "./Header"

interface TemplateProps {
    children: React.ReactNode
}

const Template: React.FC<TemplateProps> = ({ children }: TemplateProps) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
          <div className="flex-grow container mx-auto mt-8 "> {/*container mx-auto mt-8 px-4*/}
            {children}
          </div>
        <Footer />
    </div>
  )
}

export default Template