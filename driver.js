$(document).ready(function() {

    // VARIABLES
    var pair = [];

    var deck = shuffleDeck("aabbccddeeffgghh".split(''));

    var matched = 0; //when this reaches 16 (all pairs matched), perform next action.

    // HELPER FUNCTIONS

    //Fisher Yates Shuffle Algorithm
    //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    function shuffleDeck(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function resetPair() {
        pair = [];
    }

    function dealDeck() {
        for (let i = 0; i < 16; i++) {
            var cardId = "#c" + i;
            var picName = deck[i] + ".jpg";
            $(cardId)[0].children[1].children[0]['src'] = picName;
        } 
    }

    function transitionBackground() {
        $("body").css("background", "url(bgSecond.jpg)").fadeIn(3000);
        $("body").css("background-size", "cover");
        $("body").css("background-repeat", "no-repeat");
        $("body").css("background-position", "center center");
        $("body").css("background-attachment", "fixed");
        $("h3").css("font-family", "'Times New Roman', Times, serif");
        $("h3").css("font-weight", "bold");
        $("h3").css("text-align", "center");
        $("h3").css("vertical-align", "middle");
        $("h3").css("font-size", "3em");
        $("h3").css("color", "white");
        $("h3").css("text-shadow", "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black");
        $("h3").css("display", "block").fadeIn(5000);
    }

    // RUN IMMEDIATELY AFTER DOM IS READY.
    dealDeck();

    // JQUERY EVENT HANDLERS
    $(window).load(function() {
        // When the page has loaded
        $("body").fadeIn(5000);
    });

    $( '.card' ).flip({
        trigger: 'click'
    });

    $( '.card' ).click(function() {
        
        pair.push($(this));

        if (pair.length===2) {
            var firstPick = "#" + $(pair[0][0]).attr('id');
            var secondPick = "#" + $(pair[1][0]).attr('id');

            if (firstPick === secondPick) {
                alert('Same card picked twice. Pick another one.');
                $(firstPick).flip(false);
                $(secondPick).flip(false);
                pair.pop();
                pair.pop();
            }

            if (pair[0][0].children[1].children[0]['src'] 
                === pair[1][0].children[1].children[0]['src']) {
                //console.log('MATCH!');
                setTimeout(
                    function() {
                        $(firstPick).addClass("noselect");
                        $(secondPick).addClass("noselect");
                        matched += 2;
                        //console.log(matched);
                        if (matched===16) {
                            alert('Most Excellent!');
                            $(".card, h1, h2, p").fadeOut(200);
                            $("body").fadeOut(200);
                            transitionBackground();
                        }
                        resetPair();
                    }, 400
                );
            } else {
                //console.log('NO MATCH. TRY AGAIN');
                setTimeout(
                    function(){
                        $(firstPick).effect("shake");
                        $(secondPick).effect("shake");
                    }, 500
                );
                setTimeout(
                    function(){
                        $(firstPick).flip(false);
                        $(secondPick).flip(false);
                        resetPair();
                    }, 1000
                );
            }
        }
    });

});

