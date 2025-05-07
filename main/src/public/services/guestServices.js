import { getLocal, setLocal } from './localUtils.js';

const createGuest = async () => {	
  const guest = getLocal('guest');
  if (!guest) {
    const guestName = `guest_${Date.now()}`;
    setLocal('guest', guestName);
    console.log('Guest creation request received at: ', new Date().toLocaleTimeString());
  }
};

export { 
  createGuest  
};