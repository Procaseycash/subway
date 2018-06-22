window.Trip = (function () {
    var stations = [
        {name: '5th', zone: [1]},
        {name: 'Pelham Parkway', zone: [1, 2]},
        {name: 'Bronx', zone: [3]},
        {name: 'Guns Hill', zone: [2]}
    ];
    var tripMeans = ['SUBWAY', 'BUS'];
    var _card = 0;
    var _from = null;
    var _to = null;
    var _by = null;
    var _maximumFare = 0.00;

    return {
        /**
         * This is used to load a card.
         */
        loadCard: function () {
            _card = 30;
        },

        /**
         * This is used to reset boarding details for new board process.
         */
        resetBoardingDetails: function () {
            _from = null;
            _by = null;
            _to = null;
            _maximumFare = 0.00;
        },

        /**
         * This is used to take a trip from one location to another location (to) with a means of subway or bus
         * @param from
         * @param to
         * @param by
         */
        board: function (from, to, by) {
            if (_card < 1.80) {
                alert('Please Load your card');
                throw new Error('Please Load your card');
            } else if (!(by && from && to)) {
                alert('Please specify all requirements to go on this journey');
                throw new Error('Please specify all requirements to go on this journey');
            } else if (tripMeans.indexOf(by) === -1) {
                alert('Please use either ' + tripMeans.toString().replace(',', ' or '));
                throw new Error('Please use either ' + tripMeans.toString().replace(',', ' or '));
            }
            this.resetBoardingDetails(); // reset trip params
            var from_ = stations.filter(function (station) {
                return station.name.toLowerCase() === from.toLowerCase()
            });
            var to_ = stations.filter(function (station) {
                return station.name.toLowerCase() === to.toLowerCase()
            });
            _by = by;
            console.log(from_, to_, _by);
            if (from_.length <= 0 || to_.length <= 0) {
                alert('Please supply valid from or to');
                throw new Error('Please supply valid from or to');
            }
            _from = from_[0];
            _to = to_[0];
            if (by.toUpperCase() === 'SUBWAY') {
                this.processSubwayMaximumFare();
            } else {
                _maximumFare = 1.80;
            }
            this.chargeCard(); // this is used to charge the maximum fare on card
            return {from: from, to: to, by: by, fare: _maximumFare}
        },

        /**
         * This is used to determin subway maximum fare based on trip taken
         */
        processSubwayMaximumFare: function () {
            if (_from.zone.length === 1 && _from.zone.indexOf(1) > -1) {
                _maximumFare = 2.50;
            } else if (_from.zone.length === 1 && _from.zone.indexOf(1) === -1) {
                _maximumFare = 2.00;
            } else if (_from.zone.length === 2 && _from.zone.indexOf(1) > -1) {
                _maximumFare = 3.00;
            } else if (_from.zone.length === 2 && _from.zone.indexOf(1) === -1) {
                _maximumFare = 2.25;
            } else if (_from.zone.length === 3) {
                _maximumFare = 3.20;
            }
        },

        /**
         * This is used to charge Card after trip ends for a journey taken
         */
        chargeCard: function () {
            _card -= _maximumFare;
        },

        /**
         * This is used to get card balance
         */
        getCardBalance: function () {
            return _card.toFixed(2);
        }
    }
})();