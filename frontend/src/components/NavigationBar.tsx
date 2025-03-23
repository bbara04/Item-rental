import { useRef, useState } from "react";
import BlankProfilePic from '../assets/blank_profile_pic.png';
import useResponsiveWidth from "../hooks/useResponsiveWidth";

const pages = ['Renting', 'My Rentals', 'About Us', 'Contact Us'];
const settings = ['Profile', 'Account', 'Logout'];

export function NavigationBar() {

  const width = useResponsiveWidth();

  const [showSettings, setShowSettings] = useState(false);
  const [showPages, setShowPages] = useState(false);

  const menuButton = useRef<HTMLButtonElement>(null);
  const settingsButton = useRef<HTMLButtonElement>(null);

  return (
    <nav className="flex justify-between bg-blue-600 p-3 px-6 sm:px-16 items-center">
      {
        width < 640 ?
          <>
            <button ref={menuButton} className="text-white" onClick={() => setShowPages(!showPages)}>
              <span className="material-icons">menu</span>
            </button>
            {showPages && <div className="absolute z-10 top-14 flex flex-col bg-white shadow-lg shadow-gray-400 p-3 rounded-lg">
              {pages.map(page => <a key={page}>{page}</a>)}
            </div>}
          </>
          :
          <div className="flex gap-2 lg:gap-4">
            {pages.map(page => <a className="text-white text-lg" key={page}>{page}</a>)}
          </div>
      }
      <button ref={settingsButton} onClick={() => setShowSettings(!showSettings)}>
        <img className="h-10 rounded-full" src={BlankProfilePic} alt="Profile" />
      </button>
      {showSettings && <ul className="absolute z-10 top-14 right-6 sm:right-16 bg-white shadow-lg shadow-gray-400 p-3 rounded-lg">
        {settings.map(setting => <li key={setting}>{setting}</li>)}
      </ul>}
    </nav>
  );
}