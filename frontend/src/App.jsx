import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route ,Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import SendMoney from './pages/SendMoney'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="overflow-hidden">
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/send' element={<SendMoney/>}/>

    </Routes>
    </div>
  )
}

export default App
