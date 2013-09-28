exports.List = function(origItems) {
    var copyArray = function(origArray) {
        var copy = [];
        for (var i in origArray) {
            var item = origArray[i];
            copy.push(item);
        }
        return copy;
    };

    var items = copyArray(origItems);

    if (items === undefined) {
        throw new Error('List items undefined');
    }

    return {
        size: function() {
            return items.length;
        },
        get: function(i) {
            return items[i];
        },
        equals: function(other) {
            if (this.size() != other.size()) {
                return false;
            }
            for (var i in items) {
                if (this.get(i) != other.get(i)) {
                    return false;
                }
            }
            return true;
        },
        asArray: function() {
            return copyArray(items);
        }
    };
};