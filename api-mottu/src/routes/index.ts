import { Router } from "express";

import {
  getBranches,
  getPerformance,
  getRevenue
} from "../controllers/branches-controller";

export const router = Router();

router.get("/branches", getBranches);
router.get("/performance", getPerformance);
router.get("/revenue", getRevenue);
