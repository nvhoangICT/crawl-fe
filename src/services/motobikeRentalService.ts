import api from "../config/axios";
import { convertQueryParam } from "@/lib/utils";
import { getAdminApiBaseUrl } from "@/config/apiConfig";

class MotobikeRentalService {
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
      `${baseUrl}/motorbike?pageSize=${pageSize}&pageNumber=${pageNumber}&${queryParams}`
    );
  }

  async getById(id: string) {
    const baseUrl = getAdminApiBaseUrl();
    return api.get(`${baseUrl}/motorbike/${id}`);
  }

  async create(data: any) {
    const baseUrl = getAdminApiBaseUrl();
    return api.post(`${baseUrl}/motorbike`, data);
  }

  async update(id: string, data: any) {
    const baseUrl = getAdminApiBaseUrl();
    return api.put(`${baseUrl}/motorbike/${id}`, data);
  }

  async changeStatus(id: string, status: "ACTIVATE" | "DEACTIVATE") {
    const baseUrl = getAdminApiBaseUrl();
    return api.put(`${baseUrl}/motorbike/status/${status}`, {
      id,
    });
  }

  async delete(id: string) {
    const baseUrl = getAdminApiBaseUrl();
    return api.delete(`${baseUrl}/motorbike/${id}`);
  }
}

export const motobikeRentalService = new MotobikeRentalService();
