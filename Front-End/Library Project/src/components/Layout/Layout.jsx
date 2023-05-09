import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useGlobalStates } from '../../context/GlobalContext'
import HeaderLogged from '../Header/HeaderLogged'
import Home from '../Home/Home'

const Layout = () => {

  const {isLogged} = useGlobalStates()

  return (
    <>
    {isLogged ? <HeaderLogged/> : <Header/>}
    <Home />
    <Footer/>
    </>
  )
}

export default Layout