/**
 * Created by m3ik on 11.02.2018.
 */
$(function(){
    var buttonBlockDown = $(".drop_down_block_title"); // button

    buttonBlockDown.click(function() {
        var blockDropDownContent = $(this).parents().children(".drop_down_content");
        if (blockDropDownContent.height() > 0) {
            blockDropDownContent.animate(
                {
                    height: "0px",
                    opacity: 0
                },
                500
            );
        }
        else {
            var blockDropDownBlockEnd = blockDropDownContent.children(".drop_down_block_end");
            var val = blockDropDownBlockEnd.offset().top - $(this).offset().top;
            blockDropDownContent.animate(
                {
                    height: val+"px",
                    opacity: 1
                },
                500
            );
        }
    });
});