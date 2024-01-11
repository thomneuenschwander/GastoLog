import Footer from "./Footer"
import Header from "./Header"

interface TemplateProps {
    children: React.ReactNode
}

const Template: React.FC<TemplateProps> = ({ children }: TemplateProps) => {
  return (
    <>
        <Header />
          <div className="container mx-auto mt-8 px-4">
            {children}
          </div>
        <Footer />
    </>
  )
}

export default Template