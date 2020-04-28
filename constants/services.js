const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://106.75.81.82:8434'
    : 'https://durian.ticwear.com'

export { BASE_URL }
