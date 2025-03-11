import React,{useState,useEffect} from 'react'
import { FaUserMd, FaHospital, FaHeartbeat, FaSyringe, FaStethoscope } from "react-icons/fa";

const Loading = () => {
      const icons = [FaUserMd, FaHospital, FaHeartbeat, FaSyringe, FaStethoscope];
      const [currentIconIndex, setCurrentIconIndex] = useState(0);

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        }, 1000);
        return () => clearInterval(interval); // Cleanup
    }, []);
    const CurrentIcon = icons[currentIconIndex];
  return (
    <div className='min-h-screen flex items-center justify-center'>
    <div className="w-20 h-20 flex items-center justify-center text-blue-500 animate-pulse">
      <CurrentIcon size={80} />
    </div>
  </div>
  )
}

export default Loading
