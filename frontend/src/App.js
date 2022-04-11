import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './components/Home'

// class App extends Component {
//   state = {
//     posts: []
//   };

//   componentDidMount() {
//     this.getPosts();
//   }

//   getPosts() {
//     axios
//       .get('http://127.0.0.1:8000/api/v1/')
//       .then(res => {
//         this.setState({ posts: res.data });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   render() {
//     return (
//       <>
//         {this.state.posts.map(item => (
//           <div key={item.id}>
//             <h1>{item.title}</h1>
//             <span>{item.body}</span>
//           </div>
//         ))}
//       </>
//     )
//   }
// }

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  </Router>
)

export default App;
