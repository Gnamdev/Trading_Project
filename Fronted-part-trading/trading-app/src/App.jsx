import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element="{<Home />}" />
        <Route path="/portfolio" element="{<Portfolio />}" />
        <Route path="/activity" element="{<Activity />}" />
        <Route path="/wallet" element="{<Wallet />}" />
        <Route path="/withdrawal" element="{ <Withdrawal />}" />
        <Route path="/payment-details" element="{<PaymentDetails />}" />
        <Route path="/" element="{<Home />}" />
        <Route path="/" element="{<Home />}" />
      </Routes>
    </div>
  );
}

export default App;
