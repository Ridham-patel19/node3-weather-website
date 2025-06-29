



const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.getElementById('msg-1');
const msg2 = document.getElementById('msg-2');
const msg3 = document.getElementById('msg-3');
const outputElement = document.getElementById('outputdata');

weatherform.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value.trim();
  if (!location) return;

  msg3.classList.remove('msg-3');
  outputElement.classList.remove('hidden');
  msg3.classList.remove('hidden');

 
  outputElement.classList.add('loading');

  msg1.textContent = 'Loading...';
  msg2.textContent = '';
  msg3.textContent = '';

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      outputElement.classList.remove('loading');
       outputElement.classList.add('outputdata1')
         msg3.classList.add('msg-3');

      if (data.error) {
        msg3.classList.remove('msg-3')
        msg1.textContent = data.error;
        return;
        
      }

      msg1.textContent = data.location;
      msg2.textContent = data.currenttemprature + ' °C';
      msg3.textContent = data.description;
      

    });
  });

  console.log(location);
});
