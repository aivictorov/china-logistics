// Clients carousel

$(document).ready(function () {
	const owl = $(".partners .owl-carousel");
	const btnPrev = $(".partners .slider__btn-prev");
	const btnNext = $(".partners .slider__btn-next");

	owl.owlCarousel(
		{
			loop: true,
			items: 6,
			nav: false,
			dots: false
		}
	);

	btnPrev.click(() => owl.trigger('prev.owl.carousel'));
	btnNext.click(() => owl.trigger('next.owl.carousel'));
});

// Partners carousel

$(document).ready(function () {
	const owl = $(".clients .owl-carousel");
	const btnPrev = $(".clients .slider__btn-prev");
	const btnNext = $(".clients .slider__btn-next");

	owl.owlCarousel(
		{
			loop: true,
			items: 6,
			nav: false,
			dots: false
		}
	);

	btnPrev.click(() => owl.trigger('prev.owl.carousel'));
	btnNext.click(() => owl.trigger('next.owl.carousel'));
});

// Tabs 

window.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('.tab').forEach((tab) => {
		const button = tab.querySelector('.tab__button');
		const icon = tab.querySelector('.tab__icon');
		const content = tab.querySelector('.tab__content');

		button.addEventListener('click', () => {
			icon.classList.toggle('active');
			content.classList.toggle('active');
		});
	});
});

// Modal windows

window.addEventListener('DOMContentLoaded', () => {
	
	document.querySelectorAll('button[modal-button]').forEach((button) => {
		const modal = document.querySelector(`div[modal-window="${button.getAttribute('modal-button')}"]`);

		if (modal) {
			const content = modal.querySelector('.modal__content');

			button.addEventListener('click', () => {
				modal.classList.add('active');
				document.body.classList.add('no-scroll');
			});

			content.addEventListener('click', (event) => {
				event.stopPropagation();
			});

			modal.addEventListener('click', () => {
				modal.classList.remove('active');
				document.body.classList.remove('no-scroll');
			});
		};
	});

	alignModalWindows();

	window.addEventListener('resize', alignModalWindows);
	
	function alignModalWindows() {
		document.querySelectorAll('div[modal-window]').forEach((modal) => {
			const content = modal.querySelector('.modal__content');
			if (content.clientHeight <= window.innerHeight - 80) {
				content.classList.add('center');
			} else {
				content.classList.remove('center');
			};
		});
	};
});