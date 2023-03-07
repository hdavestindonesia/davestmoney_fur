import capitalizeFirstLetter from '../libs/capitalizeFirstLetter';

export default (string) => string.toLowerCase().split(' ').map(c=> {
	if (c == 'dan') {
		return 'dan'
	} else {
		return capitalizeFirstLetter(c)
	};
}).join(' ')