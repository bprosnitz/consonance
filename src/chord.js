var Interval = require('../src/interval').Interval;
var Note = require('../src/note').Note;
var List = require('../src/list').List;

var peg = require('pegjs');
var chordGrammar = '\
start = chord  \
chord = note:note chordquality:chordquality addIntervals:addIntervals { return { note:note, chordquality:chordquality, addedIntervals:addIntervals }; } \
note = letter:noteLetter modifier:(noteModifier*) { var x = modifier; x.splice(0,0,letter); return x.join("") } \
noteLetter = [A-Ga-g] \
noteModifier = [Bb#] \
chordquality = " "* chordQualityBase:chordQualityBase chordQualityModifier:chordQualityModifier? { return { coreQuality:chordQualityBase, modifier:chordQualityModifier } } \
    chordQualityBase =  "augmented" /  "diminished" / "suspended" / "major" / "minor" / "maj" / "aug" / "dim" / "sus" / "M" /  "m" /  "" \
chordQualityModifier = modifier:([1-9][0-9]*) { var x = modifier[1]; x.splice(0,0,modifier[0]); return parseInt(x.join("")) } \
addIntervals = addedIntervals:addInterval* { return addedIntervals; } \
addInterval = " "* "add" number:([1-9]+[0-9]*) { return parseInt(number);}\
';
var chordParser = peg.buildParser(chordGrammar);

var initializeFrom = {
    name: function(priv, name) {
        priv.name = name;

        var parsed = chordParser.parse(name);
        console.log(parsed)
        priv.rootNote = Note.from.name(parsed.note);

        var intervals;
        var seventhType;
        var chordQuality = parsed.chordquality;
        if (chordQuality.coreQuality == '' ||
            chordQuality.coreQuality == 'M' ||
            chordQuality.coreQuality.toLowerCase() == 'maj' ||
            chordQuality.coreQuality.toLowerCase() == 'major') {
            intervals = [ 'P1', 'M3', 'P5'];
            if (chordQuality.coreQuality == '') {
                // dominant 7th
                seventhType = 'M7';
            } else {
                seventhType = 'M7';
            }
        } else if (chordQuality.coreQuality == 'm' ||
            chordQuality.coreQuality.toLowerCase() == 'minor') {
            intervals = [ 'P1', 'm3', 'P5'];
            seventhType = 'm7';
        } else if (chordQuality.coreQuality.toLowerCase() == 'aug' ||
            chordQuality.coreQuality.toLowerCase() == 'augmented') {
            intervals = [ 'P1', 'M3', 'm6'];
            seventhType = 'm7';
        } else if (chordQuality.coreQuality.toLowerCase() == 'dim' ||
            chordQuality.coreQuality.toLowerCase() == 'diminished') {
            intervals = [ 'P1', 'm3', 'a4'];
            seventhType = 'M6';
        } else if (chordQuality.coreQuality.toLowerCase() == 'sus' ||
            chordQuality.coreQuality.toLowerCase() == 'suspended') {
        } else {
            throw new Error('Unknown core quality "' + chordQuality.coreQuality + '"');
        }

        if (chordQuality.modifier == 7) {
            intervals.push(seventhType);
        }

        priv.intervals = intervals.map(function(intervalName) {
            return Interval(intervalName)
        });
    }
}

exports.Chord = function() {
    var priv = {
        name: null,
        rootNote: null,
        intervals: null
    };

    if (typeof arguments[0] == 'object') {
        priv = arguments[0];
    } else if (typeof arguments[0] == 'string') {
        initializeFrom.name(priv, arguments[0]);
    } else {
        throw new Error('Illegal argument to chord constructor');
    }

    return {
        name: function() {
            return priv.name;
        },
        rootNote: function() {
            return priv.rootNote;
        },
        intervals: function() {
            return List(priv.intervals);
        }
    };
};

exports.Chord.from = {
    name: function(name) {
        var privateDat = {};
        initializeFrom.name(privateDat, name);
        return exports.Chord(privateDat);
    }
};