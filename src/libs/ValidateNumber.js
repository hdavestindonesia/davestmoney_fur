export default (str) =>  {
  let result = str.replace(/[^0-9]/g, '')
  return result
}