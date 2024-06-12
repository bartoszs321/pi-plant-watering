import './App.scss';
import React from 'react';
import WateringPage from './components/Watering/WateringPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import Login from './components/Login/Login';
import UserSettings from './components/Users/UserSettings';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<WateringPage />} />
                    <Route path='/users' element={<UserSettings />} />
                </Route>
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
