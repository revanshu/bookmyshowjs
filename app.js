(function() {
  let body = document.getElementById("body");
  let normalDiv = document.getElementById("normal");
  let executiveDiv = document.getElementById("executive");
  let submitButton = document.getElementById("submit");
  let seatsArr = [];
  let userSelectedSeat = 5;
  let allowOtherSelection = 0;

  function Seat(row, seatNum, type) {
    this.row = row;
    this.seat = seatNum;
    this.available = true;
    this.type = type;
    this.selected = false;
  }

  const seatsClicked = e => {
    let target = e.target;
    let parent = target.parentElement.parentElement;
    let parentId = parent.id;
    if (allowOtherSelection) {
      let splitId = target.id.split("-");
      let row = splitId[2];
      let seat = splitId[3];
      let count = 1;
      for (let i = 0; i < seatsArr.length; i++) {
        if (
          seatsArr[i].available &&
          seatsArr[i].row.toString() === row &&
          seatsArr[i].seat === Number(seat) &&
          seatsArr[i].type === parentId &&
          !seatsArr[i].selected
        ) {
          seatsArr[i].selected = true;
          markSelected(target.id);
          allowOtherSelection = allowOtherSelection - 1;
        }
      }
      return;
    }
    markOtherUnselected();
    // markSelected(target.id);
    let splitId = target.id.split("-");
    let row = splitId[2];
    let seat = splitId[3];
    let count = 0;
    for (let i = 0; i < seatsArr.length; i++) {
      if (
        !seatsArr[i].available &&
        seatsArr[i].row.toString() === row &&
        seatsArr[i].seat === Number(seat) &&
        seatsArr[i].type === parentId
      ) {
        break;
      }
      if (count >= userSelectedSeat) {
        break;
      }
      if (
        seatsArr[i].row.toString() === row &&
        seatsArr[i].available &&
        seatsArr[i].seat >= Number(seat) &&
        seatsArr[i].type === parentId
      ) {
        let id =
          "seat-" +
          seatsArr[i].type +
          "-" +
          seatsArr[i].row +
          "-" +
          seatsArr[i].seat;
        markSelected(id);
        seatsArr[i].selected = true;
        count++;
      }
    }
    if (count < userSelectedSeat && count > 0) {
      allowOtherSelection = userSelectedSeat - count;
    }
  };

  const markSelected = id => {
    let div = document.getElementById(id);
    div.className += " selected";
  };

  const markOtherUnselected = () => {
    let allSeats = document.getElementsByClassName("seats");
    for (let i = 0; i < seatsArr.length; i++) {
      seatsArr[i].selected = false;
    }
    for (let i = 0; i < allSeats.length; i++) {
      let item = allSeats[i];
      item.classList.remove("selected");
    }
  };

  const seatsDiv = (row, num, type) => {
    let div = document.createElement("div");
    let seatObj = new Seat(row, num, type);
    seatsArr.push(seatObj);
    div.textContent = num;
    div.setAttribute("id", "seat-" + type + "-" + row + "-" + num);
    div.className = "seats";
    return div;
  };

  const rowSeats = (rowNum, num, type) => {
    let div = document.createElement("div");
    div.addEventListener("click", seatsClicked);
    div.className = "seats-row";
    for (let i = 0; i < num; i++) {
      let divInside = seatsDiv(rowNum, i + 1, type);
      div.appendChild(divInside);
    }
    return div;
  };

  const addNormalSeats = () => {
    let div = document.createElement("div");
    div.className = "parent";
    for (let i = 0; i < 10; i++) {
      let divin = rowSeats(i + 1, 10, "normal");
      normalDiv.appendChild(divin);
    }
  };

  const addExecutiveSeats = () => {
    let div = document.createElement("div");
    div.className = "parent";
    for (let i = 0; i < 10; i++) {
      let divin = rowSeats(i + 1, 5, "executive");
      executiveDiv.appendChild(divin);
    }
  };

  const markUnAvailableSeats = () => {
    for (let i = 0; i < seatsArr.length; i++) {
      if (!seatsArr[i].available) {
        let id =
          "seat-" +
          seatsArr[i].type +
          "-" +
          seatsArr[i].row +
          "-" +
          seatsArr[i].seat;

        let div = document.getElementById(id);
        div.classList.remove("selected");
        div.className += " unavailable";
      }
    }
  };

  const calculatePriceEventListener = () => {
    submitButton.addEventListener("click", () => {
      let count = 0;

      let price = 0;
      for (let i = 0; i < seatsArr.length; i++) {
        if (seatsArr[i].selected === true) {
          if (seatsArr[i].type === "normal") {
            price += 200;
          } else {
            price += 300;
          }
          count++;
        }
      }
      if (count === 5) {
        alert("Please pay Rs" + price);
      } else {
        alert("Please select " + (userSelectedSeat - count) + " more seats");
      }
    });
  };

  const init = () => {
    addNormalSeats();
    addExecutiveSeats();
    addExecutiveSeats;
    seatsArr[1].available = false;
    seatsArr[10].available = false;
    seatsArr[12].available = false;
    seatsArr[75].available = false;
    seatsArr[76].available = false;
    seatsArr[77].available = false;
    seatsArr[112].available = false;
    markUnAvailableSeats();
    calculatePriceEventListener();
  };

  init();
})();
