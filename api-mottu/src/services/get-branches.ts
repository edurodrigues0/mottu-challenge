import * as BranchesRepository from "../repositories/branches-repository"
import { StatusHttpNoContent, StatusHttpOk } from "../utils/http-helper";

export const getBranchesData = async () => {
  const data = await BranchesRepository.fetchBranches();
  let response = null;

  if (!data) {
    response = await StatusHttpNoContent();
    return response;
  } else {
    response = await StatusHttpOk(data);
  }

  return response;
}