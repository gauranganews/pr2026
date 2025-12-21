import axios from 'axios';
import { config } from '../config';
import { BirthData, PlanetsResponse, VDashaResponse } from '../types';

class AstrologyService {
  private baseUrl: string;
  private auth: { username: string; password: string };

  constructor() {
    this.baseUrl = config.astrology.baseUrl;
    this.auth = {
      username: config.astrology.userId,
      password: config.astrology.apiKey,
    };
  }

  private async makeRequest<T>(endpoint: string, data: BirthData): Promise<T> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${endpoint}`,
        data,
        {
          auth: this.auth,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Astrology API Error (${endpoint}):`, error.response?.data || error.message);
        throw new Error(`Failed to fetch ${endpoint}: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async getPlanets(birthData: BirthData): Promise<PlanetsResponse> {
    const response = await this.makeRequest<any>('planets', birthData);
    return response;
  }

  async getBirthDetails(birthData: BirthData): Promise<any> {
    const response = await this.makeRequest<any>('birth_details', birthData);
    return response;
  }

  async getMajorVDasha(birthData: BirthData): Promise<VDashaResponse> {
    const response = await this.makeRequest<VDashaResponse>('major_vdasha', birthData);
    return response;
  }

  async getCompleteAstroData(birthData: BirthData) {
    try {
      const [planets, birthDetails, vdasha] = await Promise.all([
        this.getPlanets(birthData),
        this.getBirthDetails(birthData),
        this.getMajorVDasha(birthData),
      ]);

      return {
        planets,
        birthDetails,
        vdasha,
      };
    } catch (error) {
      console.error('Error fetching complete astro data:', error);
      throw error;
    }
  }
}

export const astrologyService = new AstrologyService();
