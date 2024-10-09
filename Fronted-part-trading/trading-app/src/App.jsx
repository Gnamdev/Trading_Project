import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import Portfolio from "./pages/portfolio/Portfolio";
import Activity from "./pages/activity/Activity";
import Wallet from "./pages/wallet/Wallet";
import PaymentDetails from "./pages/paument-details/PaymentDetails";
import StockDetails from "./pages/stock Details/StockDetails";
import Withdrawal from "./pages/withdrawal/Withdrawal";
import WatchList from "./pages/WatchList/WatchList";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Searching from "./pages/search/SearchingCoins";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/payment-details" element={<PaymentDetails />} />
        <Route path="/market/:id" element={<StockDetails />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Searching />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
