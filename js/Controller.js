/**
 * Created by RID on 19.08.2017.
 */
function Controller() {

    var data;

    var waitingData = setInterval( function () {
        if (dataRequest.getState() === true) {
            clearInterval(waitingData);
            data = dataRequest.getData();
            view.createTable(data);
        }
    }, 20);

    function renderPopUp (event) {
        var target = event.target;
        while (target != view.tableBody) {
            if (target.tagName == "TR") {
                view.createPopUp(target, data);
                return;
            }
            target = target.parentNode;
        }
    }

    function deletePopUp (event) {
        if (event.target.classList.contains("pop-up__close") || event.target.classList.contains("pop-up__close-icon")) {
            view.removePopUp();
        }
    }

    function renderSortTable(event) {
        if (event.target.tagName == 'TH' && event.target.hasAttributes("data-sort")) {
            view.sortTable(event.target.cellIndex, event.target.dataset);
        }
    }

    view.tableBody.addEventListener("click", renderPopUp);
    view.table.addEventListener("click", renderSortTable);
    app.addEventListener("click", deletePopUp);
}

var controller = new Controller();




