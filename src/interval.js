exports.Interval = function() {
    var private = {
        name: null,
        semitones: null,
        direction: null
    };

    var setPrivateDirection = function(direction) {
        if (typeof direction !== 'string') {
            throw new Error('Direction must be a string');
        }
        direction = direction.toLowerCase();
        if (direction == 'asc' || direction == 'ascending') {
            private.direction = 'ascending';
        } else if (direction == 'desc' || direction == 'descending') {
            private.direction = 'descending';
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

    var shorthandName = function() {
        var semitones = private.semitones;
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
            if (!private.quality) {
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

    var from = {
        name: function(name) {
            var re = /^\s*(([admp]|major|minor|augmented|diminished|perfect)\s*([1-9][0-9]*))\s*(desc|descending|asc|ascending)?$/i;
            var reMatch = re.exec(name);
            if (!reMatch) {
                throw new Error('Invalid interval name structure \'' + name + '\'');
            }
            private.name = reMatch[1];

            var inQuality = reMatch[2];
            var quality = qualityNameToQuality(inQuality);
            if (!quality) {
                throw new Error('No quality found named ' + inQuality);
            }

            var intervalNum = parseInt(reMatch[3]);

            var intervalNumToCheck = (intervalNum - 1) % 7 + 1;
            for (var i = 0; i < constants.intervalOrder.length; ++i) {
                var intervalInfo = constants.intervalOrder[i];
                if (intervalInfo.intervalNumber == intervalNumToCheck && quality == intervalInfo.quality) {
                    private.semitones = i;
                    break;
                }
            }
            if (private.semitones === null) {
                throw new Error('Interval number did not match interval quality');
            }
            private.semitones += Math.floor((intervalNum - 1) / 7) * 12;

            var direction = reMatch[4];
            if (!direction) {
                direction = 'ASCENDING';
            }
            setPrivateDirection(direction);
        },
        semitones: function(semitones, direction) {
            if (typeof semitones !== 'number') {
                throw new Error('semitones should be a number');
            }
            private.semitones = semitones;
            if (!direction) {
                direction = 'ASCENDING';
            }
            setPrivateDirection(direction);
            private.name = shorthandName();
        }
    };

    if (arguments.length > 0 && typeof arguments[0] == 'string') {
        from.name.apply(this, arguments);
    } else if (arguments.length > 0 && typeof arguments[0] == 'number') {
        from.semitones.apply(this, arguments);
    } else {
        throw new Error('Interval constructor requires a string or a number');
    }

    return {
        name: function() {
            return private.name;
        },
        semitones: function() {
            return private.semitones;
        },
        direction: function() {
            return private.direction;
        },
        equals: function(other) {
            return this.semitones() == other.semitones() && this.direction() == other.direction();
        },
        from: from
    };
};