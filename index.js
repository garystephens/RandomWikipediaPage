var iframeLoadCount = 0;

$(document).ready(function () {
    useSavedValueForStart();
    useSavedValueForFinish();
    setIframeHeight();
    requestOpenRandomPage();
});

$(window).resize(function () {
    setIframeHeight();
});

function setIframeHeight() {
    $("#wikipedia_page_iframe").height($(window).height() - $("#header").outerHeight() - $("#footer").outerHeight());
}

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

    iframeLoadCount = 0;
    $("#wikipedia_page_iframe").attr("src", url);

    $("#rank").text(addCommas(rank));
    $("#pageInfo").css("visibility", "visible");
}

function iframeHasLoaded() {
    iframeLoadCount++;
    if (iframeLoadCount > 1) {
        $("#pageInfo").css("visibility", "hidden");
    }
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

function openPageInNewTab() {
    window.open($("#wikipedia_page_iframe").attr("src"));
}

function addCommas(nStr) {
    nStr = String(nStr);
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}