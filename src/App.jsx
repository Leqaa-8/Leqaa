import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppFloat from './components/ui/WhatsAppFloat'
import Home from './pages/Home'
import TemplatesPage from './pages/TemplatesPage'
import OrderForm from './pages/OrderForm'
import PreviewPage from './pages/PreviewPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
