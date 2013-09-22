var Interval = require('../src/interval').Interval;

exports.Note = function() {
    var priv = {
        noteName: null,
        index: null,
        octave: null
    };

    var constants = {
        noteIndicies: {
            'C': 0,
            'D': 2,
            'E': 4,
            'F': 5,
            'G': 7,
            'A': 9,
            'B': 11
        }
    };

    var initializeFrom = {
        name: function(privateDat, name) {
            var re = /^([A-Ga-g][#bB]*)([0-9]*)$/;
            var reResult = re.exec(name);
            privateDat.noteName = reResult[1];
            if (reResult[2].length > 0) {
                privateDat.octave = parseInt(reResult[2]);
            }

            var index = constants.noteIndicies[privateDat.noteName[0].toUpperCase()];
            for (var i = 1; i < privateDat.noteName.length; ++i) {
                var char = privateDat.noteName[i];
                if (char == '#') {
                    ++index
                } else if (char == 'b' || char == 'B') {
                    --index;
                } else {
                    throw new Error('Invalid character: ' + char);
                }
            }
            index = index % 12;
            if (index < 0) {
                index += 12;
            }
            privateDat.index = index;
        },
        index: function(privateDat, index, octave) {
            if (index > 11 || index < 0) {
                throw new Error('Invalid note index: ' + index);
            }
            privateDat.octave = octave;
            var chosenLetter;
            var minDistance = 12;
            for (var noteLetter in constants.noteIndicies) {
                var noteIndex = constants.noteIndicies[noteLetter];
                var dist = index - noteIndex;
                if (dist < 0) {
                    dist += 12;
                }
                if (dist < minDistance) {
                    minDistance = dist;
                    chosenLetter = noteLetter;
                }
            }
            if (minDistance == 1) {
                privateDat.noteName = chosenLetter + '#';
            } else if (minDistance == 0) {
                privateDat.noteName = chosenLetter;
            } else {
                throw new Error('Unexpected note distance: ' + minDistance);
            }
        }
    };

    var clonedPriv = function() {
        var newPriv = {};
        for (var key in priv) {
            newPriv[key] = priv[key];
        }
        return newPriv;
    };

    var construct = function _construct(priv) {
        return {
            noteName: function() {
                return priv.noteName;
            },
            octave: function(value) {
                if (value !== undefined) {
                    // setting the value
                    if (value == null || typeof value == 'number') {
                        var privateDat = clonedPriv();
                        privateDat.octave = value;
                        return _construct(privateDat);
                    } else {
                        throw new Error('Invalid value for octave ' + value);
                    }
                } else {
                    // getting the value
                    return priv.octave;
                }
            },
            index: function() {
                return priv.index;
            },
            interval: function() {
                var interval;
                if (typeof arguments[0] == 'object') {
                    interval = arguments[0];
                } else {
                    interval = Interval.apply(undefined, arguments);
                }

                var newPriv = clonedPriv();
                var index = newPriv.index + interval.delta();
                var octave;
                if (newPriv.octave !== null) {
                    octave = newPriv.octave + Math.floor(index / 12);
                }
                var indexMod = index % 12;
                if (indexMod < 0) {
                    indexMod += 12;
                }
                initializeFrom.index(newPriv, indexMod, octave);

                return _construct(newPriv);
            },
            equals: function(other) {
                return this.index() == other.index() && this.octave() == other.octave();
            },
            toString: function() {
                if (priv.octave) {
                    return priv.noteName + priv.octave;
                } else {
                    return priv.noteName;
                }
            }
        };
    };

    if (typeof arguments[0] == 'string') {
        initializeFrom.name(priv, arguments[0]);
    } else {
        throw new Error('Note constructor requires a string name');
    }

    return construct(priv);
};