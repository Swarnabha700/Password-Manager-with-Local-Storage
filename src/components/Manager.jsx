import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { FaRegEdit } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const passwordRef = useRef()
    const ref = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("hide.svg")) {
            ref.current.src = "./show.svg"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "./hide.svg"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            toast('Password Saved Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setForm({ site: "", username: "", password: "" });
        }
        else{
            toast("Please enter valid inputs!");
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this entry? ")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
    }

    const editPassword = (id) => {
        console.log("Editing password: ", id)
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)

    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
            <div className="px-2 md:px-0 md:mycontainer min-h-[84.5vh]">
                <h1 className='text-3xl font-bold text-center'>
                    <span className='text-green-600'> &lt;</span>
                    My
                    <span className='text-green-600'>Pass/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center mt-2'>Easy to handle Password Manager</p>
                <div className='flex flex-col p-4 gap-5'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-600 w-full px-4 py-1' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full gap-6 justify-between">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-600 w-full px-4 py-1' type="text" name='username' id='username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-600 w-full px-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-1 top-1 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} src="./show.svg" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='mx-auto flex justify-center gap-2 items-center bg-green-500 rounded-full px-4 py-1 w-fit hover:bg-green-400 duration-200 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-xl py-3 pt-1'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No Passwords to Show</div>}
                    {passwordArray.length !== 0 && <>
                        <table className="table-auto w-full rounded-md overflow-hidden mb-7">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Sites</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Passwords</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className="LordIconCopy cursor-pointer size-7" onClick={() => copyText(item.site)}>
                                                    <lord-icon
                                                        style={{ "width": "20px", "height": "25px", "paddingTop": "2px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.username}</span>
                                                <div className="LordIconCopy cursor-pointer size-7" onClick={() => copyText(item.username)}>
                                                    <lord-icon
                                                        style={{ "width": "20px", "height": "25px", "paddingTop": "2px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center'>
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div className="LordIconCopy cursor-pointer size-7" onClick={() => copyText(item.password)}>
                                                    <lord-icon
                                                        style={{ "width": "20px", "height": "25px", "paddingTop": "2px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center gap-3'>
                                                <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}><FaRegEdit size={17} /></span>
                                                <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}><lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "25px", "paddingTop": "3px" }}>

                                                </lord-icon></span>
                                            </div>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </>}
                </div>
            </div>
        </>

    )
}

export default Manager
