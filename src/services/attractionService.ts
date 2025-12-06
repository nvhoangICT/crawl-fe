import api from "../config/axios";
import { convertQueryParam } from "@/lib/utils";
import { getAdminApiBaseUrl } from "@/config/apiConfig";

class AttractionService {
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
      `${baseUrl}/attraction?size=${pageSize}&page=${pageNumber}&${queryParams}`
    );
  }

  async getById(id: string) {
    const baseUrl = getAdminApiBaseUrl();
    return api.get(`${baseUrl}/attraction/${id}`);
  }

  async create(data: any) {
    const baseUrl = getAdminApiBaseUrl();
    return api.post(`${baseUrl}/attraction`, data);
  }

  async update(id: string, data: any) {
    const baseUrl = getAdminApiBaseUrl();
    return api.put(`${baseUrl}/attraction/${id}`, data);
  }

  async changeStatus(id: string, status: "ACTIVATE" | "DEACTIVATE") {
    const baseUrl = getAdminApiBaseUrl();
    return api.put(`${baseUrl}/attraction/status/${status}`, {
      id,
    });
  }

  async delete(id: string) {
    const baseUrl = getAdminApiBaseUrl();
    return api.delete(`${baseUrl}/attraction/${id}`);
  }
}

export const attractionService = new AttractionService();
