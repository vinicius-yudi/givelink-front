import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend,
} from "recharts";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../styles/Dashboard.css';

type StatsResponse = {
  total: number;
  donations_per_method: Record<string, number>;
  donations_per_sector: Record<string, number>;
  top10_donors: Record<string, number>;
  top10_institutions: Record<string, number>;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF3E3E", "#3EBDFF"];

const Dashboard = () => {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const fetchData = async () => {
    try {
      const params = new URLSearchParams();
      const min = minDate || "1900-01-01";
      const max = maxDate || "2025-12-31";

      params.append("min_date", min);
      params.append("max_date", max);

      const token = localStorage.getItem("access_token");

      const response = await fetch(
        `http://localhost:8000/dashboard?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [minDate, maxDate]);

  const preparePieData = (obj: Record<string, number>) =>
    Object.entries(obj).map(([name, value]) => ({ name, value }));

  const prepareBarData = (obj: Record<string, number>) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }));

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <h1 className="dashboard-title">Dashboard de Doações</h1>

        <div className="dashboard-filters">
            <div className="dashboard-filter-field">
                <label className="dashboard-filter-label">Data início</label>
                <input
                type="date"
                value={minDate}
                onChange={e => setMinDate(e.target.value)}
                className="dashboard-filter-input"
                />
            </div>
            <div className="dashboard-filter-field">
                <label className="dashboard-filter-label">Data fim</label>
                <input
                type="date"
                value={maxDate}
                onChange={e => setMaxDate(e.target.value)}
                className="dashboard-filter-input"
                />
            </div>
        </div>

        {data && (
          <>
            <div className="dashboard-total">
              Total de Doações: R$ {data.total.toFixed(2)}
            </div>

            <div className="dashboard-charts">
              <div className="dashboard-card">
                <h2>Doações por Método</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={preparePieData(data.donations_per_method)}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >
                      {preparePieData(data.donations_per_method).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ReTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="dashboard-card">
                <h2>Doações por Setor</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={preparePieData(data.donations_per_sector)}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >
                      {preparePieData(data.donations_per_sector).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ReTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-charts dashboard-charts-single">
              <div className="dashboard-card">
                <h2>Top 10 Doadores</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={prepareBarData(data.top10_donors)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ReTooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="dashboard-card">
                <h2>Top 10 Instituições</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={prepareBarData(data.top10_institutions)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ReTooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
