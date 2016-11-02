$(function() {
	/******************** autocomplete **********************/
	$(".txtinput").autocomplete({
    source: function(request, response) {
        console.log(request.term);
		console.log("lovee");
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
        });
    }
});
	
/***************Search Function (Display on page)*******************/
	function search() {
    	  var searchTerm = $("#txtSearch").val();
		var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +"&format=json&callback=?"; 
		$.ajax({
			url: url,
			type: 'GET',
        	dataType: "json",
          
        	success: function(data, status, jqXHR) {
        		for(var i=0;i<data[1].length;i++){
        			$("#results").prepend("<div class='well'><a href="+data[3][i]+" target='_blank'><h2>" + data[1][i]+ "</h2>" + "<p>" + data[2][i] + "</p></a></div>");
        		}

        	}
		})
	
        
    }
	
/**********************key manuplation****************************/
	 $("#txtSearch").keypress(function(ky){
    	if(ky.keyCode===13){
    		search();
    	}
    });
	$("#btnSearch").on("click", function() {
		//remove content of las search
		$("#results").empty();
		//search and display function
		search();
	});

	  $("#txtSearch").keydown(function(){
        //remove content of las search
		$("#results").empty();
		//search and display function
		search();
    });

});