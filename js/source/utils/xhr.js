function setHeaders(req, url, obj) {
  req.setRequestHeader('Accept', 'application/vnd.api+json');
  req.setRequestHeader('Content-Type', 'application/vnd.api+json');
}

export function makeRequest(opts) {
  let { method, url, data } = opts;
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    let json = {}
    xhr.open(method, url);
    xhr.onload = function () {
      try {
        json = JSON.parse(xhr.response);
      } catch (e) {
        json = {};
      }

      if (this.status >= 400) {
        let error = new Error(json.error || json.message || xhr.responseText || 'unexpected error')
        error.status_code = this.status
        reject({
          error: error,
          response: json
        });
        return;
      }

      resolve(json)
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    }

    setHeaders(xhr, url, data);
    if (data && typeof data === 'object') {
      data = JSON.stringify(data);
    }
    xhr.send(data);
  });
}
