var expect = require('chai').expect;
var consonance = require('../src/consonance').consonance;

describe('List', function() {
    describe('size()', function() {
        it('should be 6 for 6 elements', function() {
            expect(consonance.List([1, 2, 3, 4, 5, 6]).size()).to.equal(6);
        });
    });
    describe('get()', function() {
       it('should get the correct element', function() {
           expect(consonance.List([0, 2, 4, 6]).get(0)).to.equal(0);
           expect(consonance.List([0, 2, 4, 6]).get(2)).to.equal(4);
           expect(consonance.List([0, 2, 4, 6]).get(-1)).to.equal(undefined);
           expect(consonance.List([0, 2, 4, 6]).get(4)).to.equal(undefined);
       });
    });
    describe('equals()', function() {
        it('should return true when arrays are equal', function() {
            expect(consonance.List([0, 2, 4, 6]).equals(consonance.List([0, 2, 4, 6]))).to.be.true;
        });
        it('should return false when arrays are different', function() {
            expect(consonance.List([0, 2, 4, 6]).equals(consonance.List([0, 2, 6, 4]))).to.be.false;
            expect(consonance.List([0, 2, 4, 6]).equals(consonance.List([3]))).to.be.false;
            expect(consonance.List([0, 2, 4, 6]).equals(consonance.List([1, 3, 5, 7]))).to.be.false;
        });
    });
    describe('asArray()', function() {
        it('should return a copy of the array', function() {
            var list = consonance.List([0, 2, 4]).asArray();
            expect(list.length).to.equal(3);
            expect(list[0]).to.equal(0);
            expect(list[1]).to.equal(2);
            expect(list[2]).to.equal(4);
        });
        it('should return an array that does not change the existing array', function() {
            var list = consonance.List([0, 2, 4]);
            var data = list.asArray();
            data.push(7);
            data[0] = 1;
            expect(list.equals(consonance.List([0, 2, 4]))).to.be.true;
        });
    });
    describe('map()', function() {
        it('should work with simple function', function() {
            expect(consonance.List([0, 2, 4]).map(function(x) { return x + 1; }).
                equals(consonance.List([1, 3, 5]))).to.be.true;
        });
    });
    it('should not change if initial list changes', function() {
        var initialList = [1, 2, 3];
        var list = consonance.List(initialList);
        initialList.pop();
        initialList[0] = 5;
        expect(list.equals(consonance.List([1, 2, 3]))).to.be.true;
    });
});