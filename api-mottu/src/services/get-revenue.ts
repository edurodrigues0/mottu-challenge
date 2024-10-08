import * as BranchesRepository from "../repositories/branches-repository"
import { StatusHttpNoContent, StatusHttpOk } from "../utils/http-helper";

export const getRevenueData = async () => {
  const data = await BranchesRepository.getRevenue();
  let response = null;

  if (!data) {
    response = await StatusHttpNoContent();
    return response;
  }

  response = await StatusHttpOk(data);

  return response;
}