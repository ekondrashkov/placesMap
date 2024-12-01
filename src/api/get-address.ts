import axios from 'axios'

export interface IAddressResponse {
  place_id?: number
  licence?: string
  osm_type?: string
  osm_id?: number
  lat?: string
  lon?: string
  display_name?: string
  address?: {
    road?: string
    suburb?: string
    city?: string
    city_district?: string
    county?: string
    state?: string
    ISO3166_2_lvl4?: string
    postcode?: string
    country?: string
    country_code?: string
    tourism?: string
    neighbourhood?: string
  }
  boundingbox?: string[]
  error?: string
}

export const getAddress = async (lat: number, lon: number): Promise<IAddressResponse> => {
  try {
    const { data } = await axios.get('https://geocode.maps.co/reverse', {
      params: {
        lat,
        lon,
        api_key: 'YOUR_API_KEY',
      },
    })
    if (data.error) {
      throw new Error(data.error)
    }

    return data as IAddressResponse
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An unknown error occurred')
  }
}
