import api from "../config/axios";
import { convertQueryParam } from "@/lib/utils";
import { getAdminApiBaseUrl } from "@/config/apiConfig";

class MarketplaceService {
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
      `${baseUrl}/marketplace?size=${pageSize}&page=${pageNumber}&${queryParams}`
    );
  }

  async getById(id: string) {
    const baseUrl = getAdminApiBaseUrl();
    return api.get(`${baseUrl}/marketplace/${id}`);
  }

  async create(data: any) {
    const baseUrl = getAdminApiBaseUrl();
    return api.post(`${baseUrl}/marketplace`, data);
  }

  async update(id: string, data: any) {
    const baseUrl = getAdminApiBaseUrl();
    return api.put(`${baseUrl}/marketplace/${id}`, data);
  }

  async delete(id: string) {
    const baseUrl = getAdminApiBaseUrl();
    return api.delete(`${baseUrl}/marketplace/${id}`);
  }
}

export const marketplaceService = new MarketplaceService();
