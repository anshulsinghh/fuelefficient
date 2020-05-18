import axios from 'axios'
const url = 'http://localhost:4000/api/v1.0'

export const fetchYears = async () => {
  try {
    const { data } = await axios.get(`${url}/years`)
    return data
  } catch (error) {
    
  }
}

export const fetchMakes = async (year) => {
  try {
    const { data } = await axios.get(`${url}/makes?year=${year}`)
    return data
  } catch (error) {
    
  }
}

export const fetchModels = async (year, make) => {
  try {
    const { data } = await axios.get(`${url}/models?year=${year}&make="${make}"`)
    return data
  } catch (error) {
    
  }
}

export const fetchVariations = async (year, make, model) => {
  try {
    const { data } = await axios.get(`${url}/model-variations?year=${year}&make="${make}"&model="${model}"`)
    return data
  } catch (error) {
    
  }
}

export const fetchFuelData = async (year, make, model, variation) => {
  try {
    const { data } = await axios.get(`${url}/fuel-data?year=${year}&make="${make}"&model="${model}"&variation="${variation}"`)
    return data
  } catch (error) {

  }
}