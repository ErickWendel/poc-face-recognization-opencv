const cv = require("opencv4nodejs");
const {
  events: { subscriber },
} = require("./videoEmitter");

const { drawGreenRect } = require("./utils");
const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

const camFps = 10;
const camInterval = 1000 / camFps;

const dependencies = {
  cap: {},
  interval: 0,
};

function detectFaces(img) {
  // restrict minSize and scaleFactor for faster processing
  const options = {
    minSize: new cv.Size(100, 100),
    scaleFactor: 1.2,
    minNeighbors: 10,
  };
  return classifier.detectMultiScale(img.bgrToGray(), options).objects;
}

function onFrame(frame) {
  console.time("detection time");
  const frameResized = frame.resizeToMax(800);
  // detect faces
  const faceRects = detectFaces(frameResized);
  if (faceRects.length) {
    console.log(`face detectada`);
    // draw detection
    faceRects.forEach(faceRect => drawGreenRect(frameResized, faceRect));
  }

  cv.imshow("face detection", frameResized);
  console.timeEnd("detection time");
}

function runVideoFaceDetection(videoFile, delay) {
  dependencies.videoFile = videoFile;
  dependencies.delay = delay;

  const cap = (dependencies.cap = new cv.VideoCapture(videoFile));

  dependencies.interval = setInterval(() => {
    let frame = cap.read();
    if (frame.empty) {
      cap.reset();
      frame = cap.read();
    }
    onFrame(frame);
    // shows screen
    cv.waitKey(delay);
    // done = key !== -1 && key !== 255;
    // if (done) {
    //     clearInterval(dependencies.interval);
    //     console.log('Key pressed, exiting.');
    // }
  }, camInterval);
}

//// events
subscriber.onRestartRecord(() => {
  runVideoFaceDetection(dependencies.videoFile, dependencies.delay);
  console.log("restarting record");
});

subscriber.onStopRecord(() => {
  clearInterval(dependencies.interval);
  console.log("stopping record");
});

module.exports = runVideoFaceDetection;
