import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { FaWallet } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'


export default function Navbar() {

  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState()

  useEffect(() => {
    setCurrentUrl(location.pathname)
  }, [location])
  
  return (
      <header className={`${currentUrl == '/' ? 'absolute' : 'relative'} h-24 w-screen bg-[#0a1f2f] flex items-center`}>
        <div className="xl:container w-full xl:px-20 md:px-12 px-4 mx-auto flex justify-between items-center">
          <Link to="/">
            <img className="h-12" src="https:demo.thetork.com/html/torkgo/assets/images/logo/logo.png" alt="img" />
          </Link>
          <div className="hidden md:flex items-center text-white space-x-8 font-semibold font-body text-lg">
            <Link to="/">HOME</Link>
            <Link to="/games">GAMES</Link>
            <Link to="/leader-board">LEADER BOARD</Link>
            <Link to="#" className="flex items-center space-x-2 text-[#0a1f2f] px-5 h-11 text-[1rem] bg-[#28dbd1] rounded font-semibold">
                <p>Connect</p>
                <FaWallet size={20} />
            </Link>
          </div>
          <div className="block md:hidden text-white">
            <GiHamburgerMenu size={25} />
          </div>
        </div>
      </header>
  )
}
