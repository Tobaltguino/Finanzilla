import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { system } from "@chakra-ui/react/preset";

import Home from './components/Home';
import Login from './components/Login'; /* Login igual de routes/login.js */
import Signup from './components/Signup';
import Transacciones from './components/User/Transacciones';
import { AuthProvider } from './context/useAuth';
import PrivateRoute from './components/private_route';

const App = () => {
  return (
    <ChakraProvider value={system}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/transacciones" element={<PrivateRoute><Transacciones /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};

export default App;
