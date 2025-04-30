import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://localhost:3000/api/v1";

function SubscriptionDetail() {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [excludedTeas, setExcludedTeas] = useState([]);
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/subscriptions/${id}`)
      .then((res) => res.json())
      .then((data) => setSubscription(data));
  }, [id]);

  const handleStatusToggle = () => {
    const statusParam = subscription.status === "active" ? "cancel" : "active";

    fetch(`${API_URL}/subscriptions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [statusParam]: true }),
    })
      .then((res) => res.json())
      .then(() => {
        fetch(`${API_URL}/subscriptions/${id}`)
          .then((res) => res.json())
          .then((data) => setSubscription(data));
      });
  };

  const toggleTeaInTotal = (teaId) => {
    setExcludedTeas((prev) =>
      prev.includes(teaId)
        ? prev.filter((id) => id !== teaId)
        : [...prev, teaId]
    );
  };

  const totalPrice = subscription?.teas
    ?.filter((tea) => {
      const price = parseFloat(tea.price);
      const max = parseFloat(maxPrice);
      const passesMaxCheck = !maxPrice || price <= max;
      const notExcluded = !excludedTeas.includes(tea.id);
      return passesMaxCheck && notExcluded;
    })
    .reduce((sum, tea) => sum + (parseFloat(tea.price) || 0), 0)
    .toFixed(2);

  if (!subscription) return <p>Loading...</p>;

  return (
    <div className="subscription-detail-wrapper">
      <div className="header-bar">
        <h1>{subscription.title}</h1>
        <Link to="/" className="back-button">← Back to Home</Link>
      </div>

      <p><strong>Total Price:</strong> ${totalPrice}</p>
      <p>Status: {subscription.status}</p>
      <p>Frequency: {subscription.frequency}</p>

      <button onClick={handleStatusToggle}>
        {subscription.status === "active" ? "Cancel Subscription" : "Reactivate Subscription"}
      </button>

      <h2>Current Customers</h2>
      <ul>
        {subscription.customers?.map((customer, index) => (
          <li key={index}>
            <strong>{customer.first_name} {customer.last_name}</strong>
          </li>
        ))}
      </ul>

      <h2>Filter Teas by Max Price</h2>
      <div className="price-filter">
        <label>
          Max Price: $
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            step="0.01"
          />
        </label>
      </div>

      <h2>Teas Included</h2>
      <div className="teas-grid">
        {subscription.teas?.map((tea, index) => {
          const price = parseFloat(tea.price);
          const isOverMax = maxPrice && price > parseFloat(maxPrice);
          const isExcluded = excludedTeas.includes(tea.id);
          const dimmed = isExcluded || isOverMax;

          return (
            <div
              key={index}
              className="tea-card"
              style={{ opacity: dimmed ? 0.5 : 1 }}
            >
              <img
                src={tea.image_url}
                alt={tea.title}
                className="subscription-image"
              />
              <h3>{tea.title}</h3>
              <p>{tea.description}</p>
              <p><strong>Price:</strong> ${tea.price}</p>
              <button onClick={() => toggleTeaInTotal(tea.id)}>
                {isExcluded ? "Include in Total" : "Remove from Total"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SubscriptionDetail;