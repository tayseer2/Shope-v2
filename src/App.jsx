import Products from "./components/products";
import Navbar from "./components/Navbar";
import { Route, Routes} from "react-router-dom";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import PopUp from "./components/PopUp";
import Footer from "./components/Footer";

export default function App() {

  return (
    <div className="container mx-auto">
      <Navbar />
      <PopUp />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Payment" element={<Payment />} />
      </Routes>
      <Footer />
    </div>
  );
}
