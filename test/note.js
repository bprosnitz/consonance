var assert = require('assert');
var consonance = require('../src/consonance').consonance;

describe('Note', function() {
    describe('Constructors', function() {
        describe('without octave set', function() {
            it('A', function() {
                var x = consonance.Note('A');
            });
        });
    });
});