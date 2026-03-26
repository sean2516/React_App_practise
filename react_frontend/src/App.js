//import logo from './logo.svg';
//import './App.css';

//import React, { useState, useEffect } from 'react';
//import axios from 'axios';

import { BrowserRouter, Routes, Route} from "react-router-dom";

import Staff_list_page from './Pages/Staff_list';
import Add_new_staff_info_page from './Pages/Add_new_staff';
//import Add_success_page from './Pages/Add_success';
import Edit_info_page from './Pages/Edit_info';
//import Search_function_page from './Pages/Search_testing';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Staff_list_page />} />
        <Route path="/new_info" element={<Add_new_staff_info_page />} />
        <Route path="/edit_info/:id" element={<Edit_info_page />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
