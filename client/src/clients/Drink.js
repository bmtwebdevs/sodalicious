/* eslint-disable no-undef */

function search(query, cb) {
  return fetch(`/api/drinks?q=${query}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
};

function remove(drink, cb) {
  debugger;

  return fetch('/api/drink', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'delete',
    body: JSON.stringify({
      id: drink._id
    })
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
};

function upsert(drink, cb) {

  return fetch('/api/drink', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ drink })
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}


function make(drink, size, cb) {

  return fetch(`bartender?id=${drink}&size=${size}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
};

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

const Client = { search, remove, upsert, make };

export default Client;
