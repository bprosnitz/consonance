var Interval = require('../src/interval').Interval;
var Note = require('../src/note').Note;

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
    }
}

exports.Chord = function() {
    var priv = {
        name: null,
        rootNote: null
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
        }
    };
}

exports.Chord.from = {
    name: function(name) {
        var privateDat = {};
        initializeFrom.name(privateDat, name);
        return exports.Chord(privateDat);
    }
}