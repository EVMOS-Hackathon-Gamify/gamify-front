import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { BiWindows } from 'react-icons/bi'
import { FaProjectDiagram, FaRoad, FaUserAstronaut } from 'react-icons/fa'

import Footer from '../../components/Footer';


export default function GamePage() {

    let { gameId } = useParams()

    return (
        <div className="w-full bg-[#02121d] text-white font-body">
            <div style={{ backgroundImage: `url(https://demo.thetork.com/html/torkgo/assets/images/header/bg.jpg)` }} className="h-[20rem] w-screen flex flex-col items-center justify-center font-body text-white space-y-6">
                <h1 className="text-5xl font-bold">Game {gameId}</h1>
                <p className="text-lg text-white/80">Home - Game Details</p>
            </div>
            <div className="container mx-auto px-20 py-28 space-y-20">
                <div className="w-full rounded bg-[#0a1f2f] p-10 flex space-x-20 items-stretch">
                    <div className="w-3/5 flex flex-col space-y-8">
                        <div className="flex items-start space-x-6">
                            <img className="w-24 h-24 rounded border border-white/50" src="https://demo.thetork.com/html/torkgo/assets/images/igo/author/1.png" />
                            <div className="flex flex-col space-y-3">
                                <h3 className="text-2xl font-bold">Battle Zone (Bzon)</h3>
                                <p className="font-medium text-lg text-white/80">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus 
                                    obcaecati quas ex, praesentium omnis cum, corrupti repudiandae placeat 
                                    sapiente sit exercitationem mollitia veniam illum. Autem nobis aliquid 
                                    provident illo ad.
                                </p>
                            </div>
                        </div>
                        <div className="space-x-8">
                            <button className="bg-[#28dbd1] text-[#0a1f2f] hover:text-[#28dbd1] hover:border-[#28dbd1] hover:skew-x-0 duration-300 border border-transparent hover:bg-[#0a1f2f] font-semibold h-10 px-4 rounded -skew-x-6">
                                Claim Token
                            </button>
                            <button className="border-[#28dbd1] text-[#28dbd1] hover:text-[#28dbd1] hover:border-[#28dbd1] hover:skew-x-0 duration-300 border border-transparent hover:bg-[#0a1f2f] font-semibold h-10 px-4 rounded -skew-x-6">
                                Register Now
                            </button>
                        </div>
                    </div>
                    <div className="w-2/5 bg-[#28dbd1]/20 rounded p-6 flex flex-col space-y-4">
                        <div className="flex justify-between space-x-4">
                            <div className="flex-1 flex flex-col bg-[#0a1f2f] p-3 rounded">
                                <span className="text-[#28dbd1] text-sm font-semibold">Total Supply</span>
                                <p className="font-bold text-lg">1,000,000,000 Bzon </p>
                            </div>
                            <div className="flex-1 flex flex-col bg-[#0a1f2f] p-3 rounded">
                                <span className="text-[#28dbd1] text-sm font-semibold">Total Supply</span>
                                <p className="font-bold text-lg">1,000,000,000 Bzon </p>
                            </div>
                        </div>
                        <div className="flex justify-between space-x-4">
                            <div className="flex-1 flex flex-col bg-[#0a1f2f] p-3 rounded">
                                <span className="text-[#28dbd1] text-sm font-semibold">Total Supply</span>
                                <p className="font-bold text-lg">1,000,000,000 Bzon </p>
                            </div>
                            <div className="flex-1 flex flex-col bg-[#0a1f2f] p-3 rounded">
                                <span className="text-[#28dbd1] text-sm font-semibold">Total Supply</span>
                                <p className="font-bold text-lg">1,000,000,000 Bzon </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-start justify-between space-x-10">
                    <div className="w-1/3 flex flex-col space-y-6">
                        <div className="flex flex-col bg-[#0a1f2f] rounded">
                            <div className="flex items-center space-x-3 py-3 px-5 bg-[#28dbd1] rounded-t text-black">
                                <BiWindows size={20} />
                                <p className="font-semibold">About</p>
                            </div>
                            <div className="flex items-center space-x-3 py-3 px-5 text-white">
                                <FaProjectDiagram size={20} />
                                <p className="font-semibold">Token</p>
                            </div>
                            <div className="flex items-center space-x-3 py-3 px-5 text-white">
                                <FaRoad size={20} />
                                <p className="font-semibold">Roadmap</p>
                            </div>
                            <div className="flex items-center space-x-3 py-3 px-5 rounded-b text-white">
                                <FaUserAstronaut size={20} />
                                <p className="font-semibold">Backers</p>
                            </div>
                        </div>
                        <div className="bg-[#0a1f2f] py-3 px-5 font-semibold text-xl">
                            Social Media
                        </div>
                    </div>
                    <div className="w-2/3 space-y-10">
                        <div className="bg-[#0a1f2f]/50 p-8 space-y-6">
                            <h2 className="font-semibold text-2xl">About TorkGo</h2>
                            <p className="font-medium text-lg text-white/80">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio animi, id ducimus eum tempora 
                                minus labore saepe fuga eius dolor non veritatis excepturi perferendis molestiae nulla quia officiis 
                                sunt soluta. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum 
                                dolores alias aliquid iusto eaque perferendis.
                            </p>
                            <img className="w-full rounded" src="https://demo.thetork.com/html/torkgo/assets/images/blog/single/01.jpg" />
                            <h3 className="font-semibold text-xl">Metaverse</h3>
                            <p className="font-medium text-lg text-white/80">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, debitis tenetur dolorem a ab 
                                voluptas dolore nesciunt saepe optio amet temporibus ipsum beatae est quisquam.
                            </p>
                            <img className="w-full rounded" src="https://demo.thetork.com/html/torkgo/assets/images/blog/single/02.jpg" />
                        </div>
                        <div className="bg-[#0a1f2f]/50 p-8 space-y-6">
                            <h2 className="font-semibold text-2xl">TorkGo Token Details</h2>
                            <p className="font-medium text-lg text-white/80">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio animi, id ducimus eum
                                 tempora minus labore saepe fuga eius dolor non veritatis excepturi perferendis molestiae 
                                 nulla quia officiis sunt soluta. Lorem ipsum, dolor sit amet consectetur adipisicing 
                                 elit. Laborum dolores alias aliquid iusto eaque perferendis.
                            </p>
                            <img className="w-full rounded" src="https://demo.thetork.com/html/torkgo/assets/images/blog/single/05.jpg" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
