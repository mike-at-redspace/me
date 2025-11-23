export const calculateStardate = () => {
  const now = new Date()

  // Day of year
  const startOfYear = new Date(now.getFullYear(), 0, 0)
  const diff = now - startOfYear
  const oneDay = 1000 * 60 * 60 * 24
  const day = Math.floor(diff / oneDay)

  // Percent of day (0–99)
  const totalMinutes = now.getHours() * 60 + now.getMinutes()
  const timePercent = Math.floor(totalMinutes / 14.4)

  // Seconds and decimal
  const seconds = now.getSeconds().toString().padStart(2, '0')

  // Stardate format: 4YY.DD.PP.S.D
  const stardate = `4${
    now.getFullYear() % 100
  }.${day}.${timePercent}.${seconds}`

  return stardate
}
