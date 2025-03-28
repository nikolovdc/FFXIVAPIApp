import axios from 'axios';

const options = { method: 'GET', url: 'https://v2.xivapi.com/api/sheet/Action'};

try {
  const { data } = await axios.request(options);
  console.log(data); 
} catch (error) {
  console.error(error);
}
