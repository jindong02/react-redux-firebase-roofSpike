import React from 'react';
import { useParams } from 'react-router-dom';
import leadsData from '../data/leads.json';

const PropertyReport = () => {
  const { propertyId } = useParams();
  const property = leadsData.find(lead => lead.id === Number(propertyId));

  const handlePrint = () => {
    window.print();
  };


  if (!property) {
    return <div className='text-white'>Property not found</div>;
  }

  return (
        <>
       <div className="flex flex-col items-center justify-center mt-12 mb-12 text-center">
          <img src="/roofspike.jpg" alt="RoofSpike AI Logo" className="w-64 sm:w-72" />
        </div>
        <h1 className="text-white text-3xl font-bold mb-35 text-center">Property Report</h1>

        <div className="flex flex-col md:flex-row items-center justify-center w-full my-4 md:my-8">

        <div className="flex-1 flex justify-center items-center mb-4 md:mb-0">
            <img src={property.roofPicture} alt="Roof" className="w-64 h-64 md:w-3/4 md:h-3/4 object-cover" />
        </div>
     
            <div className="flex-1 flex flex-col items-start px-4">
            <h2 className="text-lg text-white mb-2 font-sans">Address: {property.address}</h2>
            <h2 className="text-lg text-white mb-2 font-sans">Owner: {property.owner}</h2>
            <h2 className="text-lg text-white mb-2 font-sans">Emails: {property.emails.join(', ')}</h2>
            <h2 className="text-lg text-white mb-2 font-sans">Position: {property.positionTitle}</h2>
            <h2 className="text-lg text-white mb-2 font-sans">Roof Square Ft: {property.squareFt}</h2>
            <h2 className="text-sm text-orange-500 mb-2 font-sans"><a href="https://roofspike.ai/contact" className="orange-button" target="_blank" rel="noopener noreferrer">
            Unlock More Property Insights and Data Integrations
            </a></h2>
            {/* Display other property details */}
            </div>
           
            </div>


            <div className="text-center pt-10 pb-10 w-full"> {/* Adjust the padding-bottom as needed */}
        <p className="text-white font-sans text-s">
          &copy; 2023 RoofSpike AI, all rights reserved.
        </p>
      </div>

        </>
    );
        
};
   

export default PropertyReport;