//location of JSON. I used this free website since getJSON seems to require https
//and Heroku charges for SSL.
var resumeDataSource = 'https://api.myjson.com/bins/wahll';

//returns string of employer name with an embedded URL.
function renderCompanyName(name, url) {
	var str = "";
	if (name != null) {
		str = "<a href=\"" + url + "\" target=\"_blank\">" + name + "</a>, ";
	};
	return str;
}

//returns string of date range of employment. Mostly it's a range between 2 dates
//(end and start) but in the case of an internship, I wanted to pass just a single entry
//(i.e. summer of 2007)
function renderDateRange(dateArray) {
	if (dateArray.length == 2) {
		return dateArray[0] + " - " + dateArray[1];
	} else {
		return dateArray[0]; //singularly expressed timeframe
	};
}

//returns string of experience bullet. It embeds URLs to relevant segments of the
//experience as well. There may be more than one embedded URL per experience bullet.
//var experience = the entire string of the experience bullet
//var url = the embedded URL[s]
//bar insertLink = where in the strings the associated URL[s] is/are embedded      
function renderExperienceBullet(experience, url, insertLink) {
	var str = experience;
	if (url != null) { //if no embedded URL, just pass back the experience bullet
		var str = "";
		var experienceStringArray = experience.split(" "); //split string into array
		//in the case that there are multiple embedded URLs in one experience bullet.
		if (Array.isArray(url)) {      
			for (var i = 0; i < url.length; i++) {
				//append embed link to beginning of proper word in string
				var link_string = "<a href=\"" + url[i] + "\" target=\"_blank\">";
        experienceStringArray[insertLink[i][0]-1] = link_string.concat(experienceStringArray[insertLink[i][0]-1]);
        //append the </a> at end of the final word
        experienceStringArray[insertLink[i][0]+insertLink[i][1]-2] += "</a>";
			}
		//only one embed link in the experience bullet
		} else {
			//append embed link to beginning of proper word in string
			var link_string = "<a href=\"" + url + "\" target=\"_blank\">";
			experienceStringArray[insertLink[0]-1] = link_string.concat(experienceStringArray[insertLink[0]-1]);
			//append the </a> at end of the final word
			experienceStringArray[insertLink[0]+insertLink[1]-2] += "</a>";        
		}
		//reassemble string with embedded links
		for (var j = 0; j < (experienceStringArray.length - 1); j++) {
			str += experienceStringArray[j] + " ";
		}
		//append the last word without a space
		str += experienceStringArray[experienceStringArray.length - 1];
	}
  return str;
}

//main function that calls and gets the JSON data. For each employment entry, it creates
//a bootstrap well, 2 columns, and populates the employer, my title, location, and date
//range of employment. Styling is defined in the css file.
$.getJSON(resumeDataSource, function(data) {
	$(data.resume).each(function() {
		var html = "";
		html += "<div class=\"well well-sg\">";
			html += "<div class=\"row\">";
				html += "<div class=\"col-md-3\">";
					html += "<h4 class=\"heading\" id=\"exptime\">" + renderDateRange(this['dates']) + "</h4>";
					$(this['location']).each(function() {
						html += "<h4 class=\"heading\" id=\"exptime\">" + this + "</h4>";
					});
				html += "</div>";
				html += "<div class=\"col-md-9\">";
					html += "<h4 class=\"mytitle\">" + renderCompanyName(this['company'], this['company_link']) + this['title'] + "</h4>";
					html += "<ul>";
						$(this['experience']).each(function () {
							//this[0] = from experience object, the text that goes in the bullet
							//this[1] = from experience object, the embedded URL[s]. null if none.
							//this[2] = from experience object, the location of embedded URL[s]. null if none.
							html += "<li>" + renderExperienceBullet(this[0], this[1], this[2]) + "</li>";
						});
					html += "</ul>";
				html += "</div>";
			html += "</div>";
		html += "</div>";
          
		$(html).appendTo(".allexp");
		
  });
});
      