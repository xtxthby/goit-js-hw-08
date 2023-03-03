import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
// передаємо плеєр констуктору
const player = new Player(iframe);
// викличе зворотній виклик , зберігаємо час відтворення
const onPlay = function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
};
// додаємо обробник події який оновлюе час відтворення
player.on('timeupdate', throttle(onPlay, 1000));
// передаю час відтворення з сховища
const currentTime = Number(localStorage.getItem('videoplayer-current-time'));

player.setCurrentTime(currentTime).then(function (seconds) {
    //  секунди = фактичний час, який шукав гравець
}).catch(function (error) {
    switch (error.name) {
        case 'RangeError':
            // час був меншим за 0 або більшим за тривалість відео
            break;
        default:
            // сталася інша помилка
            break;
    }
});

