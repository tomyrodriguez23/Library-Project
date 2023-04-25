import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login"
import './app.css'
import BookDetails from "./pages/BookDetails/BookDetails"
import BooksByCategory from "./pages/BooksByCategory/BooksByCategory"
import AllCategories from "./pages/AllCategories/AllCategories"
import AllBooks from "./pages/AllBooks/AllBooks"
import AllOrders from "./pages/AllOrders/AllOrders"
import SignUpAdress from "./pages/SignUp/SignUpAdress"

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signUpAdress" element={<SignUpAdress />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/orders" element={<AllOrders />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/category/:id" element={<BooksByCategory />} />
        <Route path="/books/category/:id/book/:id" element={<BookDetails />} />
      </Routes>
    </div>
  )
}

export default App
