/* eslint-disable no-undef */

function search(query, cb) {
  return fetch(`/api/pump?q=${query}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
};

function clean(time) {
  return fetch(`/api/pump/clean?time=${time}`, {
    accept: 'application/json',
  });
}

function upsert(pump, cb) {

  return fetch('/api/pump/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ pump })
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function on(pump, cb) {
  
    return fetch('/api/pump/on', {
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
  
    return fetch('/api/pump/off', {
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

const Pump = { search, upsert, on, off };

export default Pump;
