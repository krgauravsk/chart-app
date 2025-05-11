📊 React Chart Dashboard
A React + Recharts-based data visualization dashboard with real-time interactivity, fullscreen support, comparative mode, and dynamic filtering options. This project demonstrates how to build a modern, responsive, and interactive data panel using Ant Design components and dummy product pricing APIs.

🚀 Features
✅ Dynamic Header Content
Displays the latest price from the API.

Shows the absolute and percentage price change from the previous value.

Automatically updates on data fetch or filter change.

🖥️ Fullscreen Mode
Toggle fullscreen for the chart container using a button.

Auto-detects and exits fullscreen on ESC key or user action.

🔁 Compare Mode
Toggle to overlay a second dataset for visual price comparison.

Uses different color schemes for primary and comparison data.

Useful for analyzing trends and variance between two series.

📅 Range Filters
Built-in filters to view data by time range:

1d, 3d, 1w, 1m, 6m, 1y, max

Dynamically updates the chart and header values on selection.

🧭 Tab Navigation
Includes basic tab navigation placeholders for future expansion:

Summary, Chart, Statistics, Analysis, Settings

📈 Responsive Chart
Utilizes ResponsiveContainer from Recharts to ensure the chart adapts to various screen sizes.

🔄 API-Driven
Pulls product pricing data from https://dummyjson.com/products.

Uses two endpoints to simulate primary and comparison datasets.

📦 Stack Used
React

Recharts

Ant Design

CSS Modules / index.css

DummyJSON API

📂 Folder Structure
css
Copy
Edit
src/
├── App.js
├── index.css
├── assets/
│   ├── icon.svg
│   └── close.svg
🛠️ Setup Instructions
bash
Copy
Edit
# Install dependencies
npm install

# Start the app
npm start
