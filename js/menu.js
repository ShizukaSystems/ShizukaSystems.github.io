$(function(){
    const menuChangeScreenWidth = 768;
    let buttonMenu = $(".header_menu_button");
    let headerMenu = $(".header_menu");
    let headerMenuPageButtons = $(".header_menu_button_page");
    let html = $("html");

    function openMenu() {
        headerMenu.css("display", "block");
        html.css("overflow", "hidden");
    }

    function closeMenu() {
        headerMenu.css("display", "none");
        html.css("overflow", "auto");
    }

    buttonMenu.click(() => {
        if (headerMenu.css("display") == "none") {
            openMenu();
        }
        else {
            closeMenu();
        }
    });

    headerMenuPageButtons.click(() => {
        closeMenu();
    });

    // Close menu when width and header style change.
    $(window).resize(() => {
        if ($( window ).width() > menuChangeScreenWidth) {
            closeMenu();
        }
    });
});