import { useEffect, useState } from "react"
import { BarChart } from "./components/BarChart"
import { LineCharts } from "./components/LineChart"
import { api } from "./services/api"

interface Revenue {
  state: string;
  total: number;
}

interface Performance {
  state: string;
  total: number;
  sales: number;
  rent: number;
}

function App() {
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const [performance, setPerformance] = useState<Performance[]>([]);

  useEffect(() => {
    api.get('/revenue').then((response) => setRevenue(response.data))
    api.get('/performance').then((response) => setPerformance(response.data))
  }, [])

  return (
    <div className="w-screen h-screen bg-slate-950 text-gray-50 flex flex-col">
      <header className="w-full h-16 p-4 flex items-center justify-between border-b border-gray-700">
        <span>Mottu Dash</span>
      </header>

      <div className="flex flex-1">
        <div className="w-40 h-full p-4">
          <nav className="flex flex-col gap-4 text-sm text-gray-300">
            <a href="#" className="transition-all hover:underline">Dashboard</a>
            <a href="#" className="transition-all hover:underline">Filiais</a>
            <a href="#" className="transition-all hover:underline">Vendas</a>
            <a href="#" className="transition-all hover:underline">Alugueis</a>
          </nav>
        </div>

        <div className="w-full h-full p-4 border-l border-gray-700 flex flex-col items-center justify-center gap-8">
          <div className="w-full h-72">
            <BarChart revenue={revenue} />
          </div>

          <div className="w-full h-72">
            <LineCharts performance={performance} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
