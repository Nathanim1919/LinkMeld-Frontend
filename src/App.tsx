import './App.css'
import MainLayout from './layout/MainLayout'
import { Dashboard } from './pages/Dashboard'

function App() {

  return (
    <>
   <MainLayout children={<Dashboard/>}/>
    </>
  )
}

export default App
