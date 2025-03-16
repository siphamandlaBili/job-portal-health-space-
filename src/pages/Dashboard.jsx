import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen'>
            {/* navbar for recruiter panel */}
            <div className='shadow py-4'>
                <div className='px-5 flex justify-between items-center'>
                    <img onClick={() => navigate('/')} src={assets.logo} className="w-22 max-sm:w-32 cursor-pointer h-auto sm:w-28 md:w-35 lg:w-35" alt="" />
                    <div className='flex items-center gap-3' >
                        <p className='max-sm:hidden'> Welcome, Azile Bili</p>
                        <div className='relative group' >
                            <img className='w-8 border-gray rounded-full' src={assets.company_icon} alt="" />
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                <ul className='list-none m-0 bg-white rounded-md border-white text-sm'>
                                    <li className='py-1 px-2 cursor-pointer pr-10' >logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*side bar with add job,manage job,view jobs buttons andd render on right from outlet */}
            <div className='flex items-start'>
                {/* left side  */}
                <div className='inline-block min-h-screen border-3 border-[#eeeeee]'>
                    <ul className='flex flex-col items-start pt-5 text-gray-800'>
                        <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to='/dashboard/add-job'>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Job</p>
                        </NavLink>

                        <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to='/dashboard/manage-jobs'>
                        <img src={assets.home_icon} alt="" />
                        <p>Manage Jobs</p>
                        </NavLink>

                        <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to='/dashboard/view-applications'>
                        <img src={assets.person_tick_icon} alt="" />
                        <p>View Applications</p>
                        </NavLink>
                    </ul>
                </div>
                {/* right side */}
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
