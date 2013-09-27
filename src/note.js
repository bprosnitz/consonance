var Interval = require('../src/interval').Interval;
var Scale = require('../src/scale').Scale;

exports.TuningConstructorHolder = {};

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
        } else {
            privateDat.octave = null;
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
        privateDat.cents = 0;
    },
    index: function(privateDat, index, octave, cents) {
        if (index > 11 || index < 0) {
            throw new Error('Invalid note index: ' + index);
        }
        privateDat.index = index;
        if (octave !== undefined) {
            privateDat.octave = octave;
        } else {
            privateDat.octave = null;
        }
        if (cents !== undefined) {
            privateDat.cents = cents;
        } else {
            privateDat.cents = 0;
        }
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
    },
    frequency: function(privateData, frequency, tuning) {
        if (typeof tuning != 'object') {
            tuning = exports.TuningConstructorHolder.Tuning(tuning);
        }

        var details = tuning.index(frequency);
        this.index(privateData, details.index, details.octave, details.cents);
    }
};

exports.Note = function() {
    var priv = {
        noteName: null,
        index: null,
        octave: null,
        cents: null
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
            cents: function() {
                return priv.cents
            },
            interval: function() {
                var interval;
                if (typeof arguments[0] == 'object') {
                    interval = arguments[0];
                } else {
                    interval = Interval.apply(undefined, arguments);
                }

                var index = priv.index + (priv.cents/100) + interval.delta();
                var cents = Math.floor((index - Math.floor(index)) * 100);
                index = Math.floor(index);
                var octave;
                if (priv.octave !== null) {
                    octave = priv.octave + Math.floor(index / 12);
                }
                var indexMod = index % 12;
                if (indexMod < 0) {
                    indexMod += 12;
                }

                return exports.Note.from.index(indexMod, octave, cents);
            },
            scale: function() {
                var scale;
                if (typeof arguments[0] == 'object') {
                    scale = arguments[0];
                } else {
                    scale = Scale.apply(undefined, arguments);
                }

                var notes = [];
                for (var i = 0; i < scale.size(); ++i) {
                    var scaleNote = this.interval(scale.interval(i));
                    var strippedScaleNote = scaleNote.octave(null);
                    notes.push(strippedScaleNote);
                }
                return notes;
            },
            frequency: function(param) {
                var tuning;
                if (typeof param == 'object') {
                    tuning = param;
                } else {
                    tuning = exports.TuningConstructorHolder.Tuning(param);
                }

                return tuning.frequency(this);
            },
            equals: function(other) {
                return this.index() == other.index() && this.octave() == other.octave() && this.cents() == other.cents();
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

    if (typeof arguments[0] == 'object') {
        priv = arguments[0];
    } else if (typeof arguments[0] == 'string') {
        initializeFrom.name(priv, arguments[0]);
    } else if (typeof arguments[0] == 'number') {
        if (arguments.length > 0) {
            initializeFrom.frequency(priv, arguments[0], arguments[1]);
        } else {
            initializeFrom.frequency(priv, arguments[0]);
        }
    } else {
        throw new Error('Note constructor requires a string name');
    }

    return construct(priv);
};

exports.Note.from = {
    name: function(name) {
        var privateDat = {};
        initializeFrom.name(privateDat, name);
        return exports.Note(privateDat);
    },
    index: function(index, octave, cents) {
        var privateDat = {};
        initializeFrom.index(privateDat, index, octave, cents);
        return exports.Note(privateDat);
    },
    frequency: function(frequency, tuning) {
        var privateDat = {};
        initializeFrom.frequency(privateDat, frequency, tuning);
        return exports.Note(privateDat);
    }
};