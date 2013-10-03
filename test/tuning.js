var expect = require('chai').expect;
var consonance = require('../target/consonance').consonance;

describe('Tuning', function() {
    describe('Constructors', function() {
        it('Constructor with no args', function() {
            expect(consonance.Tuning().A4freq()).to.equal(440.0);
        });
        it('Constructor with one arg', function() {
            expect(consonance.Tuning(430.0).A4freq()).to.equal(430.0);
        });
    });
    describe('frequency()', function() {
        it('A4 in standard tuning', function() {
            expect(consonance.Tuning().frequency('A4')).to.equal(440);
        });
        it('C4 in standard tuning', function() {
            expect(consonance.Tuning().frequency(consonance.Note('C4'))).to.be.within(261.625564, 261.625566);
        });
        it('B2 in standard tuning', function() {
            expect(consonance.Tuning().frequency(consonance.Note('B2'))).to.be.within(123.470, 123.471);
        });
        it('A4 in A430 tuning', function() {
            expect(consonance.Tuning(430).frequency('A4')).to.equal(430);
        });
    });
    describe('note()', function() {
        it('440hz in standard tuning should be A4 0 cents', function() {
            var note = consonance.Tuning().note(440);
            expect(note.toString()).to.equal('A4');
            expect(note.cents()).to.equal(0);
        });
        it('123.4hz in standard tuning should be B2 0 cents', function() {
            var note = consonance.Tuning().note(123.4);
            expect(note.toString()).to.equal('B2');
            expect(note.cents()).to.be.within(-0.01, 0.00);
        });
        it('430hz in 430hz tuning should be A4 0 cents', function() {
            var note = consonance.Tuning(430).note(430);
            expect(note.toString()).to.equal('A4');
            expect(note.cents()).to.equal(0);
        });
    });
});