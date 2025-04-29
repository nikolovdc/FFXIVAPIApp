import api from './config/apiConfig.js';
async function test() {
    try {
  const { data } = await api.get(`/xiv/map/`);
  console.log(data);
  return data;
    } catch (error) {
  console.error(error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    test();
});