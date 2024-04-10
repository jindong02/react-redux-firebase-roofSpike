import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md'; // Importing the arrow icon


import '../index.css'



const Commercial = () => {
  const [messageClass, setMessageClass] = useState('');
  const [showGenerateLeadsButton, setShowGenerateLeadsButton] = useState(false);

  const [selectedRoof, setSelectedRoof] = useState(null);
  const [showRoofOptions, setShowRoofOptions] = useState(false); // Initialized state
  const [stormAffected, setStormAffected] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [showCityQuestion, setShowCityQuestion] = useState(false);
  const [showLocationQuestions, setShowLocationQuestions] = useState(false); // Initialized state
  const cityQuestionRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [showSquareFootageOptions, setShowSquareFootageOptions] = useState(false);
  const [selectedSquareFootage, setSelectedSquareFootage] = useState(null);
  const [showPaidPlanMessage, setShowPaidPlanMessage] = useState(false);

  const [filteredCities, setFilteredCities] = useState([]);

  // Define the mapping of states to their respective cities
  const citiesByState = {
    Florida: ['Tampa', 'Jacksonville'],
    Louisiana: ['Baton Rouge', 'Lafayette'],
    Oklahoma: ['Norman', 'Sherman']
  };

  // Effect to update city options when state changes
  useEffect(() => {
    if (state && citiesByState[state]) {
      setFilteredCities(citiesByState[state]);
    } else {
      setFilteredCities([]);
    }
  }, [state]);

 
  const [filteredStates, setFilteredStates] = useState([]);

  // Define the allowed states
  const states = ['Florida', 'Oklahoma', 'Louisiana'];


  useEffect(() => {
    if (selectedRoof && bottomRef.current) {
      // If a roof is selected, scroll to bottomRef
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (showCityQuestion && cityQuestionRef.current) {
      // If showCityQuestion is true, scroll to cityQuestionRef
      cityQuestionRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  }, [selectedRoof, showCityQuestion]); 
  

  const handleSelection = (optionLabel) => {
    setSelectedOption(optionLabel);
    setShowSquareFootageOptions(true);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
    // You may perform additional actions here, such as navigating to another page or showing the next question
  };

  const handleSquareFootageSelection = (squareFootage) => {
    setSelectedSquareFootage(squareFootage);
    setShowRoofOptions(true); 

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  const options = [
    { label: 'flat', imgName: 'option3' },
    { label: 'metal', imgName: 'option1' },
    { label: 'Multifamily', imgName: 'Multifam' }
  ];

  const showNextQuestion = (question) => {
    if (question === 'city') {
      setShowCityQuestion(true);
    }
  };

  const handleCitySelect = (cityName) => {
    setCity(cityName);
    setFilteredCities([]);
    setShowGenerateLeadsButton(true); // Show the button instead of navigating directly
  };
  

  const handleStormAffectedChange = (value) => {
    setStormAffected(value);
    setShowLocationQuestions(true);
    setShowCityQuestion(false); // Initially hide the city question
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  const goToLeadsScreen = () => {
    if (state && city) {
      navigate('/leads', {
        state: {
          queryState: state,
          queryCity: city,
          queryRoofType: selectedOption,
          querySquareFootage: selectedSquareFootage,
          queryPropertyType: 'commercial'
        }
      });
    }
  };
  

  return (


    <div className="flex flex-col items-center min-h-screen bg-black p-4">
      <div className="flex flex-col items-center justify-center mt-12 mb-12 text-center">
        <img src="/roofspike.jpg" alt="RoofSpike AI Logo" className="w-64 sm:w-72" />
      </div>

      <h1 className="text-orange-500 text-3xl font-bold mb-8 text-center">Select Your Preferences To Unlock 5 Premium Commercial Leads for Free</h1>

      <p className="text-lg text-white font-bold mb-5 text-center">What type of roof are you interested in?</p>

       <div className="grid grid-cols-3 gap-4">
          {options.map((option) => (
            <div key={option.label} className={`relative ${option.label === 'Multifamily' ? 'group' : ''}`}>
              <button 
                className={`flex flex-col items-center cursor-pointer p-4 border-2 transition-all ${selectedOption === option.label ? 'border-orange-600 scale-110' : 'border-white hover:border-orange-600 hover:scale-110'} ${option.label === 'Multifamily' ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => option.label !== 'Multifamily' && handleSelection(option.label)}
                disabled={option.label === 'Multifamily'}
              >
                <img src={`/${option.imgName}.png`} alt={option.label} className="w-32 h-32 object-contain transition-transform" />
                <div className="text-white mt-2 text-center">
                  <p>{option.label}</p>
                </div>
                {option.label === 'Multifamily' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-xl font-bold py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    Unlock with our paid plans
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>




            {/* Select Roof Type */}

            {showSquareFootageOptions && (
            <div className="mb-2 mt-6">
              <p className="text-lg text-white font-bold mb-5 text-center">
                Select a square footage size for your 
                 {selectedOption 
                  ? ' ' + selectedOption.charAt(0).toLowerCase() + selectedOption.slice(1) + ' '
                  : ''} 
                 roofing leads
              </p>

              <div className="flex justify-center">
                <div className="inline-flex" role="group">
                  
                  <button
                    onClick={() => handleSquareFootageSelection('1k-10k')}
                    className={`rounded-l-3xl px-6 py-2 border-2 transition-all ${selectedSquareFootage === '1k-10k' ? 'bg-orange-600 border-orange-600 text-white' : 'bg-black border-orange-500 text-orange-500 hover:bg-orange-500 hover:border-orange-500 hover:text-white'} focus:outline-none`}
                  >
                    1k-10k
                  </button>
                  
                  <button
                    onClick={() => handleSquareFootageSelection('10-50k')}
                    className={`px-6 py-2 border-2 transition-all ${selectedSquareFootage === '10-50k' ? 'bg-orange-600 border-orange-600 text-white ' : 'bg-black border-orange-500 text-orange-500 hover:bg-orange-500 hover:border-orange-500 hover:text-white'} focus:outline-none`}
                  >
                    10k-50k
                  </button>

                   <button
                      onClick={() => {
                        setShowPaidPlanMessage(true);
                        setMessageClass('fade-in');
                        setTimeout(() => {
                          setMessageClass('fade-out');
                          setTimeout(() => setShowPaidPlanMessage(false), 400); // 500ms for fade-out duration
                        }, 850); // 2 seconds display time
                      }}
                      className={`rounded-r-3xl px-6 py-2 border-2 transition-all ${selectedSquareFootage === '50k' ? 'bg-orange-600 border-orange-600 text-white ' : 'bg-black border-orange-500 text-orange-500 hover:bg-black-500 hover:border-orange-500 hover:text-white'} focus:outline-none`}
                    >
                      50k+
                  </button>
                
                </div>
              </div>
              {showPaidPlanMessage && (
                  <p className={`font-sans message text-center mt-2 font-bold text-red-800 ${messageClass}`}>
                    Unlock with our paid plans
                </p>
                )}
            </div>
          )}



      <div ref={bottomRef}></div>

      {/* Storm Affected Question */}
            {showRoofOptions && (
        <div className="mb-6">
          <p className="text-lg font-bold mt-4 mb-2 text-center text-white">Would you like to locate damaged roofs in storm-impacted areas?</p>
          <div className="flex justify-center">
            <div className="inline-flex overflow-hidden" role="group">
              <button
                onClick={() => handleStormAffectedChange('yes')}
                className={`px-4 py-2 border-2 ${stormAffected === 'yes' ? 'bg-orange-600 border-orange-600 text-white' : 'bg-black border-orange-500 text-orange-500 hover:bg-orange-500 hover:border-orange-500 hover:text-white'} rounded-l-3xl transition-all`}
              >
                Yes
              </button>
              
              <button
                onClick={() => handleStormAffectedChange('no')}
                className={`px-4 py-2 border-2 ${stormAffected === 'no' ? 'bg-orange-600 border-orange-600 text-white' : 'bg-black border-orange-500 text-orange-500 hover:bg-orange-500 hover:border-orange-500 hover:text-white'} rounded-r-3xl transition-all`}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

{showLocationQuestions && (
  <div className="w-3/4 max-w-2xl mx-auto">
    <div className="mb-6 relative">
      <input
        type="text"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
          setFilteredStates(states.filter(state => state.toLowerCase().startsWith(e.target.value.toLowerCase())));
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            showNextQuestion('city');
          }
        }}
        placeholder="Enter state for lead search"
        className="w-full pl-3 pr-10 py-2 bg-black text-orange-500 border border-orange-500 rounded focus:outline-none focus:border-orange-700"
      />
      {state && <ul className="absolute z-10 w-full bg-black text-white">
        {filteredStates.map(s => (
          <li 
            key={s} 
            className="px-3 py-2 hover:bg-orange-500 hover:text-black cursor-pointer"
            onClick={() => {
              setState(s);
              setFilteredStates([]);
              showNextQuestion('city'); // Proceed to the next question when a state is clicked
            }}
          >
            {s}
          </li>
        ))}
      </ul>}
      <button 
        type="button" 
        className="absolute inset-y-0 right-0 px-3 flex items-center text-orange-500 hover:text-orange-700" 
        onClick={() => showNextQuestion('city')}
      >
        <MdArrowForward size="1.5em" />
      </button>
    </div>
  </div>
)}




<div ref={bottomRef}></div>

            {/* City Question */}
      
            {showCityQuestion && (
        <div ref={cityQuestionRef} className="w-3/4 max-w-2xl mx-auto">
          <div className="mb-6 relative">
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                const matchingCities = citiesByState[state]?.filter(c => c.toLowerCase().startsWith(e.target.value.toLowerCase())) || [];
                setFilteredCities(matchingCities);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setShowGenerateLeadsButton(true);
                }
              }}
              placeholder="Enter city & view your leads"
              className="w-full pl-3 pr-10 py-2 bg-black text-orange-500 border border-orange-500 rounded focus:outline-none focus:border-orange-700"
            />
            {city && <ul className="absolute z-10 w-full bg-black text-white">
              {filteredCities.map(c => (
                <li 
                  key={c} 
                  className="px-3 py-2 hover:bg-orange-500 hover:text-black cursor-pointer"
                  onClick={() => {
                    handleCitySelect(c)
                    //goToLeadsScreen(); // Trigger goToLeadsScreen when a city is selected
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>}
            <button 
          type="button" 
          className="absolute inset-y-0 right-0 px-3 flex items-center text-orange-500 hover:text-orange-700" 
          onClick={() => setShowGenerateLeadsButton(true)}
        >
          <MdArrowForward size="1.5em" />
        </button>

          </div>
        </div>
      )}

        {showGenerateLeadsButton && (
          <div className="text-center mt-4">
            <button
              onClick={goToLeadsScreen}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mx-auto"
            >
              Generate Leads
            </button>
          </div>
        )}

       <div className="text-center pt-10 pb-10 w-full"> {/* Adjust the padding-bottom as needed */}
        <p className="text-white font-sans text-s">
          &copy; 2023 RoofSpike AI, all rights reserved.
        </p>
      </div>

          </div>
  );
};

export default Commercial;