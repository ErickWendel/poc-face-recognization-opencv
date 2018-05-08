const EventEmitter = require("events");
class VideoEmmiter extends EventEmitter {}
const videoEmitter = new VideoEmmiter();

const events = {
  stopRecord: "stop-record",
  restartRecord: "restart-record",
};
function pubStopRecord() {
  videoEmitter.emit(events.stopRecord);
}
function pubRestartRecord() {
  videoEmitter.emit(events.restartRecord);
}

function subStopRecord(fn) {
  videoEmitter.on(events.stopRecord, fn);
}

function subRestartRecord(fn) {
  videoEmitter.on(events.restartRecord, fn);
}

module.exports = {
  events: {
    publisher: {
      stopRecord: pubStopRecord,
      restartRecord: pubRestartRecord,
    },
    subscriber: {
      stopRecord: subStopRecord,
      restartRecord: subRestartRecord,
    },
  },
};
