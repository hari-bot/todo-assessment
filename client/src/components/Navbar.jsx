import { useState } from "react";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userName = cookies.userName;
  const handleClick = () => {
    setIsToggled(!isToggled);
  };
  const handleSignout = () => {
    removeCookie("userID");
    removeCookie("AuthToken");
  };
  return (
    <nav className="border-gray-200 bg-gray-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-3xl font-semibold whitespace-nowrap text-green-500 hover:cursor-pointer">
            to<span className="text-blue-700">DO.</span>
          </span>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={handleClick}
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {userName}
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
            </svg>
          </button>
          <div
            className={`absolute right-0 z-10 mt-2 w-auto px-5 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
              isToggled ? null : "hidden"
            }`}
          >
            <div className="py-1" role="none">
              <button className="text-gray-700 block px-4 py-2 text-sm">
                {userName}
              </button>
              <button
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                onClick={handleSignout}
              >
                SignOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
