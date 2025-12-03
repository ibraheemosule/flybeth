import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_ENDPOINTS, USER_TYPES } from '@travel-platform/shared-utils';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear token on 401
      await SecureStore.deleteItemAsync('authToken');
    }
    return Promise.reject(error);
  }
);

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    userType: 'consumer' | 'business';
  };
}

export interface SignupData {
  email: string;
  password: string;
  userType: 'consumer' | 'business';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  price: number;
  status: string;
  userId: string;
}

export interface BookingData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
}

class ApiService {
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await api.post(API_ENDPOINTS.AUTH.SIGNUP, data);
    return response.data;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  }

  async getTrips(): Promise<Trip[]> {
    const response = await api.get(API_ENDPOINTS.TRIPS.BASE);
    return response.data;
  }

  async bookTrip(data: BookingData): Promise<Trip> {
    const response = await api.post(API_ENDPOINTS.TRIPS.BOOK, data);
    return response.data;
  }

  async bookTripB2B(data: BookingData): Promise<Trip> {
    const response = await api.post(API_ENDPOINTS.TRIPS.B2B_BOOK, data);
    return response.data;
  }
}

export const apiService = new ApiService();
export default api;