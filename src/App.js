import './App.css';
import React, {Component} from 'react';
import NavBar from './Components/NavBar';
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component  {
  
  pageSize=16;
  apiKey=process.env.REACT_APP_NEWS_API2;
  // console.log(apiKey);return;
  
  state={
    progress:0
  }
 
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar
        color='#f11946'
        // height='3'
        progress={this.state.progress} //inital progress
       
      />
        <Routes>
        <Route exact path="/"    element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />} />
          <Route exact path="/general"   element={<News apiKey={this.apiKey}  setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />} />
          <Route exact path="/science"   element={<News apiKey={this.apiKey}  setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />} />
          <Route exact path="/business"   element={<News apiKey={this.apiKey}  setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" />} />
          <Route exact path="/health"   element={<News apiKey={this.apiKey}  setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />} />
          <Route exact path="/sports"   element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
          <Route exact path="/technology"   element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
          <Route exact path="/entertainment"   element={<News apiKey={this.apiKey}  setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
        </Routes>
      </Router>
    </div>
    );
   }
}
