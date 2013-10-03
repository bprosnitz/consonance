var Interval = require('../src/interval').Interval;
var Note = require('../src/note').Note;
var List = require('../src/list').List;

var scaleNames = {
    'major': {
        intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7']
    },
    'minor': {
        intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7']
    },
    'major pentatonic': {
        intervals: ['P1', 'M2', 'M3', 'P5', 'M6']
    },
    'minor pentatonic': {
        intervals: ['P1', 'm3', 'P4', 'P5', 'm7']
    }
};

var initializeFrom = {
    name: function(priv, name) {
        var lowerName = name.toLowerCase();
        if (!(lowerName in scaleNames)) {
            throw new Error('Unknown scale.');
        }
        var intervalNames = scaleNames[lowerName].intervals;
        priv.intervals = [];
        if (intervalNames[0] != 'P1') {
            throw new Error('P1 must be the first interval in the scale.');
        }
        for (var intervalName in intervalNames) {
            var interval = Interval(intervalNames[intervalName]);
            if (interval.direction() != 'ascending' || interval.semitones() >= 12) {
                throw new Error('Interval must be ascending and must be smaller than an octave');
            }
            priv.intervals.push(interval);
        }
    }
};

exports.Scale = function(param) {
    var priv = {
        intervals: null
    };

    var construct = function _construct(priv) {
        return {
            intervals: function(index) {
                return List(priv.intervals);
            }
        }
    };

    if (typeof param == 'object') {
        priv = param;
    } else if (typeof param == 'string') {
        initializeFrom.name(priv, param);
    } else {
        throw new Error('Illegal argument to scale constructor');
    }

    return construct(priv);
};

exports.Scale.from = {
    name: function(name) {
        var privateDat = {};
        initializeFrom.name(privateDat, name);
        return exports.Scale(privateDat);
    }
};