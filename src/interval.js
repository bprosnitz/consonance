(function() {
var parseDirectionSign = function(direction) {
    if (typeof direction !== 'string') {
        throw new Error('Direction must be a string');
    }
    direction = direction.toLowerCase();
    if (direction == 'asc' || direction == 'ascending') {
        return 1;
    } else if (direction == 'desc' || direction == 'descending') {
        return -1;
    } else {
        throw new Error('Unknown direction \'' + direction + '\'');
    }
};

var constants = {
    qualities: {
        major: {
            name: 'major',
            abbrev: 'M'
        },
        minor: {
            name: 'minor',
            abbrev: 'm'
        },
        augmented: {
            name: 'augmented',
            abbrev: 'A'
        },
        diminished: {
            name: 'diminished',
            abbrev: 'D'
        },
        perfect: {
            name: 'perfect',
            abbrev: 'P'
        }
    },
    direction: {
        ascending: {
            name: 'ascending'
        },
        descending: {
            name: 'descending'
        }
    }
};

constants.intervalOrder = [ { quality: constants.qualities.perfect, intervalNumber: 1 },
    { quality: constants.qualities.minor, intervalNumber: 2 },
    { quality: constants.qualities.major, intervalNumber: 2 },
    { quality: constants.qualities.minor, intervalNumber: 3 },
    { quality: constants.qualities.major, intervalNumber: 3 },
    { quality: constants.qualities.perfect, intervalNumber: 4 },
    { quality: constants.qualities.augmented, intervalNumber: 4 },
    { quality: constants.qualities.perfect, intervalNumber: 5 },
    { quality: constants.qualities.minor, intervalNumber: 6 },
    { quality: constants.qualities.major, intervalNumber: 6 },
    { quality: constants.qualities.minor, intervalNumber: 7 },
    { quality: constants.qualities.major, intervalNumber: 7 } ];

var shorthandName = function(privateData) {
    var semitones = Math.round(Math.abs(privateData.delta));
    var intervalInfo = constants.intervalOrder[semitones % 12];
    var shorthandIntervalNum = intervalInfo.intervalNumber + Math.floor((semitones / 12))*7;
    return intervalInfo.quality.abbrev + shorthandIntervalNum;
};



var qualityNameToQuality = function(qualityName) {
    if (qualityName.length == 1) {
        for (var qualityKey in constants.qualities) {
            var quality = constants.qualities[qualityKey];
            if (quality.abbrev == qualityName) {
                return quality;
            }
        }
        if (!priv.quality) {
            for (var qualityKey in constants.qualities) {
                var quality = constants.qualities[qualityKey];
                if (quality.abbrev.toLowerCase() == qualityName.toLowerCase()) {
                    return quality;
                }
            }
        }
    } else {
        for (var qualityKey in constants.qualities) {
            var quality = constants.qualities[qualityKey];
            if (quality.name.toLowerCase() == qualityName.toLowerCase()) {
                return quality;
            }
        }
    }
    return null;
};

var initializeFrom = {
    name: function(privateData, name) {
        var re = /^\s*(([admp]|major|minor|augmented|diminished|perfect)\s*([1-9][0-9]*))\s*(desc|descending|asc|ascending)?$/i;
        var reMatch = re.exec(name);
        if (!reMatch) {
            throw new Error('Invalid interval name structure \'' + name + '\'');
        }
        privateData.name = reMatch[1];

        var inQuality = reMatch[2];
        var quality = qualityNameToQuality(inQuality);
        if (!quality) {
            throw new Error('No quality found named ' + inQuality);
        }

        var intervalNum = parseInt(reMatch[3]);

        var delta;
        var intervalNumToCheck = (intervalNum - 1) % 7 + 1;
        for (var i = 0; i < constants.intervalOrder.length; ++i) {
            var intervalInfo = constants.intervalOrder[i];
            if (intervalInfo.intervalNumber == intervalNumToCheck && quality == intervalInfo.quality) {
                delta = i;
                break;
            }
        }
        if (delta === undefined) {
            throw new Error('Interval number did not match interval quality');
        }

        delta += Math.floor((intervalNum - 1) / 7) * 12;

        var direction = reMatch[4];
        if (direction) {
            delta *= parseDirectionSign(direction);
        }
        privateData.delta = delta;
    },
    delta: function(privateData, delta) {
        privateData.delta = delta;
        privateData.name = shorthandName(privateData);
    },
    semitones: function(privateData, semitones, direction, cents) {
        if (typeof semitones !== 'number') {
            throw new Error('semitones should be a number');
        }
        var delta = semitones;
        if (cents !== undefined) {
            delta += cents / 100;
        }
        if (direction) {
            delta *= parseDirectionSign(direction);
        }
        privateData.delta = delta;
        privateData.name = shorthandName(privateData);
    }
};

Interval = function() {
    var priv = {
        name: null,
        delta: null
    };

    var args = [priv];
    args.push.apply(args, arguments);
    if (arguments.length > 0 && typeof arguments[0] == 'object') {
        priv = arguments[0];
    } else if (arguments.length > 0 && typeof arguments[0] == 'string') {
        initializeFrom.name.apply(undefined, args);
    } else if (arguments.length > 0 && typeof arguments[0] == 'number') {
        initializeFrom.delta.apply(this, args);
    } else {
        throw new Error('Interval constructor requires a string or a number');
    }

    return {
        name: function() {
            return priv.name;
        },
        semitones: function() {
            return Math.round(Math.abs(priv.delta));
        },
        direction: function() {
            if (priv.delta < 0) {
                return 'descending';
            } else {
                return 'ascending';
            }
        },
        cents: function() {
            var total = Math.abs(priv.delta);
            return Math.round((total - Math.floor(total))*100);
        },
        delta: function() {
            return priv.delta;
        },
        minus: function(otherInterval) {
            var net = this.delta() - otherInterval.delta();
            return Interval.from.delta(net);
        },
        plus: function(otherInterval) {
            var net = this.delta() + otherInterval.delta();
            return Interval.from.delta(net);
        },
        equals: function(other) {
            return this.semitones() == other.semitones() && this.direction() == other.direction()
                && this.cents() == other.cents();
        },
        toString: function() {
            if (priv.delta < 0) {
                return priv.name + ' ' + this.direction();
            } else {
                return priv.name;
            }
        }
    };
};

Interval.from = {
    name: function(name) {
        var privateDat = {};
        initializeFrom.name(privateDat, name);
        return Interval(privateDat);
    },
    delta: function(delta) {
        var privateDat = {};
        initializeFrom.delta(privateDat, delta);
        return Interval(privateDat);
    },
    semitones: function(index, direction, cents) {
       var privateDat = {};
       initializeFrom.semitones(privateDat, index, direction, cents);
       return Interval(privateDat);
    }
};
})();