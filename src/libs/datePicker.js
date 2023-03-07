export default () =>  {
	let data = [];
	for (let i = 1950; i < 2050; i++) {
	  let month = [];
	  for (let j = 1; j < 13; j++) {
	    let day = [];
	    if (j === 2) {
	      for (let k = 1; k < 29; k++) {
	        day.push(k);
	      }
	      //Leap day for years that are divisible by 4, such as 2000, 2004
	      if (i % 4 === 0) {
	        day.push(29);
	      }
	    } else if (j in {
	        1: 1,
	        3: 1,
	        5: 1,
	        7: 1,
	        8: 1,
	        10: 1,
	        12: 1
	      }) {
	      for (let k = 1; k < 32; k++) {
	        day.push(k);
	      }
	    } else {
	      for (let k = 1; k < 31; k++) {
	        day.push(k);
	      }
	    }
	    let _month = {};
	    _month[j] = day;
	    month.push(_month);
	  }
	  let _date = {};
	  _date[i] = month;
	  data.push(_date);
	}
	return data
}