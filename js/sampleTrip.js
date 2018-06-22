var tripList = [];

/**
 * This is used to load card
 */
function loadCard() {
    tripList = [];
    document.getElementById('loader').style.display = 'block';
    document.getElementById('tripInfo').style.display = 'none';
    document.getElementById('loader').innerHTML = 'loading card, please wait...';
    setTimeout(function () {
        Trip.loadCard();
        document.getElementById('loader').style.color = 'green';
        document.getElementById('showOthers').style.display = 'block';
        document.getElementById('loader').innerHTML = 'Card Loaded successfully';
    }, 2000);
}

/**
 * This is used to display trip information
 */
function buildTripInfo() {
    var list = '<br /><b style="font-size: 25px">Trip Details </b><br />';
    list += '<table border="1" cellspacing="2" cellpadding="2"> <tr><td>#</td><td>From</td><td>To</td><td>By</td><td>Maximum Fare</td></tr>';
    tripList.forEach(function (trip, i) {
        list += "<tr><td>" + i + 1 + "</td><td>";
        list += trip.from + "</td><td>" + trip.to + "</td><td>" + trip.by + "</td><td>" + trip.fare + "</td></tr>";
    });
    list += '</table>';

    document.getElementById('tripInfo').innerHTML = list;

    document.getElementById('loader').style.color = 'red';
    document.getElementById('loader').innerHTML = 'on another trip....';
}

/**
 * This is used to run sample trip
 */
function sampleTrip() {
    var trip = null;
    document.getElementById('tripInfo').style.display = 'block';
    document.getElementById('loader').style.display = 'block';
    document.getElementById('getBalance').style.display = 'none';
    document.getElementById('balanceAfterTrip').style.display = 'none';
    document.getElementById('loader').style.color = 'red';
    document.getElementById('loader').innerHTML = 'on a trip....';
    setTimeout(function () {
        trip = Trip.board('5th', 'Pelham Parkway', 'SUBWAY');
        tripList.push(trip);
        console.log('first Trip', trip);
        buildTripInfo();
    }, 1500);

    setTimeout(function () {
        trip = Trip.board('Pelham Parkway', 'Bronx', 'BUS');
        tripList.push(trip);
        console.log('second Trip', trip);
        buildTripInfo();
    }, 3000);

    setTimeout(function () {
        trip = Trip.board('Pelham Parkway', 'Guns Hill', 'SUBWAY');
        tripList.push(trip);
        console.log('third Trip', trip);
        buildTripInfo();
        document.getElementById('loader').style.display = 'none';
        document.getElementById('getBalance').style.display = 'block';
    }, 4500);

}

/**
 * This is used to get Balance
 */
function getBalance() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('loader').style.color = 'red';
    document.getElementById('loader').innerHTML = 'processing balance...';
    setTimeout(function () {
        document.getElementById('balanceAfterTrip').style.display = 'block';
        document.getElementById('card_balance').innerHTML = "$" + Trip.getCardBalance();
    }, 1500);
}