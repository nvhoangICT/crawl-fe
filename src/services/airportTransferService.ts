import api from "../config/axios";
import { convertQueryParam } from "@/lib/utils";
import { getAdminApiBaseUrl } from "@/config/apiConfig";

class AirportTransferService {
  async getAll({
    pageSize,
    pageNumber,
    filter,
  }: {
    pageSize: number;
    pageNumber: number;
    filter?: any;
  }) {
    const baseUrl = getAdminApiBaseUrl();
    const queryParams = convertQueryParam(filter || {});
    return api.get(
      `${baseUrl}/airport-transfer?size=${pageSize}&page=${pageNumber}&${queryParams}`
    );
  }

  async getById(id: string) {
    const baseUrl = getAdminApiBaseUrl();
    return api.get(`${baseUrl}/airport-transfer/${id}`);
  }

  async create(data: any) {
    const baseUrl = getAdminApiBaseUrl();
    return api.post(`${baseUrl}/airport-transfer`, data);
  }

  async update(id: string, data: any) {
    const baseUrl = getAdminApiBaseUrl();
    return api.put(`${baseUrl}/airport-transfer/${id}`, data);
  }

  async changeStatus(id: string, status: "ACTIVATE" | "DEACTIVATE") {
    const baseUrl = getAdminApiBaseUrl();
    return api.put(`${baseUrl}/airport-transfer/status/${status}`, {
      id,
    });
  }

  async delete(id: string) {
    const baseUrl = getAdminApiBaseUrl();
    return api.delete(`${baseUrl}/airport-transfer/${id}`);
  }
}

export const airportTransferService = new AirportTransferService();
