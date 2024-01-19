document.addEventListener('click', function(e) {
    const el = e.target;
    const icon = document.querySelector('.icon');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('header');
    const lista = document.querySelector('header ul');

    if (el.className === 'icon') {
        if (nav.className === 'nav') {
            nav.classList.add('show');
            icon.setAttribute('src', 'img/close.svg');
            header.classList.add('sub');
            lista.classList.add('lista');
        } else {
            nav.classList.remove('show');
            icon.setAttribute('src', 'img/menu.svg');
            header.classList.remove('sub');
            lista.classList.remove('lista');
        };
    };
});