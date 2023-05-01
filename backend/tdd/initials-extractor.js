module.exports = function (name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
}
