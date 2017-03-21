var resumeDataSource = 'https://api.myjson.com/bins/jsslf';

function renderCompanyName(name, url) {
	var str = "";
	if (name != null) {
		str = "<a href=\"" + url + "\" target=\"_blank\">" + name + "</a>, ";
	};
	return str;
}
      
function renderDateRange(dateArray) {
	if (dateArray.length == 2) {
		return dateArray[0] + " - " + dateArray[1];
	} else {
		return dateArray[0];
	};
}
      
function renderExperienceBullet(experience, url, insertLink) {
	var str = experience;
	if (url != null) {
		var str = "";
		var experienceStringArray = experience.split(" ");
		if (Array.isArray(url)) {      
			for (var i = 0; i < url.length; i++) {
				var link_string = "<a href=\"" + url[i] + "\" target=\"_blank\">";
        experienceStringArray[insertLink[i][0]-1] = link_string.concat(experienceStringArray[insertLink[i][0]-1]);
        experienceStringArray[insertLink[i][0]+insertLink[i][1]-2] += "</a>";
			}
		} else {
			var link_string = "<a href=\"" + url + "\" target=\"_blank\">";
			experienceStringArray[insertLink[0]-1] = link_string.concat(experienceStringArray[insertLink[0]-1]);
			experienceStringArray[insertLink[0]+insertLink[1]-2] += "</a>";        
		}
		for (var j = 0; j < (experienceStringArray.length - 1); j++) {
			str += experienceStringArray[j] + " ";
		}
		str += experienceStringArray[experienceStringArray.length - 1];
	}
  return str;
}

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
						html += "<li>" + renderExperienceBullet(this[0], this[1], this[2]) + "</li>";
					});
				html += "</ul>";
			html += "</div>";
		html += "</div>";
	html += "</div>";
          
	$(html).appendTo(".allexp");
  });
});
      