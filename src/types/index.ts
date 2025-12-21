export interface BirthData {
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone: number;
}

export interface PlanetPosition {
  name: string;
  fullDegree: number;
  normDegree: number;
  speed: number;
  isRetro: string;
  sign: string;
  signLord: string;
  nakshatra: string;
  nakshatraLord: string;
  house: number;
}

export interface PlanetsResponse {
  sun: PlanetPosition;
  moon: PlanetPosition;
  mars: PlanetPosition;
  mercury: PlanetPosition;
  jupiter: PlanetPosition;
  venus: PlanetPosition;
  saturn: PlanetPosition;
  rahu: PlanetPosition;
  ketu: PlanetPosition;
  ascendant: PlanetPosition;
}

export interface AntarDasha {
  start: string;
  end: string;
  planet: string;
}

export interface MahaDasha {
  planet: string;
  start: string;
  end: string;
  antardashas?: AntarDasha[];
}

export interface VDashaResponse {
  major_vdasha: MahaDasha[];
}

export interface ForecastRequest {
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  birthPlace: string; // город
  latitude?: number;
  longitude?: number;
  timezone?: number;
}

export interface ForecastResponse {
  birthData: BirthData;
  planets: PlanetsResponse;
  periods: MahaDasha[];
  forecast: string;
}

export interface GeocodeResult {
  latitude: number;
  longitude: number;
  timezone: number;
  formattedAddress: string;
}
