import React from 'react'
import Header from '../Header/Header'
import Categories from '../Categories/Categories'
import Recomendations from '../Recomendations/Recomendations'
import Footer from '../Footer/Footer'
import { useGlobalStates } from '../../context/GlobalContext'
import HeaderLogged from '../Header/HeaderLogged'

const Layout = () => {

  const {isLogged} = useGlobalStates()

  return (
    <>
    {isLogged ? <HeaderLogged/> : <Header/>}
    <Categories/>
    <Recomendations/>
    <Footer/>
    </>
  )
}

export default Layout