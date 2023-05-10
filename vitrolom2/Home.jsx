import "./styles/main.css";
import "./styles/home.css";

import { Link } from "react-router-dom";
import WhatWeDo from "./WhatWeDo";
import Screen1 from "./Screen1";

import Header from "./Header";

function Home() {
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="block1">
          <Screen1 />
          <WhatWeDo />
        </div>
      </div>
    </>
  );
}

export default Home;
