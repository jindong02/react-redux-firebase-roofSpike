import React, { useState, useEffect } from "react";
import "./leads.css";
import leadsData from "../data/leads.json";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import { connect } from "react-redux";
import { setLogin } from "../store/actions";

const Leads = ({ isLoggedIn, setLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location.state || {};
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [accountCreated, setAccountCreated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  let logoutTimer;

  useEffect(() => {
    if (isLoggedIn) {
      logoutTimer = setTimeout(() => {
        setLogin(false);
      }, 20 * 60 * 1000); // 20 minutes
    }

    return () => clearTimeout(logoutTimer);
  }, [isLoggedIn, setLogin]);

  const resetTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      setLogin(false);
    }, 20 * 60 * 1000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const hasVisited = localStorage.getItem("hasVisitedLeads") === "true";

    if (!isLoggedIn && !hasVisited) {
      setShowLoginForm(true);
      localStorage.setItem("hasVisitedLeads", "true");
    } else {
      setShowLoginForm(false);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Set an interval for switching messages
    const messageTimer = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 1600);

    // Clear timers when the component unmounts
    return () => clearInterval(messageTimer);
  }, []);

  useEffect(() => {
    // This code will run every time `isLoading` changes.
    // If `isLoading` is false, then setShowLoginForm will be called.
    setShowLoginForm(!isLoading);
  }, [isLoading]);

  const handleRowClick = (propertyId) => {
    navigate(`/property-report/${propertyId}`);
  };

  // Set an interval for switching messages

  const messages = [
    "Preparing your premium leads...",
    "Loading decision-maker contact information...",
  ];

  const handleLoginSuccess = () => {
    setLogin(true);
    setShowLoginForm(false);
    localStorage.setItem("isLoggedIn", "true");

    // Additional logic for successful login (if needed)
  };

  const getFilteredLeads = () => {
    return leadsData
      .filter((lead) => {
        const matchesState = routeState.queryState
          ? lead.state === routeState.queryState
          : true;
        const matchesCity = routeState.queryCity
          ? lead.city === routeState.queryCity
          : true;
        const matchesPropertyType = routeState.queryPropertyType
          ? lead.propertyType === routeState.queryPropertyType
          : true;
        const matchesRoofType = routeState.queryRoofType
          ? lead.roof === routeState.queryRoofType
          : true;

        let matchesSquareFootage = true;
        if (routeState.querySquareFootage) {
          const squareFootageValue = parseFloat(
            lead.squareFt.replace(/[^0-9.]/g, "")
          ); // Removes non-numeric characters and parse to float
          if (routeState.querySquareFootage === "1k-10k") {
            matchesSquareFootage =
              squareFootageValue >= 1000 && squareFootageValue <= 10000;
          } else if (routeState.querySquareFootage === "10k-50k") {
            matchesSquareFootage =
              squareFootageValue > 10000 && squareFootageValue <= 50000;
          }
        }

        return (
          matchesState &&
          matchesCity &&
          matchesPropertyType &&
          (routeState.queryPropertyType === "residential" ||
            (matchesRoofType && matchesSquareFootage))
        );
      })
      .slice(0, 5); // Display only 5 leads
  };

  const filteredLeads = getFilteredLeads();

  const contentBlurClass = isLoggedIn ? "" : "content-blur";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
        <div className="flex flex-col items-center justify-center mt-12 mb-12 text-center">
          <img
            src="/roofspike.jpg"
            alt="RoofSpike AI Logo"
            className="w-64 sm:w-72"
          />
        </div>
        <div className="loadingio-spinner-magnify-h1r7iir60me">
          <div className="ldio-0uyuljhsbi9j">
            <div>
              <div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xl text-center text-white mt-4 font-sans">
          {messages[messageIndex]}
        </p>
      </div>
    );
  }
  const handleAccountCreation = () => {
    setAccountCreated(true);
    setShowLoginForm(false);
  };

  return (
    <div className="leads-container">
      {!isLoggedIn && <Login onLoginSuccess={handleLoginSuccess} />}
      <div className={contentBlurClass}>
        <div className="flex flex-col items-center justify-center mt-8 mb-8 text-center">
          <img
            src="/roofspike.jpg"
            alt="RoofSpike AI Logo"
            className="w-64 sm:w-72"
          />
        </div>

        <h1 className="text-orange-500 text-2xl font-bold mb-8 text-center">
          Click on a Lead To View Detailed Property Reports
        </h1>
        <table className="leads-table justify-center text-center">
          <thead>
            <tr>
              <th>Roof (Image & Sq. Ft)</th>
              <th>Address</th>
              <th>Owner</th>
              <th>Position</th>
              <th>Phone Numbers</th>
              <th>Emails</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => handleRowClick(lead.id)}
                className="clickable-row"
              >
                <td>
                  <img
                    src={lead.roofPicture}
                    alt="Roof"
                    className="roof-image"
                  />{" "}
                  {lead.squareFeet}
                </td>
                <td>{lead.address}</td>
                <td>{lead.owner}</td>
                <td>{lead.positionTitle}</td>
                <td>{lead.contactNumbers.join(", ")}</td>
                <td>{lead.emails.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <a
          href="https://roofspike.ai/contact"
          className="orange-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Access Unlimited Leads and Premium Features Now!
        </a>

        <div className="text-center pt-10 pb-10 w-full">
          {" "}
          {/* Adjust the padding-bottom as needed */}
          <p className="text-white font-sans text-s">
            &copy; 2023 RoofSpike AI, all rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.login.isLoggedIn,
});

// Define mapDispatchToProps
const mapDispatchToProps = {
  setLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Leads);
