import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:3000/api/v1";

function SubscriptionDetail() {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/subscriptions/${id}`)
      .then((res) => res.json())
      .then((data) => setSubscription(data))
      .catch((err) => setError("Failed to find subscription"));
  }, [id]);

  const handleCancel = () => {
    fetch(`${API_URL}/subscriptions/${id}?cancel`, { method: "PATCH" })
      .then((res) => res.json())
      .then(() => {
        setSubscription((prev) => ({ ...prev, status: "cancelled" }));
      });
  };

  if (error) return <p>{error}</p>;
  if (!subscription) return <p>Loading...</p>;

  return (
    <div>
      <h2>{subscription.title}</h2>
      <p>Status: {subscription.status}</p>
      <p>Price: ${subscription.price}</p>
      <p>Frequency: {subscription.frequency}</p>
      <button onClick={handleCancel}>Cancel Subscription</button>
    </div>
  );
}

export default SubscriptionDetail;