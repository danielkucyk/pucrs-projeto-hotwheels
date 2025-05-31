import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import CarForm from './components/CarForm/CarForm';
import CarsList from './components/CarsList/CarsList';
import CarDetail from './components/CarDetail/CarDetail';
import About from './components/About/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/carsList' element={<CarsList />}/>
          <Route path='/carForm' element={<CarForm />}/>
          <Route path='/carDetail' element={<CarDetail />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
