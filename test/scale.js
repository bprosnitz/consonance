var expect = require('chai').expect;
var consonance = require('../src/consonance').consonance;

describe('Scale', function() {
    describe('Specific scales', function() {
        describe('Major scale', function() {
            it('Correct number of intervals', function() {
                expect(consonance.Scale('major').size()).to.equal(7);
            });
            it('Differences between intervals should be correct', function() {
                var major = consonance.Scale('major');
                expect(major.interval(0).minus(major.interval(1)).semitones()).to.equal(2);
                expect(major.interval(1).minus(major.interval(2)).semitones()).to.equal(2);
                expect(major.interval(2).minus(major.interval(3)).semitones()).to.equal(1);
                expect(major.interval(3).minus(major.interval(4)).semitones()).to.equal(2);
                expect(major.interval(4).minus(major.interval(5)).semitones()).to.equal(2);
                expect(major.interval(5).minus(major.interval(6)).semitones()).to.equal(2);
                expect(consonance.Interval(12).minus(major.interval(6).minus(major.interval(0))).semitones()).to.equal(1);
            });
        });
        describe('Minor scale', function() {
            it('Correct number of intervals', function() {
                expect(consonance.Scale('minor').size()).to.equal(7);
            });
            it('Differences between intervals should be correct', function() {
                var major = consonance.Scale('minor');
                expect(major.interval(0).minus(major.interval(1)).semitones()).to.equal(2);
                expect(major.interval(1).minus(major.interval(2)).semitones()).to.equal(1);
                expect(major.interval(2).minus(major.interval(3)).semitones()).to.equal(2);
                expect(major.interval(3).minus(major.interval(4)).semitones()).to.equal(2);
                expect(major.interval(4).minus(major.interval(5)).semitones()).to.equal(1);
                expect(major.interval(5).minus(major.interval(6)).semitones()).to.equal(2);
                expect(consonance.Interval(12).minus(major.interval(6).minus(major.interval(0))).semitones()).to.equal(2);
            });
        });
        describe('Major pentatonic scale', function() {
            it('Correct number of intervals', function() {
                expect(consonance.Scale('major pentatonic').size()).to.equal(5);
            });
            it('Differences between intervals should be correct', function() {
                var major = consonance.Scale('major pentatonic');
                expect(major.interval(0).minus(major.interval(1)).semitones()).to.equal(2);
                expect(major.interval(1).minus(major.interval(2)).semitones()).to.equal(2);
                expect(major.interval(2).minus(major.interval(3)).semitones()).to.equal(3);
                expect(major.interval(3).minus(major.interval(4)).semitones()).to.equal(2);
                expect(consonance.Interval(12).minus(major.interval(4).minus(major.interval(0))).semitones()).to.equal(3);
            });
        });
        describe('Minor scale', function() {
            it('Correct number of intervals', function() {
                expect(consonance.Scale('minor pentatonic').size()).to.equal(5);
            });
            it('Differences between intervals should be correct', function() {
                var major = consonance.Scale('minor pentatonic');
                expect(major.interval(0).minus(major.interval(1)).semitones()).to.equal(3);
                expect(major.interval(1).minus(major.interval(2)).semitones()).to.equal(2);
                expect(major.interval(2).minus(major.interval(3)).semitones()).to.equal(2);
                expect(major.interval(3).minus(major.interval(4)).semitones()).to.equal(3);
                expect(consonance.Interval(12).minus(major.interval(4).minus(major.interval(0))).semitones()).to.equal(2);
            });
        });
    });
});