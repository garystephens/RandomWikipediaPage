$(document).ready(function () {
    useSavedValueForStart();
    useSavedValueForFinish();
});

function requestOpenRandomPage() {
    var start = $("#start").val();
    var finish = $("#finish").val();
    saveValueForStart(start);
    saveValueForFinish(finish);
    logToGoogleAnalytics(start, finish);
    openPageIfBoundsAreValid(start, finish);
}

function openPageIfBoundsAreValid(start, finish) {
    var url;
    var rank;

    if (isNaN(start) || Number(start) < 1 || Number(start) > paths.length) {
        alert("Please enter a 'from' value between 1 and " + paths.length);
        return;
    }

    if (isNaN(finish) || Number(finish) < 1 || Number(finish) > paths.length) {
        alert("Please enter a 'to' value between 1 and " + paths.length);
        return;
    }

    if (Number(start) >= Number(finish)) {
        alert("Please enter a 'to' value that is greater than the 'from' value");
        return;
    }

    rank = Number(start) + (Math.round(Math.random() * Number(finish - start)));
    url = "https://en.wikipedia.org/wiki/" + paths[rank];

    window.open(url);

    $("#lastPageOpened").text(url).attr("href", url);
    $("#rank").text("(rank " + rank + ")");
}

function logToGoogleAnalytics(start, finish) {
    gtag('event', start, {
        'event_category': 'open-start',
        'event_label': start,
        'value': Number(start)
    });
    gtag('event', finish, {
        'event_category': 'open-finish',
        'event_label': finish,
        'value': Number(finish)
    });
}

function saveValueForStart(start) {
    Cookies.set('start', start, { expires: 999999 });
}

function saveValueForFinish(finish) {
    Cookies.set('finish', finish, { expires: 999999 });
}

function useSavedValueForStart() {
    var start = Cookies.get('start');
    if (start !== undefined) {
        $("#start").val(start);
    }
}

function useSavedValueForFinish() {
    var finish = Cookies.get('finish');
    if (finish !== undefined) {
        $("#finish").val(finish);
    }
}

