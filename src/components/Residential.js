import React, { useState, useRef, useEffect } from 'react';
import { MdArrowForward } from "react-icons/md"; // Importing the arrow icon
import { useNavigate } from "react-router-dom";

const Residential = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [showCityQuestion, setShowCityQuestion] = useState(false);
  const [showStormQuestion, setShowStormQuestion] = useState(false);
  const [stormAffected, setStormAffected] = useState(""); // 'yes' or 'no'
  const [showLocateLeadsButton, setShowLocateLeadsButton] = useState(false);
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const cityQuestionRef = useRef(null);

  const states = ["Florida", "Oklahoma", "Louisiana"];

  const citiesByState = {
    Florida: ["Tampa", "Jacksonville"],
    Louisiana: ["Baton Rouge", "Lafayette"],
    Oklahoma: ["Norman", "Sherman"],
  };

  const handleStateChange = (e) => {
    const inputState = e.target.value;
    setState(inputState);
    setFilteredStates(
      states.filter((s) => s.toLowerCase().startsWith(inputState.toLowerCase()))
    );
    if (!states.includes(inputState)) {
      setShowCityQuestion(false);
    }
  };

  useEffect(() => {
    if (state && citiesByState[state]) {
      setFilteredCities(citiesByState[state]);
    } else {
      setFilteredCities([]);
    }
  }, [state]);

  const navigate = useNavigate(); // Hook for navigation

  const handleKeyPress = (event, nextQuestion) => {
    if (event.key === "Enter") {
      showNextQuestion(nextQuestion);
    }
  };

  const showNextQuestion = (question) => {
    if (question === "city" && state) {
      setShowCityQuestion(true);
    } else if (question === "storm" && city) {
      setShowStormQuestion(true);
    } else if (question === "leads" && stormAffected) {
      setShowLocateLeadsButton(true);
    }
  };

  const goToLeadsScreen = () => {
    if (state && city) {
      navigate('/leads', {
        state: {
          queryState: state,
          queryCity: city,
          queryPropertyType: 'residential'
        }
      });
    }
  };

  const handleCityChange = (e) => {
    const inputCity = e.target.value;
    setCity(inputCity);
    const matchingCities =
      citiesByState[state]?.filter((c) =>
        c.toLowerCase().startsWith(inputCity.toLowerCase())
      ) || [];
    setFilteredCities(matchingCities);
  };
  const handleStormAffectedChange = (value) => {
    setStormAffected(value);
    setShowLocateLeadsButton(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <img
          src="/roofspike.jpg"
          alt="RoofSpike AI Logo"
          className="w-64 sm:w-72"
        />
      </div>

      <h1 className="text-orange-500 text-3xl font-bold mb-2 text-center">
        Unlock 5 Premium Residential Leads for Free
      </h1>
      <p className="text-orange-500 text-1xl font-bold mt-0 mb-8 text-center">
        Enter your preferences to access in-depth property insights.
      </p>
      <form
        className="w-full max-w-lg text-white"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* State Question */}
      
  <div className="w-full max-w-3xl mx-auto">
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
        placeholder="Specify the state for premium leads"
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


  {showCityQuestion && (
        <div ref={cityQuestionRef} className="w-full max-w-3xl mx-auto">
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
                  showNextQuestion('storm');
                }
              }}
              placeholder="Enter city and view your premium leads"
              className="w-full pl-3 pr-10 py-2 bg-black text-orange-500 border border-orange-500 rounded focus:outline-none focus:border-orange-700"
            />
            {city && <ul className="absolute z-10 w-full bg-black text-white">
              {filteredCities.map(c => (
                <li 
                  key={c} 
                  className="px-3 py-2 hover:bg-orange-500 hover:text-black cursor-pointer"
                  onClick={() => {
                    setCity(c);
                    setFilteredCities([]);
                    showNextQuestion('storm');
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
              onClick={() => showNextQuestion('storm')}
            >
              <MdArrowForward size="1.5em" />
            </button>
          </div>
        </div>
      )}


        {/* Storm Affected Question */}
        {showStormQuestion && (
          <div className="mb-6">
            <p className="text-lg font-bold mb-2 text-center">
              Would you like to view residential properties affected by storms?
            </p>
            <div className="flex justify-center space-x-4">
              {" "}
              {/* Flex container with spacing */}
              <div className="flex justify-center">
                <div className="inline-flex overflow-hidden" role="group">
                  <button
                    onClick={() => handleStormAffectedChange("yes")}
                    className={`px-4 py-2 border-2 ${
                      stormAffected === "yes"
                        ? "bg-orange-600 border-orange-600 text-white"
                        : "bg-black border-orange-500 text-orange-500 hover:bg-orange-500 hover:border-orange-500 hover:text-white"
                    } rounded-l-3xl transition-all`}
                  >
                    Yes
                  </button>

                  <button
                    onClick={() => handleStormAffectedChange("no")}
                    className={`px-4 py-2 border-2 ${
                      stormAffected === "no"
                        ? "bg-orange-600 border-orange-600 text-white"
                        : "bg-black border-orange-500 text-orange-500 hover:bg-orange-500 hover:border-orange-500 hover:text-white"
                    } rounded-r-3xl transition-all`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generate Leads Button */}
        {showLocateLeadsButton && (
          <div className="flex justify-center mt-4">
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              onClick={goToLeadsScreen}
            >
              Generate Leads
            </button>
          </div>
        )}
      </form>
      <div className="text-center pt-10 pb-10 w-full"> {/* Adjust the padding-bottom as needed */}
        <p className="text-white font-sans text-s">
          &copy; 2023 RoofSpike AI, all rights reserved.
        </p>
      </div>
    </div>
  );
};
export default Residential;
