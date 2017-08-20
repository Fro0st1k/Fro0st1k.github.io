/**
 * Created by user on 18.08.2017.
 */
function View() {

    var that = this;
    this.table = document.querySelector(".table");
    this.tableBody = document.querySelector(".table__body");

    function createElement (tag, options) {
        var elem = document.createElement(tag);
        if (options) {
            elem.className = options.class || "";
            elem.src = options.src || "#";
            elem.textContent = options.text;
            if (options.childrens) {
                options.childrens.forEach( function (item) {
                    elem.appendChild(item);
                });
            }
        }
        return elem;
    }

    function cssAnimation (elem, animationName, delay) {
        setTimeout( function() {
            elem.classList.toggle(animationName)
        }, delay);
    }

    function ucFirst (str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    this.createTable = function (data) {
        var rows = data || [];
        rows.forEach( function (item, i) {
            var imgPhoto = createElement("img", {src: item.picture.medium});
            var tdPhoto = createElement("td", {childrens: [imgPhoto]});
            var tdTitle = createElement("td", {text: item.name.title});
            var tdFirstName = createElement("td", {text: item.name.first});
            var tdLastName = createElement("td", {text: item.name.last});
            var tr = createElement("tr", {childrens: [tdPhoto, tdTitle, tdFirstName, tdLastName]});
            tr.setAttribute("data-user-number", i);
            that.tableBody.appendChild(tr); //render
        });
    };

    this.createPopUp = function (target, data) {
        var number = target.dataset.userNumber;
        var userPhotoImg = createElement("img", {src: data[number].picture.large, alt: "photo"});
        var userPhoto = createElement("div", {class: "user__photo", childrens: [userPhotoImg]});
        var userNameH3 = createElement("h3",{text: data[number].name.title + " " + ucFirst(data[number].name.first) + " " + ucFirst(data[number].name.last)});
        var userName = createElement("div", {class: "user__name", childrens: [userNameH3]});
        var userInfoState = createElement("p", {text: "State: " + ucFirst(data[number].location.state)});
        var userInfoCity = createElement("p", {text: "City: " + ucFirst(data[number].location.city)});
        var userInfoStreet = createElement("p", {text: "Street:. " + data[number].location.street});
        var userInfo = createElement("div", {class: "user__info", childrens: [userInfoState, userInfoCity, userInfoStreet]});
        var userContactsH4 = createElement("h4", {text: "Contacts:"});
        var userContactsEmail = createElement("p", {text: "Email: " + data[number].email});
        var userContactsPhone = createElement("p", {text: "Phone: " + data[number].phone});
        var userContacts = createElement("div", {class: "user__contacts", childrens: [userContactsH4, userContactsEmail, userContactsPhone]});
        var popUpCloseIcon = createElement("div",{class: "pop-up__close-icon pop-up__close-icon--medium"});
        var popUpClose = createElement("div",{class: "pop-up__close", childrens: [popUpCloseIcon]});
        var popUp = createElement("div", {class: "pop-up", childrens: [userPhoto, userName, userInfo, userContacts, popUpClose]});
        var wrapper = createElement("div", {class: "wrapper"});
        app.appendChild(popUp);
        app.appendChild(wrapper);
        cssAnimation(wrapper,"fade-in-half", 20);
        cssAnimation(popUp, "fade-in", 20);
    };

    this.removePopUp = function () {
        var wrapper = document.querySelector(".wrapper");
        var popUp = document.querySelector(".pop-up");
        cssAnimation(wrapper,"fade-in-half", 0);
        cssAnimation(popUp, "fade-in", 0);
        setTimeout( function () {
            app.removeChild(wrapper);
            app.removeChild(popUp);
        }, 240)
    };

    this.sortTable = function (columnNumber, sortType) {
        var tableRows = [].slice.call(that.tableBody.rows);

        function compare(rowA, rowB) {
            return rowA.cells[columnNumber].innerHTML > rowB.cells[columnNumber].innerHTML ? 1 : -1;
        }

        if (sortType.sort === "false") {
            tableRows.sort(compare);
            sortType.sort = "true";
        } else {
            tableRows.sort(compare).reverse();
            sortType.sort = "false";
        }
        that.table.removeChild(that.tableBody);
        tableRows.forEach( function(row) {
            that.tableBody.appendChild(row);
        });
        that.table.appendChild(that.tableBody);
    }
}

var view = new View();

