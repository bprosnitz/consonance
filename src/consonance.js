var note = require('./note');
var interval = require('./interval');
var tuning = require('./tuning');

exports.consonance = {
    Note: note.Note,
    Interval: interval.Interval,
    Tuning: tuning.Tuning
};
