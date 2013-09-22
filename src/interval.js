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

    var shorthandName = function() {
        var semitones = private.semitones;

        baseIntervalNumber = {
            0: 1,
            1: 2,
            2: 2,
            3: 3,
            4: 3,
            5: 4,
            6: 4,
            7: 5,
            8: 6,
            9: 6,
            10: 7,
            11: 7
        };

        var shorthandIntervalNum = baseIntervalNumber[semitones % 12] + Math.floor((semitones / 12))*7;

        shortNamePrefix = {
            0: 'P',
            1: 'm',
            2: 'M',
            3: 'm',
            4: 'M',
            5: 'P',
            6: 'A',
            7: 'P',
            8: 'm',
            9: 'M',
            10: 'm',
            11: 'M'
        };

        return shortNamePrefix[semitones % 12] + shorthandIntervalNum;
    };

    var from = {
        name: function(name) {

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
        from: from
    };
};