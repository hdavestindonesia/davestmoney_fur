export default (query, strArray) => {
	let result = []
	strArray.forEach((item) => {
		if (item.NamaStasiun.toLowerCase().indexOf(query.toLowerCase()) > -1) {
			result.push(item)
		}
	})
	return result
}