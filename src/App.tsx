import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import UserRouter from './Routes/UserRouter.tsx'
import CompanyRouter from './Routes/CompanyRouter.tsx'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<UserRouter />} />
          <Route path='/company/*' element={<CompanyRouter />} />
        </Routes>

      </BrowserRouter> 
{/* <UserManagement/> */}


    </>

  )
}

export default App
