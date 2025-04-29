import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000/api/v1";

export default function SubscriptionContainer() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/subscriptions`)
      .then((res) => res.json())
      .then((data) => setSubscriptions(data));
  }, []);

  return (
    <div>
      <h1>All Subscriptions</h1>
      {subscriptions.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {subscriptions.map((sub) => (
            <li key={sub.id}>
              <Link to={`/subscriptions/${sub.id}`}>{sub.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}