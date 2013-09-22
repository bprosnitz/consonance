exports.Note = function() {
    var priv = {
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
            priv.noteName = reResult[1];
            if (reResult[2].length > 0) {
                priv.octave = parseInt(reResult[2]);
            }

            var index = constants.noteIndicies[priv.noteName[0].toLowerCase()];
            for (var i = 1; i < priv.noteName.length; ++i) {
                var char = priv.noteName[i];
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
            priv.index = index;
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
            from: from,
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
        from.name.apply(this, arguments);
    } else {
        throw new Error('Note constructor requires a string name');
    }

    return construct(priv);
};