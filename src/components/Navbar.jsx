import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-2">
                <div className="logo font-bold text-xl">
                    <span className='text-green-700'> &lt;</span>
                    My
                    <span className='text-green-700'>Pass/&gt;</span>
                    </div>
                
                <button className="github flex items-center gap-2 bg-slate-950 rounded-xl py-1 px-2 ring-white ring-1 hover:bg-slate-800 duration-200">
                    <img src="./github.svg" alt="" />
                    Github
                </button>
            </div>
        </nav>
    )
}

export default Navbar
