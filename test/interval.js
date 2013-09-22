var expect = require('chai').expect;
var consonance = require('../src/consonance').consonance;

describe('Interval', function() {
    describe('Constructors', function() {
        describe('Semitone constructor', function() {
            testSemitoneConstructor = function(semitones, expectedName, direction) {
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
});