import 'bootstrap/css/bootstrap.css!css';
import 'font-awesome/css/font-awesome.css!css';
import 'jquery.magnific-popup/dist/magnific-popup.css!css';

import 'jquery';
import 'jquery.event.move';
import 'jquery.magnific-popup'
import 'bootstrap';

$(function() {
    $('select.changeLang').change(function() {
        $.post('/lang', {
                lang: $('select.changeLang').val()
        }).done(function() {
            setTimeout(function() {
                location.reload(true);
            }, 1e3);
        });
    });
});
