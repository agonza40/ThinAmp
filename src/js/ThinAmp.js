/*global $, document */
/**
 * Created by agonza40 on 3/19/14.
 */

var audio,
    playlist,
    trackNum = 0;

function playAudio() {
    "use strict";

    audio.play();
}
function stopAudio() {
    "use strict";

    audio.pause();

    audio.currentTime = 0;
}
function pauseAudio() {
    "use strict";

    audio.pause();
}

function formatTime(time) {
    "use strict";
    var seconds,
        minutes,
        hours,
        mod;

    hours = Math.floor(time / 3600);

    mod =  Math.floor(time % 3600);

    minutes = Math.floor(mod / 60);

    seconds = mod % 60;

    return (hours ? hours + ":" : "") + minutes + ":" + ("0" + seconds).slice(-2);
}

function updateTime() {
    "use strict";

    $("#playtime").text(formatTime(audio.currentTime) + "/" + formatTime(audio.duration));

}

$(document).ready(function () {
    "use strict";

    audio = $("audio")[0];

    $("#play").click(playAudio);

    $("#stop").click(stopAudio);

    $("#pause").click(pauseAudio);

    $("audio").on("timeupdate", updateTime);

    playlist = localStorage.playlist || [
        {
            fileName:"../audio/Allegro.mp3",
            name: "Test1"
        },
        {
            name: "Test2",
            fileName: "../audio/MenuettoAndTrioallegretto.mp3"
        },
        {
            name: "Test3",
            fileName: "../audio/Romanzeandante.mp3"
        },
        {
            name:"Test4",
            fileName: "../audio/Rondoallegro.mp3"
        }
    ];
    
    if (!localStorage.playlist) {
        
        localStorage.setItem("playlist", JSON.stringify(playlist));
        console.log("Playlist Set");
    } else {
        playlist = JSON.parse(playlist);
        console.log("Playlist Loaded");
    }

    $.each(playlist, function (index) {
        
        $("#playlist").append("<li>" + playlist[index].name + "</li>");
    });
        
    audio.src = playlist[trackNum].fileName;
    
    $("#next").click(function () {
    
        if(trackNum <= 0) {
            trackNum = playlist.length;
        }
        
        --trackNum;

        audio.src = playlist[trackNum].fileName;
        
        audio.load();
        
        audio.play();
    });

    $("#previous").click(function () {
        "use strict";

        trackNum = (trackNum + 1) % playlist.length;
        
        audio.src = playlist[trackNum].fileName;
        
        audio.load(playlist[trackNum].fileName);
        
        audio.play();
    });

    //$("#playlist").sortable();
    
    $("#playlist > li").click(function () {
        
        trackNum = $(this).index();
        
        audio.src = playlist[trackNum].fileName;
        
        audio.load(playlist[trackNum].fileName);
        
        audio.play();
    });
    $(".eq_slider").draggable({axis: "y", containment:"parent"});
    
});