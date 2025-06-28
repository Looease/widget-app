import { useState } from 'react'
import WidgetPage from './components/WidgetPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <WidgetPage/>
    </main>
    </>
  )
}

export default App;
