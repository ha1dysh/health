const progressCircle = document.querySelectorAll('.autoplay-progress');
const delay = parseInt(document.querySelector('.swiper-hero').dataset.delay) * 1000;

new Swiper('.swiper-hero', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: { delay },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.forEach((el) => el.style.setProperty('--progress', 1 - progress));
    },
  },
});

const buyNowButtons = document.querySelectorAll('.hero .buy-now');

buyNowButtons.forEach(async (buyNowBtn) => {
  buyNowBtn.addEventListener('click', async (e) => {
    const formData = { items: [{ id: Number(e.target.dataset.productId), quantity: 1 }] };

    await fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).catch((error) => {
      console.error('Error:', error);
    });

    window.location.href = '/cart';
  });
});