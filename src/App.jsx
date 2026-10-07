import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Program from './components/Program.jsx'
import Committee from './components/Committee.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Program />
        <About />
        <Committee />
      </main>
      <Footer />
    </>
  )
}
