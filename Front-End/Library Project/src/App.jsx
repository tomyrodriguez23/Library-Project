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
import MyAccount from "./pages/MyAccount/MyAccount"
import AddCategory from "./pages/Admin/AddCategory/AddCategory"
import AddBook from "./pages/Admin/AddBook/AddBook"
import UpdateCategory from "./pages/Admin/UpdateCategory/UpdateCategory"
import UpdateBook from "./pages/Admin/UpdateBook/UpdateBook"
import ListMembers from "./pages/Admin/ListMembers/ListMembers"
import UpdateMember from "./pages/Admin/UpdateMember/UpdateMember"

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signUpAdress" element={<SignUpAdress />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<AllOrders />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/category/:id" element={<BooksByCategory />} />
        <Route path="/books/category/:id/book/:id" element={<BookDetails />} />
        <Route path="/admin/category" element={<AddCategory />} />
        <Route path="/admin/book" element={<AddBook />} />
        <Route path="/admin/category/:id/update" element={<UpdateCategory />} />
        <Route path="/admin/book/:id/update" element={<UpdateBook />} />
        <Route path="/admin/members" element={<ListMembers />} />
        <Route path="/admin/members/update/:id" element={<UpdateMember />} />
      </Routes>
    </div>
  )
}

export default App
