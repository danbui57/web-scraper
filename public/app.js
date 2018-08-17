// Grab the articles as a json

$("#scrape").on("click", function() {
$.getJSON("/articles", (data) => {
    for (var i = 0; i < data.length; i++) {
       
    $("#articles").append("<p data-id='" + data[i].title + "<br />" + data[i].link + "</p>")
}
});
});

$(document).on("click", "p", function() {
    $("#notes").empty();
    const thisId= $(this).attr("data-id");

    $.ajax({
        metod: "GET",
        url: "/articles/" + thisId
    })

    .then(function(data){
        $("#notes").append("<h2>" + data.title + "</h2>")
        $("#notes").append("<input id ='titleiput' name='title' >")
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>")
        $("#notes").append("<button data-id='" + data._id + "' id='savenote' >Save Note<.button>")

        if (data.note) {
            $("#titleinput").val(data.note.title)
            $("#bodyinput").val(data.note.body)
        }
    })
});

$(document). on("click", "#savenote", function() {
    const thisId= $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/aritcles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
    .then(function(data) {
        $("#notes").empty();
    });
    $("#titleinput").val("")
    $("#bodyinput").val("")
});
