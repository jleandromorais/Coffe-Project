import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Hero } from './Components/Hero';
import { Pop } from './Components/Pop';
import ShoppingCart from './Components/Cart';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Pop />
            </>
          } />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
