import elements  from "./elements.js";

let hours, minutes, seconds, date;
let oneSecond = 0;
let lastTime = 0;

const selector = (parent, className) => parent.querySelector(`.${className}`);

const setOption = e => {
    switch (e.target.id) {
        case 'show-number':
            for (const aN of document.querySelectorAll('.atomic-number')) {
                window.getComputedStyle(aN).getPropertyValue('opacity') === '0' ? aN.style.opacity = '1' : aN.style.opacity = '0';
            }
            break;
        case 'show-group':
            for (const g of document.querySelectorAll('.group')) {
                window.getComputedStyle(g).getPropertyValue('opacity') === '0' ? g.style.opacity = '1' : g.style.opacity = '0';
            }
            break;
        case 'show-date':
            window.getComputedStyle(date).getPropertyValue('display') === 'none' ? date.style.display = 'block' : date.style.display = 'none';
            break;
    }
};

const updateTime = time => {
    const now = new Date();
    oneSecond += time - lastTime;

    if (oneSecond > 1000) {
        hours.classList = `hours element ${elements[now.getHours()].group}`;
        selector(hours, 'h').textContent = elements[now.getHours()].symbol;
        selector(hours, 'atomic-number').textContent = now.getHours();
        selector(hours, 'group').textContent = elements[now.getHours()].group;
        selector(hours, 'name').textContent = elements[now.getHours()].name;

        minutes.classList = `minutes element ${elements[now.getMinutes()].group}`;
        selector(minutes, 'm').textContent = elements[now.getMinutes()].symbol;
        selector(minutes, 'atomic-number').textContent = now.getMinutes();
        selector(minutes, 'group').textContent = elements[now.getMinutes()].group;
        selector(minutes, 'name').textContent = elements[now.getMinutes()].name;

        seconds.classList = `seconds element ${elements[now.getSeconds()].group}`;
        selector(seconds, 's').textContent = elements[now.getSeconds()].symbol;
        selector(seconds, 'atomic-number').textContent = now.getSeconds();
        selector(seconds, 'group').textContent = elements[now.getSeconds()].group;
        selector(seconds, 'name').textContent = elements[now.getSeconds()].name;

        oneSecond = 0;
    }

    lastTime = time;

    requestAnimationFrame(updateTime);
};

const init = () => {
    const today = new Date();
    const dateValue = ('0' + today.getDate()).slice(-2) + ('0' + (today.getMonth() + 1)).slice(-2) + today.getFullYear().toString().slice(-2);
    hours = selector(document, 'hours');
    minutes = selector(document, 'minutes');
    seconds = selector(document, 'seconds');
    date = selector(document, 'date');

    selector(document, 'options').addEventListener('change', setOption);

    document.querySelector(':root').style.setProperty('--date-colour', `#${dateValue}`);

    date.textContent = `Hex colour: #${dateValue}`;

    requestAnimationFrame(updateTime);
};

window.addEventListener('load', init);
