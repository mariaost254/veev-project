import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectList from './ProjectList';

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
               {/* Route to display all projects */}
               <Route path="/" element={<ProjectList />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;