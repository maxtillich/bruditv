/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'boilerthousand\'">' + entity + '</span>' + html;
	}
	var icons = {
		'ic-chat-stroke': '&#xe600;',
		'ic-download': '&#xe601;',
		'ic-star-fill': '&#xe602;',
		'ic-arrow-down': '&#xe603;',
		'ic-arrow-up': '&#xe604;',
		'ic-social-dailymotion': '&#xe605;',
		'ic-arrow-left': '&#xe606;',
		'ic-arrow-next-light-stroke': '&#xe607;',
		'ic-arrow-next': '&#xe608;',
		'ic-arrow-previous-fill': '&#xe609;',
		'ic-arrow-previous-light-stroke': '&#xe60a;',
		'ic-arrow-previous': '&#xe60b;',
		'ic-arrow-right': '&#xe60c;',
		'ic-cancel-fill': '&#xe60d;',
		'ic-cancel-stroke': '&#xe60e;',
		'ic-cancel': '&#xe60f;',
		'ic-chat': '&#xe610;',
		'ic-check-fill': '&#xe611;',
		'ic-check-stroke': '&#xe612;',
		'ic-check': '&#xe613;',
		'ic-drop-down': '&#xe614;',
		'ic-drop-up': '&#xe615;',
		'ic-expand-stroke': '&#xe616;',
		'ic-fullscreen-stroke': '&#xe617;',
		'ic-pause-fill': '&#xe618;',
		'ic-pause-stroke': '&#xe619;',
		'ic-pause': '&#xe61a;',
		'ic-play-fill': '&#xe61b;',
		'ic-play-stroke': '&#xe61c;',
		'ic-play': '&#xe61d;',
		'ic-remindme-fill': '&#xe61e;',
		'ic-remindme-stroke': '&#xe61f;',
		'ic-remindme': '&#xe620;',
		'ic-reply': '&#xe621;',
		'ic-repost': '&#xe622;',
		'ic-search': '&#xe623;',
		'ic-settings': '&#xe624;',
		'ic-share': '&#xe625;',
		'ic-social-facebook': '&#xe626;',
		'ic-social-soundcloud': '&#xe627;',
		'ic-social-twitter': '&#xe628;',
		'ic-social-youtube': '&#xe629;',
		'ic-star': '&#xe62a;',
		'ic-tracklist': '&#xe62b;',
		'ic-user-fill': '&#xe62c;',
		'ic-user-stroke': '&#xe62d;',
		'ic-user': '&#xe62e;',
		'ic-logo-dailymotion': '&#xe62f;',
		'ic-logo-soundcloud': '&#xe630;',
		'ic-logo-vimeo': '&#xe631;',
		'ic-logo-youtube': '&#xe632;',
		'ic-chat-stroke2': '&#xe633;',
		'ic-download2': '&#xe634;',
		'ic-popup': '&#xe635;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/ic-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
