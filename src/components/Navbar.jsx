import React, { useContext } from 'react'
import { UserButton, useClerk, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openSignIn, signOut } = useClerk(); // Import signOut function
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const {setShowRecruiterLogin,open} = useContext(AppContext)

  console.log(open)
  return (
    <div className="shadow-lg py-4 flex justify-between items-center">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="logo"
          className="w-22 cursor-pointer h-auto sm:w-28 md:w-35 lg:w-35"
        />

        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <Link
              to="/applications"
              className="text-gray-700 hover:text-blue-600"
            >
              Applied Jobs
            </Link>
            <p>|</p>
            <p className="max-sm:hidden">
              Hi, {user.firstName} {user.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 mx-sm:text-sm">
            <button
              onClick={(e) => setShowRecruiterLogin(true)}
              className="text-gray-600 cursor-pointer"
            >
              Recruiter Login
            </button>
            <button
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer hover:bg-blue-700"
              onClick={() => openSignIn()}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
