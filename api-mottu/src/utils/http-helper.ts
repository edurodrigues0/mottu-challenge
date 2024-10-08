import { HttpResponse } from "../model/http-response-model";

export async function StatusHttpOk(data: any): Promise<HttpResponse> {
  const response: HttpResponse = {
    statusCode: 200,
    body: data,
  }
  
  return response
}

export async function StatusHttpNoContent(): Promise<HttpResponse> {
  const response: HttpResponse = {
    statusCode: 204,
    body: null,
  }

  return response
}