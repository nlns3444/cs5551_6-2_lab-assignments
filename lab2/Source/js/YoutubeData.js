function justWatch(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
         var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#justwatchkeyword").val()).replace(/%20/g, "+"),
            maxResults: 10,
            order: "viewCount",
            publishedAfter: "2017-01-01T00:00:00Z"
        });

        request.execute(function(response) {
            var results = response.result;
            $("#results").html("");
            $.each(results.items, function(index, item) {
                $.get("results.html", function(data) {
                    $("#results").append(justWatch(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                });
            });
            resetVideoHeight();
        });
    });

    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 15/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyDpFfLMM2RunPcmBhk52sgqjTXdrltkwAo");
    gapi.client.load("youtube", "v3", function() {

    });
}