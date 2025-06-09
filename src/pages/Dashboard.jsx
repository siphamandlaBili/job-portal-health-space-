import  React,{ useContext, useState} from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const Dashboard = () => {

    const navigate = useNavigate();
    const [tooltip, setTooltip] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

    const handleTooltip = (name) => {
        if (window.innerWidth <= 640) { // Apply only on small screens
            setTooltip(name);
            setShowTooltip(true);
            setTimeout(() => {
                setShowTooltip(false);
            }, 1000);
        }
    };

    // Function to handle logout
    const logout = () => {
        setCompanyToken(null);
        localStorage.removeItem('companyToken');
        setCompanyData(null);
        navigate('/')  
    }

    useEffect(() => {
        if(companyData){
            navigate('/dashboard/manage-jobs')
        }
    },[companyData])

    return (
        <div className='min-h-screen'>
            {/* navbar for recruiter panel */}
            <div className='shadow py-4'>
                <div className='px-5 flex justify-between items-center'>
                    <img onClick={() => navigate('/')} src={assets.logo} className="w-22 max-sm:w-32 cursor-pointer h-auto sm:w-28 md:w-35 lg:w-35" alt="" />
                    {companyData && (
                      <div className='flex items-center gap-3'>
                        <p className='max-sm:hidden'> Welcome, {companyData.name} </p>
                        <div className='relative group'>
                          <img className='w-8 border-gray rounded-full' src={companyData.image} alt="Company Logo" />
                          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                            <ul className='list-none m-0 bg-white rounded-md border-white text-sm'>
                              <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>logout</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    
                </div>
            </div>

            {/* sidebar with add job, manage job, view jobs buttons and render on right from outlet */}
            <div className='flex items-start'>
                {/* left side */}
                <div className='inline-block min-h-screen border-3 border-[#eeeeee]'>
                    <ul className='flex flex-col items-start pt-5 text-gray-800'>
                        {['add-job', 'manage-jobs', 'view-applications'].map((item, index) => (
                            <NavLink 
                                key={item}
                                className={({ isActive }) => `relative flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} 
                                to={`/dashboard/${item}`}
                                onClick={() => handleTooltip(item)}
                            >
                                <img className='min-w-4' src={
                                    item === 'add-job' ? assets.add_icon :
                                    item === 'manage-jobs' ? assets.home_icon :
                                    assets.person_tick_icon
                                } alt="" />
                                <p className='max-sm:hidden'>{
                                    item === 'add-job' ? 'Add Job' :
                                    item === 'manage-jobs' ? 'Manage Jobs' :
                                    'View Applications'
                                }</p>
                                {tooltip === item && showTooltip && (
                                    <span className='absolute left-full ml-2 bg-gray-800 text-white text-xs rounded px-2 py-1 fade-out'>
                                        {
                                            item === 'add-job' ? 'Add Job' :
                                            item === 'manage-jobs' ? 'Manage Jobs' :
                                            'View Applications'
                                        }
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </ul>
                </div>
                {/* right side */}
                <div className='flex-1 h-full p-2 sm:p-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;