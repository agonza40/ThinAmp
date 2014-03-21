/*global $, document */
/**
 * Created by agonza40 on 3/19/14.
 */

var audio;

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
//
//$("#play").click(function () {
//    "use strict";
//
//    audio.play();
//});
//
//$("#play").click(function () {
//    "use strict";
//
//    audio.play();
//});
//
});