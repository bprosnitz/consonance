var expect = require('chai').expect;
var consonance = require('../target/consonance').consonance;

describe('Chord', function() {
    describe('Constructed from name', function() {
        it('name="B"', function() {
            var chord = consonance.Chord('B');
            expect(chord.name()).to.equal('B');
            expect(chord.rootNote().equals(consonance.Note('B'))).to.be.true;
        });
        it('name="C#b#m"', function() {
            var chord = consonance.Chord('C#b#m');
            expect(chord.name()).to.equal('C#b#m');
            expect(chord.rootNote().equals(consonance.Note('C#'))).to.be.true;
        });
    });
});