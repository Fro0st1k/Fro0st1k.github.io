function DataRequest() {

    var state = false;
    var data;

    function xhrRequest (method, url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    callback(xhr.responseText);
                }
                else throw Error("Connection problem");
            }
        };
        xhr.send(null);
    }

    function responseData (jsonData) {
        var objData = JSON.parse(jsonData);
        data = objData.results;
        state = true;
    }

    this.getData = function () {
        return data;
    };

    this.getState = function() {
        return state;
    };

    this.init = function(method, url) {
        xhrRequest(method, url, responseData);
    }
}

var dataRequest = new DataRequest();

dataRequest.init("GET", "https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture");


























