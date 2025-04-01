import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Header } from './Components/Header'
import { Hero } from './Components/Hero'
import { Pop } from './Components/Pop'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Hero/>
      <Pop/>
      <Cart/>
      
    </>
  )
}

export default App
