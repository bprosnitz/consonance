var expect = require('chai').expect;
var consonance = require('../src/consonance').consonance;

describe('Note', function() {
    describe('Constructors', function() {
        var testConstructorSetsCorrectValues = function(name, noteName, octave) {
            note = consonance.Note(name);
            expect(note.noteName()).to.equal(noteName);
            expect(note.octave()).to.equal(octave);
            expect(note.index()).to.be.a('number');
        };
        describe('without octave set', function() {
            it('A', function() {
                testConstructorSetsCorrectValues('A', 'A', null);
            });
            it('A#', function() {
                testConstructorSetsCorrectValues('A#', 'A#', null);
            });
            it('Bb', function() {
                testConstructorSetsCorrectValues('Bb', 'Bb', null);
            });
            it('C', function() {
                testConstructorSetsCorrectValues('C', 'C', null);
            });
            it('Db', function() {
                testConstructorSetsCorrectValues('Db', 'Db', null);
            });
            it('E', function() {
                testConstructorSetsCorrectValues('E', 'E', null);
            });
            it('E#', function() {
                testConstructorSetsCorrectValues('E#', 'E#', null);
            });
            it('F', function() {
                testConstructorSetsCorrectValues('F', 'F', null);
            });
            it('G##', function() {
                testConstructorSetsCorrectValues('G##', 'G##', null);
            });
            it('G#b', function() {
                testConstructorSetsCorrectValues('G#b', 'G#b', null);
            });
        });
        describe('Constructor with octave', function() {
            it('A0', function() {
                testConstructorSetsCorrectValues('A0', 'A', 0);
            });
            it('C#9', function() {
                testConstructorSetsCorrectValues('C#9', 'C#', 9);
            });
            it('Gb3', function() {
                testConstructorSetsCorrectValues('Gb3', 'Gb', 3);
            });
        });
        describe('equal', function() {
            it('A equals A', function() {
                expect(consonance.Note('A').equals(consonance.Note('A'))).to.be.true;
            });
            it('A not equals A#', function() {
                expect(consonance.Note('A').equals(consonance.Note('A#'))).to.be.false;
            });
            it('Bb1 equals Cbb1', function() {
                expect(consonance.Note('Bb1').equals(consonance.Note('Cbb1'))).to.be.true;
            });
            it('B##3 equals Db3', function() {
                expect(consonance.Note('B##1').equals(consonance.Note('Db1'))).to.be.true;
            });
            it('E##1 not equals F1', function() {
                expect(consonance.Note('E##1').equals(consonance.Note('F1'))).to.be.false;
            });
            it('A1 not equals A2', function() {
                expect(consonance.Note('A1').equals(consonance.Note('A2'))).to.be.false;
            });
            it('A1 not equals A', function() {
                expect(consonance.Note('A1').equals(consonance.Note('A'))).to.be.false;
            });
        });
    });
});