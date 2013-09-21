var expect = require('chai').expect;
var consonance = require('../src/consonance').consonance;

describe('Note', function() {
    describe('Constructors', function() {
        var testNote = function(name, noteName, octave) {
            note = consonance.Note(name);
            expect(note.noteName()).to.equal(noteName);
            expect(note.octave()).to.equal(octave);
        };
        describe('without octave set', function() {
            it('A', function() {
                testNote('A', 'A', null);
            });
        });
    });
});