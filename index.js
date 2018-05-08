const cv = require("opencv4nodejs");
const {
  events: { publisher },
} = require("./utils/videoEmitter");
const runVideoFaceDetection = require("./utils/grabFrames");

const webcamPort = 0;
const delay = 1;

runVideoFaceDetection(webcamPort, delay);

let done = false;
(async () => {
  setInterval(async () => {
    if (done) {
      publisher.restartRecord();
      done = false;
      await new Promise(resolve => setTimeout(resolve, 2000));
      // return;
    }
    publisher.stopRecord();

    done = true;
  }, 1000);
})();
