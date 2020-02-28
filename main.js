// смена цвета фона для header при скроле
(function () {
    const header = document.querySelector('.header');
    const menu = document.querySelector('.header_nav');
    window.onscroll = () => {
        if (window.pageYOffset > 50 ) {
            header.classList.add('header_active');
        } else {
            header.classList.remove('header_active');
        }
    };
}());

function initMap() {
    let uluru = {lat: 55.7242928, lng: 37.577221};
    let map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 12,
            center: uluru
        });
    let marker = new google.maps.Marker({position: uluru, map: map});
}

(function () {
    const smoothScroll = function (targetEl, duration) {
        const headerElHeight = document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;

        const ease = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function (currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());