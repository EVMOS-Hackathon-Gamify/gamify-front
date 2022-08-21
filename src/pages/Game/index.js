import React from 'react'

import game1 from '../../assets/images/game1.png'
import img1 from '../../assets/images/img1.jpg'
import littleImg1 from '../../assets/images/littleImg1.png'
import titleImg2 from '../../assets/images/titleImg2.png'
import Footer from '../../components/Footer';
import GameCard from '../Home/components/GameCard';


export default function GamePage() {
    return (
        <div className="w-full bg-[#02121d] text-white font-body">
            <div style={{ backgroundImage: `url(https://demo.thetork.com/html/torkgo/assets/images/header/bg.jpg)` }} className="h-[20rem] w-screen flex flex-col items-center justify-center font-body text-white space-y-6">
                <h1 className="text-5xl font-bold">Games</h1>
                <p className="text-lg text-white/80">Home - Games</p>
            </div>
            <div className="container mx-auto px-20 py-28 flex justify-between space-x-10">
                <div className="w-1/3 h-[35rem] bg-[#0a1f2f]">
                    <GameCard slug={"stick-hero"} bgImage={game1} titleImage={littleImg1} gameName="Stick Hero" txt1="Public" txt2="42" txt3="TBA" />
                </div>
                <div className="w-1/3 h-[35rem] bg-[#0a1f2f]">
                    <GameCard slug={"football"} bgImage={img1} titleImage={titleImg2} gameName="Football" txt1="Public" txt2="42" txt3="TBA" />
                </div>
                <div className="w-1/3">
                </div>
            </div>
            <Footer />
        </div>
    )
}
