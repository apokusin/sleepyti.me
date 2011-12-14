function zeroPad(count, num) {
    var padded = num + '';
    var pad = count - padded.length;
    for(i = 0; i < pad; i++) {
        padded = '0' + padded;
    }
    return padded;
}

$(document).ready(function() {
	// render the page -- in case you're wondering, nothing will work 
	// without javascript!
	function render() {
		// populate our lists
		for(var h = 1; h <= 12; h++) {
    		$('#hour').append('<option value="' + h + '">' + h + '</option>');
		}
		for(var m = 0; m <= 55; m += 5) {
        	$('#minute').append('<option value="' + m + '">' + zeroPad(2, m) + '</option>');
		}
		
		$('#content').show();
	}
	render();
    window.scrollTo(0,1);
	
	// calculates an hour and a half back
	function sleepback(hr, min, an) {
        var rmin = 0;
        var rhr = 0;
        var a = an;
        if(min < 30) {
            rmin = (min * 1) + (30 * 1);
            rhr = hr - 2;
        }
        else if(min >= 30) {
            rmin = min - 30;
            rhr = hr - 1;
        }
        if(rhr < 1) {
            rhr = 12 + rhr;
                        
			if(a == "AM") {
				a = "PM";
			}
			else {
				a = "AM";
			}
        }
            
		var r = [rhr, rmin, a];
		return r;
	}
	
	// knockout takes a date object and returns a
	// string with wake times!
	// time + :14 + (multiples of 90 mins)
	function knockout(rightnow) {
		var r = ''; // return string
		var hr = rightnow.getHours();
		var dhr = 0; // separate variable to display because (24 hr clock)
		var ap = '';
		
		// it takes 14 minutes to fall asleep
		var min = rightnow.getMinutes() + 14;
		if(min > 60) {
			min = min - 60;
			hr = hr + 1;
			
			if(hr >= 24) {
				if(hr == 24) {
					hr = 0; // midnight, must adjust!
				}
				else if(hr == 25) {
					hr = 1;
				}
			}
		}
		
		for(var ctr = 0; ctr < 6; ctr++) { // normal sleep schedule
			// add an hour and a half
			if(min < 30) {
				min = min + 30;
			}
			else {
				min = min - 30;
				hr = hr + 1
			}
			hr = hr + 1;
			
			if(hr == 24) {
				hr = 0;
			}
			if(hr == 25) {
				hr = 1;
			}
			
			if(hr < 12) {
				ap = ' AM';
				dhr = hr;
				if(hr == 0) {
					dhr = "12";
				}
			}
			else {
				ap = ' PM';
				dhr = hr - 12;	
			}
			if(dhr == 0) {
				dhr = 12;
			}
			if(ctr == 0) {
				if(min > 9) {
					r = r + '<div class="time label">' + dhr + ':' + min + ap + '</div>';
				}
				else {
					r = r + '<div class="time label">' + dhr + ':0' + min + ap + '</div>';
				}
			}
			else if(ctr == 4 || ctr == 5) {
				if(min > 9) {
					r = r + '<div class="time brightgreen">' + dhr + ':' + min + ap + '</div>';
				}
				else {
					r = r + '<div class="time brightgreen">' + dhr + ':0' + min + ap + '</div>';
				}
			}
			else if(ctr == 3) {
				if(min > 9) {
					r = r + '<div class="time green">' + dhr + ':' + min + ap + '</div>';
				}
				else {
					r = r + '<div class="time green">' + dhr + ':0' + min + ap + '</div>';
				}	
			}
			else {
				if(min > 9) {
					r = r + ' <div class="time label">' + dhr + ':' + min + ap + '</div>';
				}
				else {
					r = r + ' <div class="time label">' + dhr + ':0' + min + ap + '</div>';
				}
			}	
		}
		return r;
	}

	// handle "sleep now" requests
	// this currently fades out the #main id,
	// and works in a totally separate div
	$("#sleepnow").click(function() {
		var st = '';
		var answ = ''; // this is the text we return
		var d = new Date();
		answ = knockout(d); // knockout takes a Date() and returns a string of wake times
		$('#intro').hide();
		$('#picker').hide();
		$('#wake').show()
		$('#wake-times').html(answ);
		$('#wake-times').show(250);
		putads();
	});
	
	// user changes the list, so we calculate times!
	$("#picker select").change(function () {
		if($("#hour").val() == 'hour' || $("#minute").val() == 'minute') {
			return false;
		}
			
		var hr = $("#hour").val();
		var min = $("#minute").val();
		var ampm = $("#ampm").val();
		var orig = [hr, min, ampm];
		
		if(hr == 12) {
			if(ampm == "AM") {
				ampm = "PM";
			}
			else {
				ampm = "AM";
			}
		}
		
		var first = true;
		var times = new Array();
		for(var c = 1; c <= 10; c++) {
			var back = sleepback(hr, min, ampm);
			var nhr = back[0];
			var nmin = back[1];
			ampm = back[2];
			var ampmt = "";
			ampmt = back[2];
			
			// countdown from 12, but that's not
			// how am/pm system works... whoops!
			if(nhr == 12) {
				if(ampm == "AM") {
					ampmt = "PM";
				}
				else {
					ampmt = "AM";
				}
			}
			// TODO: reverse display order
			if(c == 6 || c == 4 || c == 5 || c == 3) {
				var temp = '';
				if(nmin > 9) {
					if(c == 6) {
						temp = '<div class="time">' + nhr + ':' + nmin + ' ' + ampmt + '</div>';
						times.push(temp);
					}
					else {
						temp = '<div class="time">' + nhr + ':' + nmin + ' ' + ampmt + '</div>';
						times.push(temp);
					}
				}
				else { // insert 0
					if(c == 6) {
						temp = '<div class="time">' + nhr + ':0' + nmin + ' ' + ampmt + '</div>';
						times.push(temp);
					}
					else {
						temp = '<div class="time">' + nhr + ':0' + nmin + ' ' + ampmt + '</div>';
						times.push(temp);
					}
				
				}
			}
			hr = nhr;
			min = nmin;
		}
		var txt = '';
		for(i = 3; i >= 0; i--) {
			txt = txt + times[i];
		}
		$('#picker').hide();
		$('#sleep').show()
		$('#sleep-times').html(txt)
		$('#sleep-times').show(500)
		
		var wtime = "";
		if(orig[1] > 9) {
			wtime = '<b>' + orig[0] + ':' + orig[1] + ' ' + orig[2] + '</b>';	
		}
		else {
			wtime = '<b>' + orig[0] + ':0' + orig[1] + ' ' + orig[2] + '</b>';
		}
		$('#waketime').html(wtime);
		$('#waketime').fadeIn(1000);

	});
});
