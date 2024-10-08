import { Request, Response } from "express";
import { getBranchesData } from "../services/get-branches";
import { getPerformanceData } from "../services/get-performance";
import { getRevenueData } from "../services/get-revenue";

export const getBranches = async (_req: Request, res: Response ) => {
  const httpResponse = await getBranchesData();
  const { statusCode, body } = httpResponse;

  res.status(statusCode).json(body)
}

export const getPerformance = async (_req: Request, res: Response) => {
  const httpResponse = await getPerformanceData();
  const { statusCode, body } = httpResponse;

 res.status(statusCode).json(body)
}

export const getRevenue = async (_req: Request, res: Response) => {
  const httpResponse = await getRevenueData();
  console.log("http response =>", httpResponse)
  const { statusCode, body } = httpResponse;

  res.status(statusCode).json(body)
}
