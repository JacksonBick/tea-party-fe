# Tea Party Frontend

This is the React frontend for my Tea Party subscription app. It connects to a Rails API backend to display subscription data — including teas, customers, and pricing — and gives users tools to interact with that data through filtering, toggling, and status updates.

---

## Features

- View subscription details (title, status, frequency, and total price)
- See associated teas and customers
- Filter teas by max price
- Dynamically add or subtract teas from the total price without deleting them
- Cancel or reactivate a subscription

---

## Project Overview

This frontend is built to work with a JSON API and focuses on creating a smooth and responsive user experience. Subscriptions display full details, and users can:

- Click into a subscription to view more info
- Exclude teas from the total without removing them entirely
- Filter the teas by setting a max price

---

## Planning Process

From the start, I knew I needed two main views:

1. A grid page showing all subscriptions
2. A detailed view that shows subscription-specific info like teas, customers, pricing, etc.

The goal was to make things dynamic and clear, especially around pricing and interaction. One tricky part was getting the max price filter to behave exactly how I wanted — particularly when users entered decimals. I needed it to immediately hide any teas over that limit and keep the price calculation accurate.

---

## Reflections & Next Steps

- If I were to continue the project, I'd improve the tea filter input to make it more intuitive and user-friendly.
- I’d also definitely improve the visual styling — the current version is functional but pretty basic.

---

## Getting Started

To run locally:

```bash
git clone git@github.com:JacksonBick/tea-party-fe.git
cd tea-party-fe
npm install
npm start
