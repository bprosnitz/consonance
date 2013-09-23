var Note = require('../src/note').Note;

exports.Tuning = function(A4freq) {
    var priv = {
        A4freq: null
    };

    if (A4freq === undefined) {
        priv.A4freq = 440.0;
    } else if (typeof A4freq == 'number') {
        priv.A4freq = A4freq;
    } else {
        throw new Error('A4 frequency must be numeric.')
    }

    return {
        A4freq: function() {
            return priv.A4freq;
        },
        frequency: function(note) {
            if (typeof note == 'number' || typeof note == 'string') {
                note = Note.apply(undefined, arguments);
            }
            var index = note.index();
            var octave = note.octave();
            if (octave === null) {
                throw new Error('Octave must be defined to get note frequency');
            }
            var cents = note.cents();
            var n = index + octave * 12;
            if (cents !== null) {
                n += cents;
            }
            var power = (n - 57) / 12
            return Math.pow(2, power) * priv.A4freq;
        },
        index: function(frequency) {
            var freqRatio = frequency / priv.A4freq;
            var n = 12 * Math.log(freqRatio) / Math.log(2) + 57;
            var fullIndex = Math.round(n);
            var cents = n - fullIndex;
            var index = fullIndex % 12;
            var octave = Math.floor(fullIndex / 12);
            return { index: index, octave: octave, cents: cents}
        },
        note: function(frequency) {
            var details = this.index(frequency);
            return Note.from.index(details.index, details.octave, details.cents);
        }
    };
};

require('../src/note').TuningConstructorHolder.Tuning = exports.Tuning;
