var pattern = [];
var attemps = 0;
var translates = {
    1: "blue",
    2: "green",
    3: "yellow",
    4: "red"
}

function translate(number){
    if(translates.hasOwnProperty(number)){
        return translates[number];
    } else{
        return "";
    }
}

function play(){
    var random = Math.floor(Math.random() * 4 ) + 1;
    var color = translate(random);
    var audio = new Audio("./sounds/" + color + ".mp3");
        
    $("." + color).addClass("pressed");
    setTimeout(function(){
        $("." + color).removeClass("pressed");
    }, 200);
        
    pattern.push(color);
    audio.play();
}

function reset(){
    pattern = [];
    attemps = 0;
}

function check(color){
    var patternLength = pattern.length;

    if(color == pattern[attemps]){
        attemps++;
        if(attemps == patternLength){
            setTimeout(function(){
                play();
                console.log(pattern[pattern.length - 1]);
                $("h1").text("level " + pattern.length);
                attemps = 0;
            }, 800)
        }
    } else{
        var error = new Audio("./sounds/wrong.mp3");
        error.play();
        $("h1").text("Try again!");
        $("body").addClass("game-over");
        $("h1").addClass("game-over");

        reset();

        setTimeout(function(){
            $("h1").text("Press A key to start");
            $("body").removeClass("game-over");
            $("h1").removeClass("game-over");
        }, 500)
    }
}

$("button").on("click", function(){
    var color = $(this).attr("class");
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();

    check(color);
});

$(document).on("keypress", function(){
    reset();
    play();
    console.log(pattern[pattern.length - 1]);
    $("h1").text("level " + pattern.length);
});