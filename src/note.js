exports.Note = function(param) {
    var private = {
        noteName: null,
        index: null,
        octave: null
    };

    var constants = {
        noteIndicies: {
            'c': 0,
            'd': 2,
            'e': 4,
            'f': 5,
            'g': 7,
            'a': 9,
            'b': 11
        }
    };

    var from = {
        name: function(name) {
            var re = /^([A-Ga-g][#bB]*)([0-9]*)$/;
            var reResult = re.exec(name);
            private.noteName = reResult[1];
            if (reResult[2].length > 0) {
                private.octave = parseInt(reResult[2]);
            }

            var index = constants.noteIndicies[private.noteName[0].toLowerCase()];
            for (var i = 1; i < private.noteName.length; ++i) {
                var char = private.noteName[i];
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
            private.index = index;
        }
    };

    if (typeof param == 'string') {
        from.name(param);
    } else {
        throw new Error('Note constructor requires a string name');
    }

    return {
        noteName: function() {
            return private.noteName;
        },
        octave: function() {
            return private.octave;
        },
        index: function() {
            return private.index;
        },
        equals: function(other) {
            return this.index() == other.index() && this.octave() == other.octave();
        },
        from: from
    };
};