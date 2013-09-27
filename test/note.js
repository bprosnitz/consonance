var expect = require('chai').expect;
var consonance = require('../src/consonance').consonance;

describe('Note', function() {
    describe('Constructors', function() {
        var testConstructorSetsCorrectValues = function(name, noteName, octave) {
            note = consonance.Note(name);
            expect(note.noteName()).to.equal(noteName);
            expect(note.octave()).to.equal(octave);
            expect(note.index()).to.be.a('number');
            expect(note.cents()).to.equal(0);
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
        describe('Construct from frequency', function() {
            it('A4 @ 440hz', function() {
                expect(consonance.Note(440).toString()).to.equal('A4');
                expect(consonance.Note.from.frequency(440).toString()).to.equal('A4');
            });
            it('A4 @ 430hz w/ 430 tuning', function() {
                expect(consonance.Note(430, 430).toString()).to.equal('A4');
                expect(consonance.Note.from.frequency(430, 430).toString()).to.equal('A4');
            });
        });
        describe('equal', function() {
            it('A equals A', function() {
                expect(consonance.Note('A').equals(consonance.Note('A'))).to.be.true;
            });
            it('441 hz not equals 440 hz', function() {
                expect(consonance.Note(441).equals(consonance.Note(440))).to.be.false;
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
    describe('toString()', function() {
        it('should output \'A#7\' for note \'A#7\'', function() {
            expect(consonance.Note('A#7').toString()).to.equal('A#7');
        });
        it('should output \'B\' for note \'B\'', function() {
            expect(consonance.Note('B').toString()).to.equal('B');
        });
    });
    describe('octave()', function() {
        it('should return the octave as number with no parameter', function() {
            expect(consonance.Note('A#7').octave()).to.be.a('number');
            expect(consonance.Note('A#7').octave()).to.equal(7);
            expect(consonance.Note('A#').octave()).to.be.null;
        });
        it('should return a new object with the desired octave when given a numeric parameter from object with no octave', function() {
            var note = consonance.Note('A#');
            var newNote = note.octave(8);
            expect(newNote.octave()).to.equal(8);
            expect(newNote.toString()).to.equal('A#8');
            expect(note.octave()).to.be.null;
        });
        it('should return a new object with the desired octave when given a numeric parameter from object with octave', function() {
            var note = consonance.Note('A#7');
            var newNote = note.octave(8);
            expect(newNote.octave()).to.equal(8);
            expect(newNote.toString()).to.equal('A#8');
            expect(note.octave()).to.be.equal(7);
        });
        it('should return a new object with no octave when given a null parameter from object with octave', function() {
            var note = consonance.Note('A#7');
            var newNote = note.octave(null);
            expect(newNote.octave()).to.be.null;
            expect(newNote.toString()).to.equal('A#');
            expect(note.octave()).to.be.equal(7);
        });
    });
    describe('interval()', function() {
        it('should create a note offset the correct number of semitones when given an interval', function() {
            var note = consonance.Note('A5');
            var interval = consonance.Interval('M2');
            var newNote = note.interval(interval);
            expect(newNote.toString()).to.equal('B5');
        });
        it('should create a note offset the correct number of semitones when given an interval (no octave)', function() {
            var note = consonance.Note('C');
            var interval = consonance.Interval('P4');
            var newNote = note.interval(interval);
            expect(newNote.toString()).to.equal('F');
        });
        it('should be able to move into the next octave', function() {
            var note = consonance.Note('B3');
            var interval = consonance.Interval('m3');
            var newNote = note.interval(interval);
            expect(newNote.toString()).to.equal('D4');
        });
        it('should be able to use a descending interval', function() {
            var note = consonance.Note('C#4');
            var interval = consonance.Interval('M2 descending');
            var newNote = note.interval(interval);
            expect(newNote.toString()).to.equal('B3');
        });
        it('should be able to use a descending interval (without octave)', function() {
            var note = consonance.Note('G');
            var interval = consonance.Interval('M3 descending');
            var newNote = note.interval(interval);
            expect(newNote.toString()).to.equal('D#');
        });
        it('should be possible to specify an interval by name', function() {
            var note = consonance.Note('A5');
            var newNote = note.interval('M2');
            expect(newNote.toString()).to.equal('B5');
        });
        it('should be possible to specify an interval by semitones', function() {
            var note = consonance.Note('B');
            var newNote = note.interval(1);
            expect(newNote.toString()).to.equal('C');
        });
        it('Should handle cents in the note and interval', function() {
            var note = consonance.Note.from.index(0, 1, 10);
            var newNote = note.interval(1.05);
            expect(consonance.Note.from.index(1, 1, 15).equals(newNote)).to.be.true;
        });
    });
    describe('frequency()', function() {
        it('A4 is 440 in standard tuning', function() {
            expect(consonance.Note('a4').frequency()).to.equal(440);
        });
        it('A4 is 440 in 430hz tuning', function() {
            expect(consonance.Note('a4').frequency(430)).to.equal(430);
            expect(consonance.Note('a4').frequency(consonance.Tuning(430))).to.equal(430);
        });
    });
    describe('scale()', function() {
        it('C major scale', function() {
            expect(consonance.Note('C').scale('major').map(function(note) {
                return note.noteName();
            })).to.eql(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
        });
        it('G minor pentatonic scale', function() {
            expect(consonance.Note('G').scale('minor pentatonic').map(function(note) {
                return note.noteName();
            })).to.eql(['G', 'A#', 'C', 'D', 'F']);
        });
    });
});