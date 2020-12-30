$(function(){
    let mazipInput = $(".mazip_input");

    mazipInput.focus(function() {
        //alert("e!");
        if (!$(this).val()) {
            let ph = findPlaceholder($(this));
            if (ph === null) {
                return;
            }

            ph.attr("marginTop", ph.css("margin-top"));
            ph.attr("fontSize", ph.css("font-size"));
            ph.animate(
                {
                    marginTop: "-45",
                    fontSize: "14"
                },
                200,
                "linear"
            );
        }
    });

    mazipInput.focusout(function() {
        //alert("e!");
        if (!$(this).val()) {
            let ph = findPlaceholder($(this));
            if (ph === null) {
                return;
            }

            ph.animate(
                {
                    marginTop: ph.attr("marginTop"), // "-28",
                    fontSize: ph.attr("fontSize") // "24"
                },
                200,
                "linear"
            );
        }
    });

    function findPlaceholder(thisElement) {
        let parent = thisElement;
        let ph = null;

        do {
            parent = parent.parent();
            if (parent.length === 0)
            {
                alert("faild find placeholder!");
                return null;
            }

            ph = parent.children(".placeholder");
        }
        while (ph.length === 0)

        return ph;
    }
});