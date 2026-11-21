import { useState } from 'react'
import './chat/ChatPanel'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import ChatPanel from './chat/ChatPanel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Test Chat</h1>
      <ChatPanel />
    </>
  )
}

export default App
