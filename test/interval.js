var expect = require('chai').expect;
var consonance = require('../src/consonance').consonance;

describe('Interval', function() {
    describe('Constructors', function() {
        describe('String constructor', function() {
            var testStringConstructor = function(string, expectedSemitones, expectedName, expectedDirection) {
                var interval = consonance.Interval(string);
                if (expectedName) {
                    expect(interval.name()).to.equal(expectedName);
                } else {
                    expect(interval.name()).to.equal(string);
                }
                expect(interval.semitones()).to.equal(expectedSemitones);
                if (!expectedDirection || expectedDirection == 'ascending') {
                    expect(interval.direction()).to.equal('ascending');
                } else if (expectedDirection == 'descending') {
                    expect(interval.direction()).to.equal('descending');
                }
            };
            it('m7', function() {
                testStringConstructor('m7', 10);
            });
            it('M7', function() {
                testStringConstructor('M7', 11);
            });
            it('P1', function() {
                testStringConstructor('Perfect 1', 0);
            });
            it('P8', function() {
                testStringConstructor('P8 descending', 12, 'P8', 'descending');
            });
            it('M9', function() {
                testStringConstructor('M9', 14);
            });
            it('A4', function() {
                testStringConstructor('Augmented 4', 6);
            });
            it('P2 Throws', function() {
                expect(function() {
                    consonance.Interval('P2')
                }).to.throw();
            });
            it('77P Throws', function() {
                expect(function() {
                    consonance.Interval('77P')
                }).to.throw();
            });
        });
        describe('Semitone constructor', function() {
            var testSemitoneConstructor = function(semitones, expectedName, direction) {
                var interval = consonance.Interval(semitones, direction);
                expect(interval.semitones()).to.equal(semitones);
                expect(interval.name()).to.equal(expectedName);
                if (!direction || direction == 'ascending') {
                    expect(interval.direction()).to.equal('ascending');
                } else if (direction == 'descending') {
                    expect(interval.direction()).to.equal('descending');
                }
            };
            it('Unison', function() {
                testSemitoneConstructor(0, 'P1');
            });
            it('Minor Second', function() {
                testSemitoneConstructor(1, 'm2');
            });
            it('Major Second', function() {
                testSemitoneConstructor(2, 'M2');
            });
            it('Minor Third', function() {
                testSemitoneConstructor(3, 'm3');
            });
            it('Major Third', function() {
                testSemitoneConstructor(4, 'M3');
            });
            it('Perfect Fourth', function() {
                testSemitoneConstructor(5, 'P4');
            });
            it('Tritone', function() {
                testSemitoneConstructor(6, 'A4');
            });
            it('Perfect Fifth', function() {
                testSemitoneConstructor(7, 'P5');
            });
            it('Minor Sixth', function() {
                testSemitoneConstructor(8, 'm6');
            });
            it('Major Sixth', function() {
                testSemitoneConstructor(9, 'M6');
            });
            it('Minor Seventh', function() {
                testSemitoneConstructor(10, 'm7');
            });
            it('Major Seventh', function() {
                testSemitoneConstructor(11, 'M7');
            });
            it('Octave', function() {
                testSemitoneConstructor(12, 'P8');
            });
            it('Perfect Eleventh', function() {
                testSemitoneConstructor(17, 'P11');
            });
            it('Should be possible to set direction to ascending', function() {
                testSemitoneConstructor(11, 'M7', 'ascending');
            });
            it('Should be possible to set direction to descending', function() {
                testSemitoneConstructor(11, 'M7', 'descending');
            });
        });
    });
    describe('Equals', function() {
        it('M3 equals M3', function() {
            expect(consonance.Interval('M3').equals(consonance.Interval('M3'))).to.be.true;
        });
        it('M3 doesnt equal m3', function() {
            expect(consonance.Interval('M3').equals(consonance.Interval('m3'))).to.be.false;
        });
        it('M3 doesnt equal M2', function() {
            expect(consonance.Interval('M3').equals(consonance.Interval('M2'))).to.be.false;
        });
    });
});