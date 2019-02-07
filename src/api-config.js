let backendHost;

const hostname = window.location.href

if(hostname.includes('localhost')) {
  backendHost = 'http://127.0.0.1:5000';
} else{
  backendHost = 'https://clubin-tv-backend.herokuapp.com'
}

// backendHost = 'https://clubin-tv-backend.herokuapp.com'

export const API_ENDPOINT = backendHost;
export const YOUTUBE_API_KEY = 'AIzaSyCDP05L_kQ697q03OmC_OFCbC1CoLb1RDY'