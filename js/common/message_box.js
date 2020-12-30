/**
 * Created by m3ik on 06.01.2018.
 * Refactor by M3ik Shizuka on 11.05.2020.
 */
function messageBox(message, bGood, vMessageBoxBlock, color = null) {
    if (vMessageBoxBlock == undefined) {
        alert("[ERROR] function messageBox(): vMessageBoxBlock not define!");
        return;
    }

    let vBackgroundColor = null;
    let vBorderColor = null;

    if (color) {
        vBackgroundColor = color.bg;
        vBorderColor = color.border;
    }
    else if (bGood) {
        vBackgroundColor = "rgba(0, 255, 0, 0.145)";
        vBorderColor = "#00ff00";
    }
    else {
        vBackgroundColor = "rgba(255, 0, 0, 0.145)";
        vBorderColor = "#ff0300";
    }

    let jqvMessageBoxBlock = $(vMessageBoxBlock);
    jqvMessageBoxBlock.children(".message_box").children("div").html(message);

    // let elemMessageBox = vMessageBoxBlock.querySelector(".message_box")
    // let elemDiv = elemMessageBox.querySelector("div")
    // elemDiv.innerText = message

    if (jqvMessageBoxBlock.css("display") === "none") {
        messageBoxUpdateInfo(jqvMessageBoxBlock, message, vBackgroundColor, vBorderColor);
        var vHeight = jqvMessageBoxBlock.css("height");
        jqvMessageBoxBlock.css("height", "0");
        jqvMessageBoxBlock.css("display", "block");
        jqvMessageBoxBlock.animate(
            {
                height: vHeight
            },
            500
        );
    }
    else {
        jqvMessageBoxBlock.animate(
            {
                "backgroundColor": vBackgroundColor,
                "borderColor": vBorderColor,
            },
            500
        );
    }
}

function messageBoxUpdateInfo(jqvMessageBoxBlock, message, vBackgroundColor, vBorderColor) {
    jqvMessageBoxBlock.css("background-color", vBackgroundColor);
    jqvMessageBoxBlock.css("border-color", vBorderColor);
}