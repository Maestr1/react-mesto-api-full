export const apiConfig = {
  baseUrl: (process.env.NODE_ENV === 'production') ? 'https://api.maestr-mesto.nomoredomains.club' : 'http://localhost:3000',
  // baseUrl: 'https://api.maestr-mesto.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json'
  }
};
