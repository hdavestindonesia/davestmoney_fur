import capitalizeFirstLetter from '../libs/capitalizeFirstLetter';

export default (string) => capitalizeFirstLetter(string).replace(/([A-Z])/g, ' $1').trim()