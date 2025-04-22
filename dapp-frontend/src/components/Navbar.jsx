import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi"; // home icon
import { IoIosArrowDown } from "react-icons/io"; // dropdown arrow

const Navbar = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else {
        setError("Please install MetaMask to use this dApp!");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      setError("Failed to connect to MetaMask");
    }
  };

  const disconnectWallet = () => {
    setAccount(null); // just clears local state
    setDropdownOpen(false);
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-700 to-purple-700 text-white px-8 py-5 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-indigo-300 transition duration-300"
        >
          AuroVoice
        </Link>

        <ul className="flex space-x-8 text-lg items-center">
          <li>
            <Link
              to="/"
              className="hover:text-indigo-300 transition duration-300"
              title="Home"
            >
              <FiHome size={24} />
            </Link>
          </li>

          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300 flex items-center gap-2"
            >
              {account ? (
                <>
                  <span>
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                  <IoIosArrowDown />
                </>
              ) : (
                <span>Connect Wallet</span>
              )}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg z-50">
                <li>
                  <button
                    onClick={disconnectWallet}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Disconnect Wallet
                  </button>
                </li>
                <li>
                  <Link
                    to="/history"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Governance History
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
