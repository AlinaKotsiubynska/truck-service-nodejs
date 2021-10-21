const defLength = 6

const getRandomPass = (length = defLength) => {
  return [...Array(length)].map(i => (~~(Math.random() * 36)).toString(36)).join('')
}

module.exports = {
  getRandomPass
}