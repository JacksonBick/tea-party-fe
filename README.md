Project Overview
This React frontend is part of a tea subscription application. It interacts with a Rails API backend to display detailed subscription data, including teas, customers, and pricing, and allows for filtering, status toggling, and user interactions.

Features
View subscription details (title, status, frequency, total price)

See associated teas and customers

Filter teas by max price 

Add and subtract the prices of teas based on desired teas wanted in the subscription

Cancel or reactivate a subscription

Planning Process

Subscriptions needed to display associated teas and customers

Users required the ability to exclude teas from total price without deletion

My Plan:
I initially thought I had a completed backend, so I moved on to the frontend. I knew I needed two main pages:

A subscriptions grid displaying all available subscriptions.

A detail page that shows more information when a subscription is clicked (such as customers, prices, teas, etc.).

The hardest part was getting the max price input field to work as desired—specifically, ensuring that when a decimal value is entered, any teas above that price would be excluded from the displayed list.

If I were to continue this project, I would make the tea input field more user-friendly and meaningful. I would also improve the styling, as the current design is quite plain and lacks visual appeal.

