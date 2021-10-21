const { getCreatedDate } = () => {
  const date = new Date()
  return date.toISOString()
}

module.exports = { getCreatedDate }