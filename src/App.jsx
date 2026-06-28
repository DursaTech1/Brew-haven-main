import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { AppProvider, useApp } from './context/AppContext'
import CustomizePage from './components/CustomizePage'
import CartPage from './components/CartPage'
import BookingPage from './components/BookingPage'
import ToastContainer from './components/ToastContainer'

const AppContent = () => {
  const { view } = useApp()

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [view])

  return (
    <div className="bg-[#0c0604] min-h-screen text-white flex flex-col justify-between">
      <Navbar />
      
      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero />
            <Menu />
            <About />
            <Testimonials />
            <Contact />
          </>
        )}
        
        {view === 'customize' && <CustomizePage />}
        {view === 'cart' && <CartPage />}
        {view === 'booking' && <BookingPage />}
      </main>

      <Footer />
      <ToastContainer />
    </div>
  )
}

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App


