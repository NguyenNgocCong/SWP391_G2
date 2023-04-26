import React from "react";
import Markup from "./views/index";

import "./App.css";

// Plugins Stylesheet
import "bootstrap/dist/css/bootstrap.min.css";

// Slick Carousel
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// React Modal Video
import "react-modal-video/css/modal-video.min.css";

// StyleSheet
import "./css/color/color-1.css";
import "./css/shortcodes/shortcodes.css";
import "./css/style.css";
import "./css/typography.css";

// Fonts
import "./vendors/flaticon/flaticon.css";
import "./vendors/fontawesome/css/font-awesome.min.css";
import "./vendors/line-awesome/css/line-awesome.min.css";
import "./vendors/themify/themify-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="page-wraper">
      <Markup />
      <ToastContainer />
    </div>
  );
}

export default App;
