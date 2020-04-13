import axios from 'axios';
const url = 'https://localhost:4000/api/v1.0'

const fetchYears = async () => {
  try {
    const response = await axios.get(url + '/years')
  } catch (error) {

  }
}