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
	
	document.querySelectorAll('[data-modal]').forEach((button) => {
		const overlay = document.querySelector('.modal-overlay');
		const modalWindow = document.querySelector(`[data-window="${button.dataset.modal}"]`);

		button.addEventListener('click', () => {
			overlay.classList.toggle('active');
			modalWindow.classList.toggle('active');
		});

		overlay.addEventListener('click', () => {
			overlay.classList.remove('active');
			modalWindow.classList.remove('active');
		});
	});
});