import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import UserRouter from './Routes/UserRouter.tsx'
import CompanyRouter from './Routes/CompanyRouter.tsx'
import AdminRouter from './Routes/AdminRouter.tsx'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<UserRouter />} />
          <Route path='/company/*' element={<CompanyRouter />} />
          <Route path='/admin/*' element={<AdminRouter />} />
        </Routes>

      </BrowserRouter> 
{/* <UserManagement/> */}


    </>

  )
}

export default App
