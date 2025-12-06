import api from "../config/axios";
import { convertQueryParam } from "@/lib/utils";
import { getAdminApiBaseUrl } from "@/config/apiConfig";

class SpaService {
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
      `${baseUrl}/spa?size=${pageSize}&page=${pageNumber}&${queryParams}`
    );
  }

  async getById(id: string) {
    const baseUrl = getAdminApiBaseUrl();
    return api.get(`${baseUrl}/spa/${id}`);
  }

  async create(data: any) {
    const baseUrl = getAdminApiBaseUrl();
    return api.post(`${baseUrl}/spa`, data);
  }

  async update(id: string, data: any) {
    const baseUrl = getAdminApiBaseUrl();
    return api.put(`${baseUrl}/spa/${id}`, data);
  }

  async delete(id: string) {
    const baseUrl = getAdminApiBaseUrl();
    return api.delete(`${baseUrl}/spa/${id}`);
  }
}

export const spaService = new SpaService();
