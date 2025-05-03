import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="flex flex-row items-center justify-between p-4 bg-transparent mx-[7vw]">
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-lg overflow-y-auto">
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-6 right-6 text-xl md:text-3xl"
                    >
                        <AiOutlineClose />
                    </button>

                    <div className="p-5 flex flex-col items-center mt-[5vw] h-full space-y-5 px-4">
                        <p
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                navigate('/login');
                            }}
                            className="w-full border-b border-black/40 pb-[0.8vw] text-lg font-semibold text-black/90 hover:text-orange-500 transition-colors duration-400 cursor-pointer"
                        >
                            Login
                        </p>
                        <p
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                navigate('/signup');
                            }}
                            className="w-full border-b border-black/40 pb-[0.8vw] text-lg font-semibold text-black/90 hover:text-orange-500 transition-colors duration-400 cursor-pointer"
                        >
                            Signup
                        </p>
                    </div>
                </div>
            )}

            {/* Mobile Menu Toggle */}
            <div onClick={toggleMobileMenu} className="lg:hidden text-2xl cursor-pointer">
                <AiOutlineMenu />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:space-x-12">
                <p
                    onClick={() => navigate('/login')}
                    className="text-[1.1vw] text-black hover:text-gray-400 transition duration-300 cursor-pointer"
                >
                    Login
                </p>
                <p
                    onClick={() => navigate('/signup')}
                    className="text-[1.1vw] text-black hover:text-gray-400 transition duration-300 cursor-pointer"
                >
                    Signup
                </p>
            </div>
        </header>
    );
};

export default Header;
