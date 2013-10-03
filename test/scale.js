var expect = require('chai').expect;
var consonance = require('../src/consonance').consonance;

describe('Scale', function() {
    describe('Specific scales', function() {
        describe('Major scale', function() {
            it('Correct number of intervals', function() {
                expect(consonance.Scale('major').intervals().size()).to.equal(7);
            });
            it('Differences between intervals should be correct', function() {
                var major = consonance.Scale('major');
                expect(major.intervals().get(0).minus(major.intervals().get(1)).semitones()).to.equal(2);
                expect(major.intervals().get(1).minus(major.intervals().get(2)).semitones()).to.equal(2);
                expect(major.intervals().get(2).minus(major.intervals().get(3)).semitones()).to.equal(1);
                expect(major.intervals().get(3).minus(major.intervals().get(4)).semitones()).to.equal(2);
                expect(major.intervals().get(4).minus(major.intervals().get(5)).semitones()).to.equal(2);
                expect(major.intervals().get(5).minus(major.intervals().get(6)).semitones()).to.equal(2);
                expect(consonance.Interval(12).minus(major.intervals().get(6).minus(major.intervals().get(0))).semitones()).to.equal(1);
            });
        });
        describe('Minor scale', function() {
            it('Correct number of intervals', function() {
                expect(consonance.Scale('minor').intervals().size()).to.equal(7);
            });
            it('Differences between intervals should be correct', function() {
                var major = consonance.Scale('minor');
                expect(major.intervals().get(0).minus(major.intervals().get(1)).semitones()).to.equal(2);
                expect(major.intervals().get(1).minus(major.intervals().get(2)).semitones()).to.equal(1);
                expect(major.intervals().get(2).minus(major.intervals().get(3)).semitones()).to.equal(2);
                expect(major.intervals().get(3).minus(major.intervals().get(4)).semitones()).to.equal(2);
                expect(major.intervals().get(4).minus(major.intervals().get(5)).semitones()).to.equal(1);
                expect(major.intervals().get(5).minus(major.intervals().get(6)).semitones()).to.equal(2);
                expect(consonance.Interval(12).minus(major.intervals().get(6).minus(major.intervals().get(0))).semitones()).to.equal(2);
            });
        });
        describe('Major pentatonic scale', function() {
            it('Correct number of intervals', function() {
                expect(consonance.Scale('major pentatonic').intervals().size()).to.equal(5);
            });
            it('Differences between intervals should be correct', function() {
                var major = consonance.Scale('major pentatonic');
                expect(major.intervals().get(0).minus(major.intervals().get(1)).semitones()).to.equal(2);
                expect(major.intervals().get(1).minus(major.intervals().get(2)).semitones()).to.equal(2);
                expect(major.intervals().get(2).minus(major.intervals().get(3)).semitones()).to.equal(3);
                expect(major.intervals().get(3).minus(major.intervals().get(4)).semitones()).to.equal(2);
                expect(consonance.Interval(12).minus(major.intervals().get(4).minus(major.intervals().get(0))).semitones()).to.equal(3);
            });
        });
        describe('Minor scale', function() {
            it('Correct number of intervals', function() {
                expect(consonance.Scale('minor pentatonic').intervals().size()).to.equal(5);
            });
            it('Differences between intervals should be correct', function() {
                var major = consonance.Scale('minor pentatonic');
                expect(major.intervals().get(0).minus(major.intervals().get(1)).semitones()).to.equal(3);
                expect(major.intervals().get(1).minus(major.intervals().get(2)).semitones()).to.equal(2);
                expect(major.intervals().get(2).minus(major.intervals().get(3)).semitones()).to.equal(2);
                expect(major.intervals().get(3).minus(major.intervals().get(4)).semitones()).to.equal(3);
                expect(consonance.Interval(12).minus(major.intervals().get(4).minus(major.intervals().get(0))).semitones()).to.equal(2);
            });
        });
    });
});