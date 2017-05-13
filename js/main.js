/**
 * Created by fabian on 4/10/17.
 */
$(document).ready(function () {

    $('#navigation li').click(function() {
        $('#navigation li').removeClass('iamhere');
        $(this).addClass('iamhere');
    });

    var imageArray = {images: [
        {'file': 'img/brenda-godinez-228181.jpg', 'artist': 'Brenda Godinez'},
        {'file': 'img/luke-michael-27050.jpg', 'artist': 'Luke Michael'},
        {'file': 'img/andrew-branch-139678.jpg', 'artist': 'Andrew Branch'},
        {'file': 'img/anna-111431.jpg', 'artist': 'Anna'},
        {'file': 'img/brooke-lark-212309.jpg', 'artist': 'Brooke Lark'},
        {'file': 'img/dominique-knobben-22016.jpg', 'artist': 'Dominique Knobben'},
        {'file': 'img/george-hiles-215419.jpg', 'artist': 'George Hiles'}
    ]};
    var flowersArray = {images: [
        {'file': 'img/tavin-dotson-37590.jpg', 'artist': 'Tavin Dotson'},
        {'file': 'img/brigitte-tohm-210081.jpg', 'artist': 'Bridgette Tohm'},
        {'file': 'img/ian-baldwin-39036.jpg', 'artist': 'Ian Baldwin'},
        {'file': 'img/beatriz-perez-moya-191993.jpg', 'artist': 'Beatriz Moya'}

    ]};



    var myHTML = Mustache.to_html($('#image-section-template').html(), imageArray);
    $('#myimages-images').append(myHTML);

    var mystuff = Mustache.to_html($('#image-section-template').html(), flowersArray);
    $('#flower-images').append(mystuff);

    // Event handlers
    $('.run-functions-button').on('click', function(event) {
        var $this = $(this);
        $this.text('...');
        var $imageSection     = $this.closest('.image-section');
        var $colorThiefOutput = $imageSection.find('.color-thief-output');
        var $targetimage      = $imageSection.find('.target-image');
        showColorsForImage($targetimage, $imageSection);
    });

    var colorThief = new ColorThief();

    // Run Color Thief functions and display results below image.

    var showColorsForImage = function($image, $imageSection ) {
        var image = $image[0];
        var color = colorThief.getColor(image);
        var palette = colorThief.getPalette(image);

        var colorThiefOutput = {
            color: color,
            palette: palette

        };

//.html() used to get contents of an element in this case we are getting everything inside the mustache template
// to_html method used to select element then it is assigned properties of the variable object colorthief output
        var colorThiefOuputHTML = Mustache.to_html($('#color-thief-output-template').html(), colorThiefOutput);

        $imageSection.addClass('with-color-thief-output');
        $imageSection.find('.run-functions-button').addClass('hide');

        setTimeout(function(){
            $imageSection.find('.color-thief-output').append(colorThiefOuputHTML).slideDown();
            // If the color-thief-output div is not in the viewport or cut off, scroll down.
            var windowHeight          = $(window).height();
            var currentScrollPosition = $('body').scrollTop();
            var outputOffsetTop       = $imageSection.find('.color-thief-output').offset().top;
            if ((currentScrollPosition < outputOffsetTop) && (currentScrollPosition + windowHeight - 250 < outputOffsetTop)) {
                $('body').animate({scrollTop: outputOffsetTop - windowHeight + 200 + "px"});
            }
        }, 300);
    };

});
