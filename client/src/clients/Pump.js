/* eslint-disable no-undef */

function on(pump, cb) {
  
    return fetch('pump/on', {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
        pump: pump
        })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function off(pump, cb) {
  
    return fetch('pump/off', {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
        pump: pump
        })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Pump = { on, off };

export default Pump;
