import { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/about';
import BookDetail from './layouts/product/BookDetail';
import Register from './layouts/user/Register';
import ActiveAccount from './layouts/user/ActiveAccount';

function App() {
  const [keyword, setKeyword] = useState<string>('');
  return (
    <>
      <BrowserRouter>
        <Navbar keyword={keyword} setKeyword={setKeyword} />
        <Routes>
          <Route path="/" element={<HomePage keyword={keyword} />} />
          <Route path="/:categoryId" element={<HomePage keyword={keyword} />} />
          <Route path="/book/:bookId" element={<BookDetail />} />
          <Route path="/about" element={<About />} />
          <Route  path="/register" element={<Register />}/>
          <Route path ="/active/:email/:activeCode" element={<ActiveAccount />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
