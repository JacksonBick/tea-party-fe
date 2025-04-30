import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SubscriptionContainer.css";

const API_URL = "http://localhost:3000/api/v1";

function SubscriptionContainer() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/subscriptions`)
      .then((res) => res.json())
      .then((data) => setSubscriptions(data));
  }, []);

  return (
    <div className="subscriptions-wrapper">
    <h1>Tea Subscription Service </h1>
    {subscriptions.length === 0 ? (
      <p>Loading...</p>
    ) : (
      <div className="subscriptions-grid">
      {subscriptions.map((sub) => {
        console.log(sub.teas); 
        return (
          <Link to={`/subscriptions/${sub.id}`} key={sub.id} className="subscription-card">
            <img
              src={sub.teas[0]?.image_url}
              alt={sub.title}
              className="subscription-image"
            />
            <h3>{sub.title}</h3>
          </Link>
        );
      })}
      </div>
    )}
  </div>
);
}