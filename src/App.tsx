import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './Pages/Header';
import { Hero } from './Pages/Hero';
import { Pop } from './Pages/Pop';
import ShoppingCart from './Pages/Cart';

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
