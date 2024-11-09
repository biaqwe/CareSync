import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Hist from "./pages/Hist";
import Appt from "./pages/Appt";
import Symp from "./pages/Symp";
import Med from "./pages/Med";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="Medical_History" element={<Hist />} />
          <Route path="Appointments" element={<Appt />} />
          <Route path="Symptoms" element={<Symp />} />
          <Route path="Doctors" element={<Med />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}