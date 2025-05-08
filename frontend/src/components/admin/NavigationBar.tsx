import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContextProvider";
import BlankProfilePic from '../../assets/blank_profile_pic.png';
import useResponsiveWidth from "../../hooks/useResponsiveWidth";

// Admin-specific menu items
const adminPages = ['Manage Items', 'Rental Approvals', 'Users', 'Dashboard'];
const adminRoutes = ['/admin/items', '/admin/approvals', '/admin/users', '/admin/dashboard'];
const settings = ['Profile', 'Logout'];
const settingActions: { [key: string]: (navigate: ReturnType<typeof useNavigate>, setUser: ReturnType<typeof useAppContext>['setUser']) => void } = {
    'Profile': (navigate) => navigate('/admin/profile'),
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
        <nav className="relative flex justify-between bg-purple-700 p-3 px-6 sm:px-16 items-center shadow-lg">
            {/* "Admin Panel" text */}
            <div className="flex items-center">
                <span className="text-white font-bold text-xl mr-6">Admin Panel</span>
                
                {width < 640 ?
                    // Mobile Menu
                    <div className="relative">
                        <button
                            ref={menuButton}
                            className="text-white p-2 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
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
                                className="absolute z-20 top-full left-0 mt-2 w-48 origin-top-left rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                {adminPages.map((page, index) => (
                                    <a
                                        key={page}
                                        onClick={() => handlePageClick(adminRoutes[index])}
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
                        {adminPages.map((page, index) => (
                            <a
                                key={page}
                                onClick={() => handlePageClick(adminRoutes[index])}
                                className="text-white text-lg px-3 py-2 rounded-lg hover:bg-purple-800 transition-colors duration-150 cursor-pointer"
                            >
                                {page}
                            </a>
                        ))}
                    </div>
                }
            </div>
            
            {/* Profile Button and Settings Dropdown */}
            <div className="relative">
                <button
                    ref={settingsButton}
                    onClick={() => setShowSettings(!showSettings)}
                    className="flex items-center rounded-full hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-700 focus:ring-white transition-opacity"
                    aria-expanded={showSettings}
                    aria-controls="settings-menu"
                >
                    {/* Profile pic with border */}
                    <img className="h-10 w-10 rounded-full border-2 border-white" src={BlankProfilePic} alt="Admin Profile" />
                </button>
                {showSettings && (
                    <ul
                        ref={settingsRef}
                        id="settings-menu"
                        className="absolute z-20 top-full right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        {settings.map(setting => (
                            <li
                                key={setting}
                                onClick={() => handleSettingClick(setting)}
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