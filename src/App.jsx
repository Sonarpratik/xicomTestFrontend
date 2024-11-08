import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import User from './pages/user/User'
import MainUser from './pages/user/form/MainUser'

function App() {
const [showModel, setShowModel] = useState(false);
const performCancel=()=>{
  setShowModel(false);
}
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh"}}>
    <div className='body-width'>
     <h1 style={{fontSize:"2rem",textAlign:"center",fontWeight:"600",cursor:'pointer'}} onClick={()=>setShowModel(true)}>Click TO View Table</h1>
      <MainUser/>
    </div>
    {showModel&&<User performCancel={performCancel}/>}
    </div>
  )
}

export default App
