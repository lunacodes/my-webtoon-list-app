import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import WebtoonList from './components/WebtoonList';
import EditWebtoon from './components/EditWebtoon';
import AddWebtoon from './components/AddWebtoon';

const App = () => {
	return (
	  <div>
	    <Navbar />
	    <div style={{ margin: 20 }}>
	    <Routes>
		    <Route exact path="/" element={<WebtoonList />} />
		    <Route path="/edit/:id" element={<EditWebtoon />} />
		    <Route path="/add" element={<AddWebtoon />} />
	    </Routes>
	    </div>
	  </div>
	);
};

export default App;
