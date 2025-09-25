import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LandingPage from "./components/LandingPage";
import TopBar from "./components/TopBar";

function Root() {
  const [showApp, setShowApp] = useState(false);

  return (
    <>
      {showApp ? <App /> : <LandingPage onContinue={() => setShowApp(true)} />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
