import { DataModel } from "../model/data-model";
import { readFile } from "../utils/functions/read-file";
import { PerformanceModel } from "../model/performance-model";
import { RevenueModel } from "../model/revenue-model";

export const fetchBranches = async (): Promise<DataModel[]> => {
  const branches = await readFile()

  if(!branches) {
    return []
  }

  return branches as DataModel[];
};

export const getPerformance = async (): Promise<PerformanceModel[]> => {
  const branches = await readFile();
  const performance: Record<string, { sales: number; rent: number}> = {};

  if (!branches) {
    return [];
  }

  branches.forEach(row => {
    const { 'A/V': type, state } = row;

    if (state && type) {
      performance[state] ??= { rent: 0, sales: 0 };

      if (type === 'Venda') {
        performance[state].rent++;
      } else if (type === 'Aluguel') {
        performance[state].sales++;
      }
    }
  });

  const orderedPerformance: PerformanceModel[] = Object.entries(performance)
    .map(([state, data]) => ({
      state,
      total: data.rent + data.sales,
      sales: data.rent,
      rent: data.sales
    }))
    .sort((a, b) => b.total - a.total);

  return orderedPerformance;
};

export const getRevenue = async (): Promise<RevenueModel[]> => {
  const branches = await readFile()
  const revenue: Record<string, { total: number }> = {};

  if(!branches) {
    return []
  }

  branches.forEach((row) => {
    const state = row.state;
    const type = row["A/V"];
    const entryValue = row.entry_value;
    const deposit = row.deposit

    if (state) {
      if(!revenue[state]) {
        revenue[state] = { total: 0 };
      }

      if (type === "Venda" && entryValue) {
        revenue[state].total += entryValue;
      } else if (type === "Aluguel" && deposit) {
        revenue[state].total += (deposit / 4)
      }
    }
  });

  const orderedRevenue: RevenueModel[] = Object.entries(revenue).map(([state, data]) => ({
    state,
    total: (data.total),
  })).sort((a, b) => b.total - a.total);

  return orderedRevenue
}