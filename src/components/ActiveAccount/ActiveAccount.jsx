import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Success from "./Success";
import Verify from "./Verify";


function ActiveAccount() {
  const { token } = useParams();
  const [validate, setvalidate] = useState(null);

  try {
    axios(
      `https://rocketproject2021.herokuapp.com/searchProfileActivate/${token}`
    ).then((res) => setvalidate(res.data));
  } catch (error) {
    console.log(error);
  }

  // let check= await axios(`https://rocketproject2021.herokuapp.com/searchProfileID/${token}`).then((r)=>console.log(r))
  // //if return... else return y redirect a log in
  console.log(validate);
  if (validate) return <Success />;
  else return <Verify />;

}

export default ActiveAccount;
