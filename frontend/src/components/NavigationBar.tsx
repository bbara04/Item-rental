import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContextProvider";
import BlankProfilePic from '../assets/blank_profile_pic.png';
import useResponsiveWidth from "../hooks/useResponsiveWidth";

const pages = ['Renting', 'My Rentals', 'About Us', 'Contact Us'];
const pageRoutes = ['/', '/my-rentals', '/about', '/contact'];
const settings = ['Profile', 'Account', 'Logout'];
const settingActions: { [key: string]: (navigate: ReturnType<typeof useNavigate>, setUser: ReturnType<typeof useAppContext>['setUser']) => void } = {
    'Profile': (navigate) => navigate('/profile'),
    'Account': (navigate) => navigate('/account'),
    'Logout': (navigate, setUser) => {
        sessionStorage.removeItem('user');
        setUser(undefined);
        navigate('/login');
    }
};


export function NavigationBar() {

    const width = useResponsiveWidth();
    const { setUser } = useAppContext();
    const navigate = useNavigate();

    const [showSettings, setShowSettings] = useState(false);
    const [showPages, setShowPages] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const settingsRef = useRef<HTMLUListElement>(null);
    const menuButton = useRef<HTMLButtonElement>(null);
    const settingsButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && menuButton.current && !menuButton.current.contains(event.target as Node)) {
                setShowPages(false);
            }
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node) && settingsButton.current && !settingsButton.current.contains(event.target as Node)) {
                setShowSettings(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handlePageClick = (route: string) => {
        setShowPages(false);
        navigate(route);
    }

    const handleSettingClick = (setting: string) => {
        setShowSettings(false);
        const action = settingActions[setting];
        if (action) {
            action(navigate, setUser);
        }
    }


    return (
        // Main nav bar with shadow
        <nav className="relative flex justify-between bg-blue-600 p-3 px-6 sm:px-16 items-center shadow-lg">
            {
                width < 640 ?
                    // Mobile Menu
                    <div className="relative">
                        <button
                            ref={menuButton}
                            // Increased rounding
                            className="text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
                            onClick={() => setShowPages(!showPages)}
                            aria-expanded={showPages}
                            aria-controls="mobile-menu"
                        >
                            <span className="material-icons">menu</span>
                        </button>
                        {showPages && (
                            <div
                                ref={menuRef}
                                id="mobile-menu"
                                // Increased rounding and shadow
                                className="absolute z-20 top-full left-0 mt-2 w-48 origin-top-left rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                {pages.map((page, index) => (
                                    <a
                                        key={page}
                                        onClick={() => handlePageClick(pageRoutes[index])}
                                        // Added slight rounding on hover item potentially
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md mx-1 cursor-pointer"
                                        role="menuitem"
                                    >
                                        {page}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                    :
                    // Desktop Menu Links
                    <div className="flex gap-2 lg:gap-4">
                        {pages.map((page, index) => (
                            <a
                                key={page}
                                onClick={() => handlePageClick(pageRoutes[index])}
                                // Increased rounding
                                className="text-white text-lg px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-150 cursor-pointer"
                            >
                                {page}
                            </a>
                        ))}
                    </div>
            }
            {/* Profile Button and Settings Dropdown */}
            <div className="relative">
                <button
                    ref={settingsButton}
                    onClick={() => setShowSettings(!showSettings)}
                    // Using rounded-full, added subtle shadow on hover/focus maybe? (focus ring already present)
                    className="flex items-center rounded-full hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white transition-opacity"
                    aria-expanded={showSettings}
                    aria-controls="settings-menu"
                >
                    {/* Profile pic with border */}
                    <img className="h-10 w-10 rounded-full border-2 border-white" src={BlankProfilePic} alt="Profile" />
                </button>
                {showSettings && (
                    <ul
                        ref={settingsRef}
                        id="settings-menu"
                        // Increased rounding and shadow
                        className="absolute z-20 top-full right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        {settings.map(setting => (
                            <li
                                key={setting}
                                onClick={() => handleSettingClick(setting)}
                                // Added slight rounding on hover item
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md mx-1 cursor-pointer"
                                role="menuitem"
                            >
                                {setting}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
}