import React from 'react'
import Footer from '../../components/Footer'


export default function Generate() {
    return (
        <div className="w-full bg-[#02121d]">
            <div style={{ backgroundImage: `url(https://demo.thetork.com/html/torkgo/assets/images/header/bg.jpg)` }} className="h-[20rem] w-screen flex flex-col items-center justify-center font-body text-white space-y-6">
                <h1 className="text-5xl font-bold">Generate</h1>
                <p className="text-lg text-white/80">Home - Generate</p>
            </div>
            <div className="container mx-auto px-20 py-20 text-white font-body">
                <div className="w-2/5 mx-auto bg-[#0a1f2f] rounded p-6 space-y-6">
                    <div className="space-y-2">
                        <p className="font-medium text-white/80">Original Token Address</p>
                        <input className="bg-[#02121d] rounded w-full h-12 px-3 focus:outline-none" placeholder="0xAb..." />
                    </div>
                    <div className="space-y-2">
                        <p className="font-medium text-white/80">Upgraded Token Name</p>
                        <input className="bg-[#02121d] rounded w-full h-12 px-3 focus:outline-none" placeholder="Ethereum" />
                    </div>
                    <div className="space-y-2">
                        <p className="font-medium text-white/80">Upgraded Token Symbol</p>
                        <input className="bg-[#02121d] rounded w-full h-12 px-3 focus:outline-none" placeholder="ETH" />
                    </div>
                    <div className="space-y-2">
                        <p className="font-medium text-white/80">Admin Address</p>
                        <input className="bg-[#02121d] rounded w-full h-12 px-3 focus:outline-none" placeholder="0x9e30a576f8dc62d76d01ad88ace3364..." />
                    </div>
                    <div className="w-full flex justify-center items-center rounded bg-blue-500 hover:bg-blue-600 cursor-pointer h-10 font-semibold">Generate Token</div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
