(($) => {
	$('body').on('mousemove', '.variable_move_items', (e) => {
		let button = e.target;

		const x = e.pageX - button.offsetLeft;
		const y = e.pageY - button.offsetTop;

			$(button).css({'--x': x+'px', '--y': y+'px' });
	});
})(jQuery);