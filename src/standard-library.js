'use strict';

var Collection = function () {
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.collection = [];
};

Collection.prototype.pickFirst = function () {
    if (this.isEmpty) {
        return null;
    }
    var first = this.collection[0];
    this.collection = this.collection.slice(1);
    this.length--;
    this.first = this.collection[0];
    this.last = this.collection[this.length - 1];
    this.isEmpty = this.length == 0;
    return first;
};

Collection.prototype.pickLast = function () {
    if (this.isEmpty) {
        return null;
    }
    var last = this.collection[this.length - 1];
    this.collection = this.collection.slice(0, this.length - 1);
    this.length--;
    this.first = this.collection[0];
    this.last = this.collection[this.length - 1];
    this.isEmpty = this.length == 0;
    return last;
};

Collection.prototype.insertFirst = function (element) {
    var newCollection = [element];
    newCollection = newCollection.concat(this.collection);
    this.collection = newCollection;
    this.length++;
    this.first = this.collection[0];
    this.last = this.collection[this.length - 1];
    this.isEmpty = this.length == 0;
};

Collection.prototype.insertLast = function (element) {
    this.collection.push(element);
    this.length++;
    this.first = this.collection[0];
    this.last = this.collection[this.length - 1];
    this.isEmpty = this.length == 0;
};

Collection.prototype.empty = function () {
    this.first = null;
    this.last = null;
    this.length = 0;
    this.isEmpty = true;
    this.collection = [];
};

var Queue = function () {
    this.length = 0;
    this.queue = [];
};

Queue.prototype.enqueue = function (item) {
    this.queue = this.queue.concat([item]);
    this.length++;
};

Queue.prototype.dequeue = function () {
    if (!this.length) {
        return;
    }
    var item = this.queue[0];
    this.queue = this.queue.slice(1);
    this.length--;
    return item;
};

Queue.prototype.empty = function () {
    this.length = 0;
    this.queue = [];
};

var FixedArray = function (size) {
    this.length = size;
    this.fixedArray = [];
};

FixedArray.prototype.insertAt = function (index, item) {
    if (index < 0 || index >= this.length) {
        throw new RangeError('Index вышел за границы массива');
    }
    var newFixedArray1 = this.fixedArray.slice(0, index);
    var newFixedArray2 = this.fixedArray.slice(index);
    this.fixedArray = newFixedArray1.concat(item, newFixedArray2);
    this.fixedArray = this.fixedArray.slice(0, this.length);
};

FixedArray.prototype.getAt = function (index) {
    if (index < 0 || index >= this.length) {
        throw new RangeError('Index вышел за границы массива');
    }
    return this.fixedArray[index];
};

var Set = function () {
    this.length = 0;
    this.set = [];
};

Set.prototype.insert = function (item) {
    if (this.set.indexOf(item) == -1) {
        this.set.push(item);
        this.length++;
    }
};

Set.prototype.remove = function (item) {
    var index = this.set.indexOf(item);
    if (index != -1) {
        var newSet1 = this.set.slice(0, index);
        var newSet2 = this.set.slice(index + 1);
        this.set = newSet1.concat(newSet2);
        this.length--;
    }
};

Set.prototype.has = function (item) {
    return this.set.indexOf(item) != -1;
};

Set.prototype.intersect = function (set) {
    var intersection = new Set();
    this.set.forEach(function (item) {
        if (set.has(item)) {
            intersection.insert(item);
        }
    });
    return intersection;
};

Set.prototype.union = function (set) {
    var union = new Set();
    this.set.forEach(function (item) {
        union.insert(item);
    });
    set.set.forEach(function (item) {
        union.insert(item);
    });
    return union;
};

var PriorityQueue = function () {
    this.length = 0;
    this.queue = new Queue();
};

PriorityQueue.prototype.enqueue = function (item, priority) {
    var queue = this.queue.queue;
    var obj = {
        item: item,
        priority: priority
    };
    if (this.length == 0 || queue[this.length - 1].priority >= priority) {
        this.queue.enqueue(obj);
    } else {
        for (var index = 0; index < queue.length; index++) {
            if (queue[index].priority < priority) {
                var newQueue1 = queue.slice(0, index);
                var newQueue2 = queue.slice(index);
                this.queue.queue = newQueue1.concat(obj, newQueue2);
                this.queue.length++;
                break;
            }
        }
    }
    this.length++;
};

PriorityQueue.prototype.dequeue = function () {
    this.length--;
    return this.queue.dequeue();
};

var Map = function () {
    this.length = 0;
    this.keys = [];
    this.values = [];
};

Map.prototype.addItem = function (key, item) {
    var index = this.keys.indexOf(key);
    if (index != -1) {
        this.values[index] = item;
    } else {
        this.keys.push(key);
        this.values.push(item);
        this.length++;
    }
};

Map.prototype.removeItem = function (key) {
    var index = this.keys.indexOf(key);
    if (index != -1) {
        var item = this.values[index];
        var prevKeys = this.keys.slice(0, index);
        this.keys = prevKeys.concat(this.keys.slice(index + 1));
        var prevValues = this.values.slice(0, index);
        this.values = prevValues.concat(this.values.slice(index + 1));
        this.length--;
    } else {
        return;
    }
};

Map.prototype.getItem = function (key) {
    var index = this.keys.indexOf(key);
    return index == -1 ? undefined : this.values[index];
};

Map.prototype.empty = function () {
    this.length = 0;
    this.keys = [];
    this.values = [];
};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;