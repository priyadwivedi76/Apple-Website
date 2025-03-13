import NavBar from "./components/NavBar"
import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
function App() {
  return (
    <>
      <main className="bg-black">
        <NavBar/>
        <Hero/>
        <Highlights/>
      </main>
    </>
  )
}

export default App