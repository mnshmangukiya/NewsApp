import './App.css';

import React, {useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App=()=> {
 const pagesize=5;
 const apikey=process.env.REACT_APP_NEWS_API;
 const[myprogress,setprogress]=useState(0)

    return (
      <div>
      <BrowserRouter>
        <Navbar/>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={myprogress}       
        />
        <Routes>
          <Route path="/" element={<News  setprogress={setprogress} apikey={apikey} key="general" pagesize={pagesize} country="in" category="general"/>}/>
          <Route path="/business" element={<News  setprogress={setprogress} apikey={apikey} key="business" pagesize={pagesize} country="in" category="business"/>}/>
          <Route path="/entertainment" element={<News  setprogress={setprogress} apikey={apikey} key="entertainment" pagesize={pagesize} country="in" category="entertainment"/>}/>
          <Route path="/health" element={<News  setprogress={setprogress} apikey={apikey} key="health" pagesize={pagesize} country="in" category="health"/>}/>
          <Route path="/science" element={<News  setprogress={setprogress} apikey={apikey} key="science" pagesize={pagesize} country="in" category="science"/>}/>
          <Route path="/sports" element={<News  setprogress={setprogress} apikey={apikey} key="sports" pagesize={pagesize} country="in" category="sports"/>}/>
          <Route path="/technology" element={<News  setprogress={setprogress} apikey={apikey} key="technology" pagesize={pagesize} country="in" category="technology"/>}/>
        </Routes>                              
      </BrowserRouter>
      </div>
    )
}
export default App
