import { API_ENDPOINTS } from "../constants";

export interface Country {
  name: string;
  iso2: string;
  iso3: string;
}

export interface State {
  name: string;
  state_code: string;
}

export interface City {
  name: string;
}

interface CountriesResponse {
  error: boolean;
  msg: string;
  data: Country[];
}

interface StatesResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso3: string;
    states: State[];
  };
}

interface CitiesResponse {
  error: boolean;
  msg: string;
  data: string[];
}

// Cache for countries and states to avoid repeated API calls
let countriesCache: Country[] | null = null;
const statesCache: Map<string, State[]> = new Map();
const citiesCache: Map<string, string[]> = new Map();

export async function fetchCountries(): Promise<Country[]> {
  if (countriesCache) {
    return countriesCache;
  }

  try {
    const response = await fetch(API_ENDPOINTS.COUNTRIES);
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    const data: CountriesResponse = await response.json();
    countriesCache = data.data || [];
    return countriesCache;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}

export async function fetchStates(countryIso2: string): Promise<State[]> {
  const cacheKey = countryIso2.toUpperCase();
  
  if (statesCache.has(cacheKey)) {
    return statesCache.get(cacheKey)!;
  }

  try {
    const response = await fetch(API_ENDPOINTS.STATES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: countryIso2 }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch states");
    }

    const data: StatesResponse = await response.json();
    const states = data.data?.states || [];
    statesCache.set(cacheKey, states);
    return states;
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
}

export async function fetchCities(countryIso2: string, stateName: string): Promise<string[]> {
  const cacheKey = `${countryIso2.toUpperCase()}-${stateName}`;
  
  if (citiesCache.has(cacheKey)) {
    return citiesCache.get(cacheKey)!;
  }

  try {
    const response = await fetch(API_ENDPOINTS.CITIES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: countryIso2, state: stateName }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }

    const data: CitiesResponse = await response.json();
    const cities = data.data || [];
    citiesCache.set(cacheKey, cities);
    return cities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}
