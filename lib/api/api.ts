import axios from "axios";
import {
  Car,
  CarFilters,
  CarsResponse,
  BookingRequest,
  BookingResponse,
} from "@/types/cars";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

export interface CarsParams {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  page?: number;
  perPage?: number;
}

export const getCars = async (params: CarsParams): Promise<CarsResponse> => {
  const response = await api.get("/cars", { params });
  return response.data;
};

export const getCarFilters = async (): Promise<CarFilters> => {
  const response = await api.get("/cars/filters");
  return response.data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const response = await api.get(`/cars/${id}`);
  return response.data;
};

export const createBookingRequest = async (
  carId: string,
  data: BookingRequest,
): Promise<BookingResponse> => {
  const response = await api.post(`/cars/${carId}/booking-requests`, data);
  return response.data;
};
