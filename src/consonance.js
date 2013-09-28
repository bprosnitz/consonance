var note = require('./note');
var interval = require('./interval');
var tuning = require('./tuning');
var scale = require('./scale');
var list = require('./list');

exports.consonance = {
    Note: note.Note,
    Interval: interval.Interval,
    Tuning: tuning.Tuning,
    Scale: scale.Scale,
    List: list.List
};
