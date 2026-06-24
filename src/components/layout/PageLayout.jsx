import Header from '../Header'
import Footer from '../Footer'

const PageLayout = ({ children, showFooter = true }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}

export default PageLayout
