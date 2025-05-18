import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContextProvider";
import BlankProfilePic from '../assets/blank_profile_pic.png';
import useResponsiveWidth from "../hooks/useResponsiveWidth";

const pages = ['Renting', 'About Us', 'Contact Us'];
const pageRoutes = ['/', '/about', '/contact'];
const settings = ['Profile', 'My Rentals', 'Logout'];
const settingActions: { [key: string]: (navigate: ReturnType<typeof useNavigate>, setUser: ReturnType<typeof useAppContext>['setUser']) => void } = {
    'Profile': (navigate) => navigate('/profile'),
    'My Rentals': (navigate) => navigate('/my-rentals'),
    'Logout': (navigate, setUser) => {
        sessionStorage.removeItem('user');
        setUser(undefined);
        navigate('/login');
    }
};


export function NavigationBar() {

    const width = useResponsiveWidth();
    const { user, setUser, baseColor } = useAppContext(); // Added baseColor from context
    const navigate = useNavigate();
    const style = { '--user-bg-color': baseColor } as React.CSSProperties; // Added style object

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

    if (!user) {
        navigate('/login');
        return null;
    }


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
        <nav className="relative flex justify-between border-b-0.5 p-3 px-6 sm:px-16 items-center shadow-sm bg-white">
            {
                width < 640 ?
                    // Mobile Menu
                    <div className="relative">
                        <button
                            ref={menuButton}
                            // Increased rounding, changed text and hover background for white nav
                            className="text-[var(--user-bg-color)] p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--user-bg-color)] transition-colors"
                            onClick={() => setShowPages(!showPages)}
                            aria-expanded={showPages}
                            aria-controls="mobile-menu"
                            style={style} // Added style
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
                                // Increased rounding, changed text and hover background for white nav
                                className="text-[var(--user-bg-color)] text-lg font-semibold px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
                                style={style} // Added style
                            >
                                {page}
                            </a>
                        ))}
                    </div>
            }
            {/* Logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img
                    className="h-14"
                    src={user.university.image && user.university.image.imageData && user.university.image.contentType ? `data:${user.university.image.contentType};base64,${user.university.image.imageData}` : "https://placehold.co/600x400"}
                    alt={user.university.image?.fileName ?? user.university.name ?? "Item image"}
                />
            </div>
            {/* Profile Button and Settings Dropdown */}
            <div className="relative">
                <button
                    ref={settingsButton}
                    onClick={() => setShowSettings(!showSettings)}
                    // Using rounded-full, changed focus ring for white nav
                    className="flex items-center rounded-full hover:opacity-80 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[var(--user-bg-color)] transition-opacity"
                    aria-expanded={showSettings}
                    aria-controls="settings-menu"
                    style={style} // Added style
                >
                    {/* Profile pic with border, changed border color for white nav */}
                    <img 
                        className="h-12 w-12 rounded-full border-1 border-[var(--user-bg-color)]" 
                        src={user && user.image && user.image.imageData && user.image.contentType ? `data:${user.image.contentType};base64,${user.image.imageData}` : BlankProfilePic} 
                        alt="Profile" 
                        style={style} 
                    />
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