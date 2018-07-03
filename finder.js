$(document).ready(function() {


$.getJSON('./dungeons.json', function(data) {
    window.dungeons = data;

    data.sort(function(a, b) {
        return a.id - b.id;
    });

    var addZero = function(number) {
        return parseInt(number) < 10 ? '0'+number : number;
    }
    
    dungeons.forEach(dungeon => {
        $('#dungeons').append(
            '<a href="http://www.kotdb.com/base' + dungeon.id + '" map="'+ dungeon.map +'">'
            + '<img src="http://www.kotdb.com/img/b' + dungeon.id + '" /><span class="id">' + addZero(dungeon.id) + '</span>'
            + '</a>'
        )
    });
});

window.finder = $('#finder');

window.update = function() {
    var finderMap = '';
    $('#finder > div').each(function() {
        if( $(this).attr('status') == 'ground' ) {
            finderMap += '1';
        } else {
            finderMap += '0';
        }
    });

    $('#dungeons > a').each(function() {
        var elementMap = $(this).attr('map');

        var toHide = false;
        for(var i = 0; i < 28; i++) {
            if( finderMap[i] == '0' ) {
                continue;
            } else if( elementMap[i] != finderMap[i] ) {
                toHide = true;
                break;
            }
        }
        if(toHide) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}

for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 7; j++) {
        var style = '';
        if(i == 0)
            style += 'border-top:none;';
        if(j == 0)
            style += 'border-left:none;';
        if(j == 6)
            style += 'border-right:none;';
        if(i == 3)
            style += 'border-bottom:none;';

        finder.append('<div style="'+style+'" class="finder-block" status="air">&nbsp;</div>');
    }
    finder.append('<br/>');
}

$('.finder-block').click(function() {
    if( $(this).attr('status') == 'ground' ) {
        $(this).attr('status', 'air');
        $(this).css('background-color', '#FFF');
    } else {
        $(this).attr('status', 'ground');
        $(this).css('background-color', '#000');
    }
    update();
});


});