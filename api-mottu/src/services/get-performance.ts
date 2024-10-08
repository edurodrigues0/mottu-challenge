import * as BranchesRepository from "../repositories/branches-repository"
import { StatusHttpNoContent, StatusHttpOk } from "../utils/http-helper";

export const getPerformanceData = async () => {
  const data = await BranchesRepository.getPerformance();
  let response = null;

  if (!data) {
    response = await StatusHttpNoContent();
    return response;
  }

  response = await StatusHttpOk(data);

  return response;
}