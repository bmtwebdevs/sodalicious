/* eslint-disable no-undef */

function search(query, cb) {
  return fetch(`drinks?q=${query}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
};

function remove(id, cb) {
  
  return fetch('drink', {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: 'delete',
        body: JSON.stringify({
            id: id
        })
    })
    .then(checkStatus)
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

const Client = { search, remove };

export default Client;
