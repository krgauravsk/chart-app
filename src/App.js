import "./index.css";
import React, { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Button, Card, Switch, Space } from "antd";
import fullScreenIcon from "./assets/icon.svg";
import closeFullScreenIcon from "./assets/close.svg";

function App() {
  const [fullData, setFullData] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState("1w");
  const [activeTab, setActiveTab] = useState("Chart");
  const [compareMode, setCompareMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [latestPrice, setLatestPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [percentChange, setPercentChange] = useState(0);

  const cardRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    const res1 = await fetch("https://dummyjson.com/products?limit=30");
    const res2 = await fetch("https://dummyjson.com/products?limit=30&skip=30");
    const json1 = await res1.json();
    const json2 = await res2.json();

    const transformed1 = json1.products.map((item, index) => ({
      time: `P${index + 1}`,
      price: item.price,
    }));
    

    const transformed2 = json2.products.map((item, index) => ({
      time: `P${index + 1}`,
      comparePrice: item.price,
    }));

    setFullData(transformed1);
    setCompareData(transformed2);

    const len = transformed1.length;
    const latest = transformed1[len - 1]?.price || 0;
    const prev = transformed1[len - 2]?.price || 0;
    const change = latest - prev;
    const percent = prev ? (change / prev) * 100 : 0;

    setLatestPrice(latest);
    setPriceChange(change);
    setPercentChange(percent);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let count = 7;
    if (selectedRange === "1d") count = 1;
    else if (selectedRange === "3d") count = 3;
    else if (selectedRange === "1m") count = 20;
    else if (selectedRange === "6m") count = 26;
    else if (selectedRange === "1y") count = 30;
    else if (selectedRange === "max") count = fullData.length;
  
    const main = fullData.slice(0, count);
    const compare = compareData.slice(0, count);
  
    const merged = main.map((item, i) => ({
      ...item,
      comparePrice: compare[i]?.comparePrice || null,
    }));
  
    setChartData(merged);
  
    const len = main.length;
    const latest = main[len - 1]?.price || 0;
    const prev = main[len - 2]?.price || 0;
    const change = latest - prev;
    const percent = prev ? (change / prev) * 100 : 0;
  
    setLatestPrice(latest);
    setPriceChange(change);
    setPercentChange(percent);
  }, [selectedRange, fullData, compareData]);
  
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <div className="container">
      <Card className={`card ${isFullscreen ? "fullscreen" : ""}`} ref={cardRef}>
        <div className="header">
          <div className="price-info">
            <h1 className="price">
              {latestPrice.toLocaleString("en-US", { maximumFractionDigits: 2 })}{" "}
              <span className="currency">USD</span>
            </h1>
            <p className="change" style={{ color: priceChange >= 0 ? "green" : "red" }}>
              {priceChange >= 0 ? "+" : ""}
              {priceChange.toLocaleString("en-US", { maximumFractionDigits: 2 })} (
              {percentChange >= 0 ? "+" : ""}
              {percentChange.toFixed(2)}%)
            </p>
          </div>
        </div>

        <div className="tabs">
          {["Summary", "Chart", "Statistics", "Analysis", "Settings"].map((tab) => (
            <button
              key={tab}
              className={`tab-button ${tab === activeTab ? "active-tab" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="chart-controls">
          <Space wrap style={{ marginBottom: "10px", flexWrap: "wrap" }}>
            <Button type="text" onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? (
                <img src={closeFullScreenIcon} alt="Close Fullscreen" width={24} height={24} />
              ) : (
                <div className="fullscreen-container">
                  <img src={fullScreenIcon} alt="Fullscreen" width={24} height={24} /> Fullscreen
                </div>
              )}
            </Button>
            <Switch
              checked={compareMode}
              onChange={setCompareMode}
              checkedChildren="Compare"
              unCheckedChildren="Compare"
              className="switch-compare"
            />
            {["1d", "3d", "1w", "1m", "6m", "1y", "max"].map((range) => (
              <Button
                key={range}
                size="small"
                type={range === selectedRange ? "primary" : "default"}
                onClick={() => setSelectedRange(range)}
              >
                {range}
              </Button>
            ))}
          </Space>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="price"
                name="Primary"
                stroke="#4f46e5"
                strokeWidth={2}
                fill="#E8E7FF"
                dot={false}
              />
              {compareMode && (
                <Area
                  type="monotone"
                  dataKey="comparePrice"
                  name="Comparison"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="#D1FAE5"
                  dot={false}
                />
              )}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

export default App;
