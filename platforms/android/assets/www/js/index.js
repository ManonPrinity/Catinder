var cats;
var current = 0;

$(document).ready(function()
{
	var cat_api = "http://catinder.samsung-campus.net/proxy.php";

	$.getJSON(cat_api, function(data)
	{
		cats = data;
		display_cat();
	});
});

function display_cat()
{
	if (current >= cats.nbResult)
	{
		no_more_cat();
		return ;
	}
	$("#cat_name").html(cats.results[current].name);
	$("#cat_pic").attr("src", cats.results[current].picUrl);
	$("#cat_age").html(cats.results[current].age);
}

function no_more_cat()
{
	$("#cats_view").css("display", "none");
	$("#nocat_view").css("display", "block");
}

var menu = false;
$("#menu_btn").click(function()
{
	if (!menu)
	{
		if (current >= cats.nbResult)
			$("#nocat_view").css("display", "none");
		else
			$("#cats_view").css("display", "none");
		$("#liked_cats").css("display", "block");
	}
	else
	{
		$("#liked_cats").css("display", "none");
		if (current >= cats.nbResult)
			$("#nocat_view").css("display", "block");
		else
			$("#cats_view").css("display", "block");
	}
	menu = !menu;
});

$("#heart_btn").click(function()
{
	$("#liked_cats").append(
		"<article>" +
			"<img src='" + cats.results[current].picUrl + "'>" +
			"<div><p><b>" + cats.results[current].name + "</b></p>" +
			"<p>" + cats.results[current].age + " ans.</p></div>" +
		"</article>"
	);
	++current;
	display_cat();
});

$("#cross_btn").click(function()
{
	++current;
	display_cat();
});
