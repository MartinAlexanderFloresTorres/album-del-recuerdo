import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/public/Home'
import Layout from './layouts/Layout'
import Imagenes from './pages/private/Imagenes'
import Audios from './pages/private/Audios'
import Videos from './pages/private/Videos'
import Notas from './pages/private/Notas'
import Amigos from './pages/private/Amigos'
import NotFound from './pages/public/NotFound'
import Enlaces from './pages/private/Enlaces'
import Uploads from './pages/private/Uploads'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/subir' element={<Uploads />} />
            <Route path='/imagenes' element={<Imagenes />} />
            <Route path='/audios' element={<Audios />} />
            <Route path='/videos' element={<Videos />} />
            <Route path='/notas' element={<Notas />} />
            <Route path='/amigos' element={<Amigos />} />
            <Route path='/enlaces' element={<Enlaces />} />

            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position='bottom-right'
        reverseOrder={false}
        toastOptions={{ style: { fontSize: 16, background: '#363636', color: '#fff' } }}
      />
    </>
  )
}

export default App
