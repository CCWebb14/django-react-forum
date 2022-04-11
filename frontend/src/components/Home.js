import React from "react";
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useHomeFetch } from "../hooks/useHomeFetch";

const Home = () => {
  const { state, loading, error} = useHomeFetch();

  console.log(state);

  if (error) return <div>Something went wrong...</div>;

  return(
    <>
      {state.posts.map((item) => (
        <div key={item.id}>
             <h1>{item.title}</h1>
             <span>{item.body}</span>
           </div>
      ))
      }
    </>
  )
}

export default Home;