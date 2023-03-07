export default (report, range) => {
	return report.filter((o)=> {
		console.log((new Date(o.DepartureDate).getTime()))
		return !((new Date(o.DepartureDate).getTime() >= range[0]) && (new Date(o.DepartureDate).getTime() <= range[1]))
	})
}