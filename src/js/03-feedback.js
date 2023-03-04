import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';
// ключ для сховища ми парсимо i записуємо в formData
let formData = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(storageFormData, 500));
form.addEventListener('submit', onFormSubmit);
reloadPage();

function storageFormData(e) {
    // якщо нема то запише, якщо є перезапише
    formData[e.target.name] = e.target.value;
    // записує по ключу в localStorage і перетвореному значенню в одном обєкті
    localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

// прибирає записи після submit
function onFormSubmit(e) {
    e.preventDefault();
    console.log(formData);
    e.currentTarget.reset();
    // форму відправили і очистили 
    localStorage.removeItem(LOCAL_KEY);
    
    formData = {};
}

function reloadPage() {
    // при форс мажорі якщо вибило і там залишились дані то вони не зникнуть 
    if (formData) {
      let { email, message } = form.elements;
      email.value = formData.email || '';
      message.value = formData.message || '';
    }
}