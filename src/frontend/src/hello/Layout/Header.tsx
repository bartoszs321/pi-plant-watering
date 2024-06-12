import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const nav = useNavigate();
    const handleUserButton = () => {
        return nav('/users');
    };

    const handleReturnHome = () => {
        return nav('/');
    };

    return (
        <>
            <div className='header-container'>
                <p className='header-title' onClick={handleReturnHome}>
                    Pi Plant Watering
                </p>
                <button className='users-button' onClick={handleUserButton}>
                    Profile
                </button>
            </div>
        </>
    );
};

export default Header;
