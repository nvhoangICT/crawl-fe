import api from "../config/axios";
import { convertQueryParam } from "@/lib/utils";
import { getAdminApiBaseUrl } from "@/config/apiConfig";

class TourBusService {
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
      `${baseUrl}/tour-bus?size=${pageSize}&page=${pageNumber}&${queryParams}`
    );
  }

  async getById(id: string) {
    const baseUrl = getAdminApiBaseUrl();
    return api.get(`${baseUrl}/tour-bus/${id}`);
  }

  async create(data: any) {
    const baseUrl = getAdminApiBaseUrl();
    return api.post(`${baseUrl}/tour-bus`, data);
  }

  async update(id: string, data: any) {
    const baseUrl = getAdminApiBaseUrl();
    return api.put(`${baseUrl}/tour-bus/${id}`, data);
  }

  async changeStatus(id: string, status: "ACTIVATE" | "DEACTIVATE") {
    const baseUrl = getAdminApiBaseUrl();
    return api.put(`${baseUrl}/tour-bus/status/${status}`, {
      id,
    });
  }

  async delete(id: string) {
    const baseUrl = getAdminApiBaseUrl();
    return api.delete(`${baseUrl}/tour-bus/${id}`);
  }
}

export const tourBusService = new TourBusService();
