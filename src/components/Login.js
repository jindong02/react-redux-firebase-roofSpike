import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { connect } from "react-redux";
import { setLogin } from "../store/actions";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const Login = ({ onLoginSuccess, setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  let successfulLogin = false;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSignUp) {
      // Handle Sign-up
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        successfulLogin = true;
        setLogin(true); // Update Redux store
        onLoginSuccess(); // Existing logic
      } catch (error) {
        setError(error.message);
      }
    } else {
      // Handle Login
      try {
        await signInWithEmailAndPassword(auth, email, password);
        successfulLogin = true;
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      setError(error.message);
    }
  };

  const isCompanyEmail = (email) => {
    const commonDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "icloud.com",
      "hotmail.com",
    ]; // Add more as needed
    const domain = email.split("@")[1];
    return !commonDomains.includes(domain);
  };

  return (
    <div className="login-modal w-4/6 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center mt-5 mb-5 text-center">
          <img
            src="/roofspike.jpg"
            alt="RoofSpike AI Logo"
            className="w-64 sm:w-72"
          />
        </div>
        <h2 className="text-lg text-black font-bold mb-4 md:w-text-base lg:text-lg sm: text-sm">
          {isSignUp ? "Sign up to view your leads" : "Login to view your leads"}
        </h2>

        {isSignUp && (
          <>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="text-left block text-black text-sm font-bold mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="text-left block text-black text-sm font-bold mb-2"
              >
                Company Website
              </label>
              <input
                id="username"
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Company email"
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label
            htmlFor="username"
            className="text-left block text-black text-sm font-bold mb-2"
          >
            Company Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Company email"
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="text-left block text-black text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
          />
        </div>

        <div className="flex flex-col items-center justify-center text-black">
          {!isSignUp && (
            <button onClick={handlePasswordReset} className="my-2">
              Forgot Password?
            </button>
          )}
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2"
            type="submit"
          >
            {isSignUp ? "Sign up" : "Log in"}
          </button>
          <button onClick={() => setIsSignUp(!isSignUp)} className="my-2">
            {isSignUp
              ? "Already have an account? Log in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setLogin: (isLoggedIn) => dispatch(setLogin(isLoggedIn)),
});

export default connect(null, mapDispatchToProps)(Login);
