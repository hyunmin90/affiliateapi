var DNA = {};
DNA.UI = {
	init: function() {
		// this.addEvent();
	},
	snbMenu: function() {
		if(location.pathname.startsWith('/webs-test-2014/basic/1team/envy2dj/dna/console-detail.html')) {
			console.log('test');
		}
	},
	addEvent: function() {
		$('.test_modal').click(function() {
			DNA.UI.modalPopup('.modal_g');
		});
	},
	itemFilter: function() {
		var $container = $('#container'),
		$checkboxes = $('#filters input');

		$container.isotope({
			itemSelector: '.item'
		});
		// get Isotope instance
		var isotope = $container.data('isotope');
		alert(isotope);
		// add even classes to every other visible item, in current order
		function addEvenClasses() {
			isotope.$filteredAtoms.each( function( i, elem ) {
				$(elem)[ ( i % 2 ? 'addClass' : 'removeClass' ) ]('even')
			});
		}

		$checkboxes.change(function(){
			var filters = [];
			// get checked checkboxes values
			$checkboxes.filter(':checked').each(function(){
				filters.push( this.value );
			});
			// ['.red', '.blue'] -> '.red, .blue'
			filters = filters.join(', ');
			$container.isotope({ filter: filters });
			addEvenClasses();
		});

		$('#shuffle').click(function(){
			$container.isotope('shuffle');
			addEvenClasses();
		});
	}
};
$(document).ready(function() {
	DNA.UI.init();
	DNA.UI.snbMenu();
	DNA.UI.itemFilter();
});