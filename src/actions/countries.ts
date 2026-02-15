'use server';
import type { Country } from '../type/country';
import { CountryApiItem } from '../type/country';
export async function getCountries() {
  try {
    const response = await fetch(
      `https://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=${process.env.FLAG_API_KEY}&returnType=JSON&numOfRows=999`,
    );
    const data = await response.json();
    const items = Array.isArray(data?.response.body?.items?.item)
      ? data.response.body.items.item
      : [];
    const countries: Country[] = items.map((item: CountryApiItem) => ({
      name: item.country_nm,
      flag: item.download_url,
      countryCode: item.country_iso_alp2,
    }));
    return countries;
  } catch (error) {
    console.log('Failed to fetch countries:', error);
    return [];
  }
}
