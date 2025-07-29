
import { Route, Routes } from 'react-router'
import './App.css'
import Root from './layout/Root'
import Home from './pages/Home'
import AddProductForm from './app/features/products/components/AddProductForm'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path='/add-product' element={<AddProductForm />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
