import React from "react";
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useHomeFetch } from "../hooks/useHomeFetch";
import { useEffect, useState } from "react";

const Login = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  return(
    <>
      <div>Test</div>
    </>
  )
}

export default Login;