import React from "react";
import { Routes, Route } from "react-router-dom";
import SubscriptionContainer from "./components/SubscriptionContainer.jsx";
import SubscriptionDetail from "./components/SubscriptionDetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SubscriptionContainer />} />
      <Route path="/subscriptions/:id" element={<SubscriptionDetail />} />
    </Routes>
  );
}

export default App