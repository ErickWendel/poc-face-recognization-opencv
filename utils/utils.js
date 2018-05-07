const path = require('path');

const cv = require('opencv4nodejs');
// const camWidth = 320;
// const camHeight = 240;
// const camFps = 10;
// const camInterval = 1000 / camFps;
const camInterval = 0;

const dataPath = path.resolve(__dirname, '../data');

const getDataFilePath = fileName => path.resolve(dataPath, fileName);

const grabFrames = (videoFile, delay, onFrame) => {
    const cap = new cv.VideoCapture(videoFile);
    let done = false;
    const intvl = setInterval(() => {
        let frame = cap.read();
        // loop back to start on end of stream reached
        if (frame.empty) {
            cap.reset();
            frame = cap.read();
        }
        onFrame(frame);

        const key = cv.waitKey(delay);
        done = key !== -1 && key !== 255;
        if (done) {
            clearInterval(intvl);
            console.log('Key pressed, exiting.');
        }
    }, camInterval);
};

const drawRectAroundBlobs = (binaryImg, dstImg, minPxSize, fixedRectWidth) => {
    const {
        centroids,
        stats
    } = binaryImg.connectedComponentsWithStats();

    // pretend label 0 is background
    for (let label = 1; label < centroids.rows; label += 1) {
        const [x1, y1] = [stats.at(label, cv.CC_STAT_LEFT), stats.at(label, cv.CC_STAT_TOP)];
        const [x2, y2] = [
            x1 + (fixedRectWidth || stats.at(label, cv.CC_STAT_WIDTH)),
            y1 + (fixedRectWidth || stats.at(label, cv.CC_STAT_HEIGHT))
        ];
        const size = stats.at(label, cv.CC_STAT_AREA);
        const blue = new cv.Vec(255, 0, 0);
        if (minPxSize < size) {
            dstImg.drawRectangle(
                new cv.Point(x1, y1),
                new cv.Point(x2, y2),
                { color: blue, thickness: 2 }
            );
        }
    }
};

const drawRect = (image, rect, color, opts = { thickness: 2 }) => {
    return image.drawRectangle(
        rect,
        color,
        opts.thickness,
        cv.LINE_8
    );
}

const drawBlueRect = (image, rect, opts = { thickness: 2 }) => {
    return drawRect(image, rect, new cv.Vec(255, 0, 0), opts);
}
const drawGreenRect = (image, rect, opts = { thickness: 2 }) => {
    return drawRect(image, rect, new cv.Vec(0, 255, 0), opts);
}
const drawRedRect = (image, rect, opts = { thickness: 2 }) => {
    return drawRect(image, rect, new cv.Vec(0, 0, 255), opts);
}

module.exports = {
    drawBlueRect,
    drawGreenRect,
    drawRedRect,
    drawRect,
    drawRectAroundBlobs,
    grabFrames,
    getDataFilePath,
    dataPath
}