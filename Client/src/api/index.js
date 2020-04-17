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