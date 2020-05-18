import axios from 'axios'

// The API's URL
const url = 'http://localhost:4000/api/v1.0'

/**
 * fetchYears queries the API to fetch FuelEfficient's available car years.
 */
export const fetchYears = async () => {
  try {
    const { data } = await axios.get(`${url}/years`)
    return data
  } catch (error) {}
}

/**
 * fetchMakes queries the API to fetch the makes available for a particular year
 * 
 * @param year: the year parameter of the query
 */
export const fetchMakes = async (year) => {
  try {
    const { data } = await axios.get(`${url}/makes?year=${year}`)
    return data
  } catch (error) {}
}

/**
 * fetchModels queries the API to fetch the models available for a particular
 * year and make.
 * 
 * @param year: the year parameter of the query
 * @param make: the make parameter of the query
 */
export const fetchModels = async (year, make) => {
  try {
    const { data } = await axios.get(`${url}/models?year=${year}&make="${make}"`)
    return data
  } catch (error) {}
}

/**
 * fetchVariations queries the API to fetch the variations of a particular
 * year/make/model of a car
 * 
 * @param year: the year of the car 
 * @param make: the make of the car 
 * @param model: the model of the car 
 */
export const fetchVariations = async (year, make, model) => {
  try {
    const { data } = await axios.get(`${url}/model-variations?year=${year}&make="${make}"&model="${model}"`)
    return data
  } catch (error) {}
}

/**
 * fetchFuelData queries the API to fetch the mpg and fuel data of a particular
 * car given its year/make/model/variation
 * 
 * @param year: the year of the car 
 * @param make: the make of the car 
 * @param model: the model of the car 
 * @param variation: the variation of the car
 */
export const fetchFuelData = async (year, make, model, variation) => {
  try {
    const { data } = await axios.get(`${url}/fuel-data?year=${year}&make="${make}"&model="${model}"&variation="${variation}"`)
    return data
  } catch (error) {}
}