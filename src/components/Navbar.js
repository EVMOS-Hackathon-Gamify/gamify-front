import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import { FaWallet } from 'react-icons/fa'
import { MdClear } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'


export default function Navbar() {

  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [currentUrl, setCurrentUrl] = useState()

  useEffect(() => {
    setCurrentUrl(location.pathname)
  }, [location])
  
  return (
    <>
      <header className={`${currentUrl == '/' ? 'absolute' : 'relative'} h-24 w-screen bg-[#0a1f2f] flex items-center`}>
        <div className="xl:container w-full xl:px-20 md:px-12 px-4 mx-auto flex justify-between items-center">
          <Link to="/">
            <img className="h-12" src="https:demo.thetork.com/html/torkgo/assets/images/logo/logo.png" alt="img" />
          </Link>
          <div className="hidden md:flex items-center text-white space-x-8 font-semibold font-body text-lg">
            <Link to="/">HOME</Link>
            <Link to="/games">GAMES</Link>
            <Link to="/leader-board">LEADER BOARD</Link>
            <div onClick={onOpen} className="flex items-center space-x-2 text-[#0a1f2f] px-5 h-11 text-[1rem] bg-[#28dbd1] rounded font-semibold cursor-pointer">
                <p>Connect</p>
                <FaWallet size={20} />
            </div>
          </div>
          <div className="block md:hidden text-white">
            <GiHamburgerMenu size={25} />
          </div>
        </div>
      </header>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="relative bg-[#0a1f2f] text-white font-body rounded-t">
          <div className="flex justify-center">
            <h3 className="font-bold text-2xl">Connect Your Wallet</h3>
          </div>
          <div onClick={onClose} className="absolute -right-2 -top-2 bg-[#28dbd1]/50 hover:bg-[#28dbd1]/80 text-black w-8 h-8 rounded-lg flex justify-center items-center cursor-pointer">
            <MdClear size={25} />
          </div>
        </ModalHeader>
        <ModalBody className="bg-[#0a1f2f] text-white font-body rounded-b">
          <div className="space-y-6 pb-6 pt-10">
            <p className="text-center px-10 text-lg text-white/80 font-medium">Please select a wallet from below to connect for Launching your IGO's</p>
            <div className="flex justify-between items-center">
              <div className="cursor-pointer border-2 border-gray-600 rounded-full hover:border-[#28dbd1]">
                <img className="w-16 h-16 rounded-full" src="https://demo.thetork.com/html/torkgo/assets/images/wallet/metamask.svg" />
              </div>
              <div className="cursor-pointer border-2 border-gray-600 rounded-full hover:border-[#28dbd1]">
                <img className="w-16 h-16 rounded-full" src="https://demo.thetork.com/html/torkgo/assets/images/wallet/coinbase.svg" />
              </div>
              <div className="cursor-pointer border-2 border-gray-600 rounded-full hover:border-[#28dbd1]">
                <img className="w-16 h-16 rounded-full" src="https://demo.thetork.com/html/torkgo/assets/images/wallet/bitski.svg" />
              </div>
              <div className="cursor-pointer border-2 border-gray-600 rounded-full hover:border-[#28dbd1]">
                <img className="w-16 h-16 rounded-full" src="https://demo.thetork.com/html/torkgo/assets/images/wallet/venly.svg" />
              </div>
              <div className="cursor-pointer border-2 border-gray-600 rounded-full hover:border-[#28dbd1]">
                <img className="w-16 h-16 rounded-full" src="https://demo.thetork.com/html/torkgo/assets/images/wallet/wallet-connect.svg" />
              </div>
            </div>
            <div className="text-center text-white/80 text-lg font-semibold">By connecting your wallet, you agree to our <span className="text-[#28dbd1]">Terms of Service </span>and our <span className="text-[#28dbd1]">Privacy Policy</span> .</div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  )
}
