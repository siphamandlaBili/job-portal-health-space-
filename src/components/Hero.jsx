import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext);

    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const onSearch = () =>{
      setSearchFilter({
        title: titleRef.current.value,
        location: locationRef.current.value
      })
      setIsSearched(true);

      console.log({title: titleRef.current.value, location: locationRef.current.value})
    }
    return (
        <>
            <div className="relative container 2xl:px-20 mx-auto my-7">
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-[url('https://www.aflumed.co.za/wp-content/uploads/2024/03/AfluMed-Logo-11-1536x1119.png')] bg-contain bg-center bg-no-repeat opacity-40 z-20"
                ></div>

                {/* Content */}
                <div className="relative bg-gradient-to-r from-purple-800 to-purple-950 text-white p-16 text-center mx-2 rounded-xl">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                        Over 100+ jobs to apply
                    </h2>
                    <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
                        Advance Your Medical Career – Discover Top Job Opportunities and Take
                        the Next Step Toward Your Future
                    </p>

                    {/* Search Box */}
                    <div className="relative z-50 flex flex-col sm:flex-row items-center justify-between bg-white rounded text-gray-600 max-w-xl mx-auto p-2">
                        <div className="flex items-center w-full sm:w-auto border-b sm:border-none">
                            <img className="h-4 sm:h-5 mr-2" src={assets.search_icon} alt="Search" />
                            <input
                                className="text-xs sm:text-sm p-2 rounded outline-none w-full"
                                type="text"
                                ref={titleRef}
                                placeholder="Search for jobs"
                                aria-label="Search for jobs"
                            />
                        </div>

                        <div className="flex items-center w-full sm:w-auto border-b sm:border-none sm:ml-4">
                            <img className="h-4 sm:h-5 mr-2" src={assets.location_icon} alt="Location" />
                            <input
                                className="text-xs sm:text-sm p-2 rounded outline-none w-full"
                                type="text"
                                ref={locationRef}
                                placeholder="Location"
                                aria-label="Enter job location"
                            />
                        </div>

                        <button onClick={onSearch} className="bg-blue-600 px-6 py-2 rounded text-white m-1 cursor-pointer sm:ml-4">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {/* Advertisement Space */}
            <div className="container 2xl:px-20 mx-auto my-10 py-4 bg-light-gray-100 border border-gray-300 shadow-lg flex items-center justify-center rounded">
                <p className="text-lg text-gray-700">Advertisement Space</p>
            </div>

        </>
    );
};

export default Hero;
