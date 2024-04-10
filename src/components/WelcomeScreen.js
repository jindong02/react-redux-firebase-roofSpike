import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen sm: pt-8 bg-stone-900 px-4 pt-16">
      <div className="flex flex-col items-center justify-center mb-12 sm: mb-7 text-center">
        <img src="/roofspike.jpg" alt="RoofSpike AI Logo" className="w-32 sm:w-64" />
      </div>

      <p className="text-white mt-0 mb-8 font-sans text-sm sm:text-2xl text-center">
        Use RoofSpike AI to discover tailored roofing opportunities. Select your desired property type and connect with high-value prospects.
      </p>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-around sm:w-full sm:max-w-7xl">
        {/* Residential Button */}
        <div className="text-center hover:scale-110 transition-transform duration-300 flex flex-col items-center">
          <Link to="/residential" className="rounded-full w-24 h-24 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center overflow-hidden">
            <img src="/R.jpeg" alt="Residential" className="object-cover object-center w-full h-full" />
          </Link>
          <p className="font-sans text-white mt-2 text-lg sm:text-2xl font-black">Residential</p>
        </div>

        {/* Commercial Button */}
        <div className="text-center hover:scale-110 transition-transform duration-300 flex flex-col items-center">
          <Link to="/commercial" className="rounded-full w-24 h-24 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center overflow-hidden">
            <img src="/C.png" alt="Commercial" className="object-cover object-center w-full h-full" />
          </Link>
          <p className="font-sans text-white mt-2 text-lg sm:text-2xl font-black">Commercial</p>
        </div>

        {/* Commercial and Residential Button (Disabled) */}
        <div className="text-center group opacity-50 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center">
          <div className="relative rounded-full w-24 h-24 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center overflow-hidden">
            <img src="/c&r.jpeg" alt="Commercial and Residential" className="object-cover object-center w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-sm sm:text-xl text-white font-bold bg-black bg-opacity-60 py-1 px-3 rounded">Unlock with our paid plans</span>
            </div>
          </div>
          <p className="font-sans text-white mt-2 text-lg sm:text-2xl font-black">Commercial + Residential</p>
        </div>
      </div>

      <div className="text-center pt-10 pb-10 sm: pt-6 w-full">
        <p className="text-white font-sans text-s">
          &copy; 2023 RoofSpike AI, all rights reserved.
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
