const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const color = require('../../util/color');
const log = require('../../util/log');
const cast = require('../../util/cast');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const iconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtvcGFjaXR5OjAuMzt9LmNscy0xMCwuY2xzLTJ7b3BhY2l0eTowLjE7fS5jbHMtM3tmaWxsOiM0Y2JmNTY7fS5jbHMtNHtmaWxsOm5vbmU7c3Ryb2tlOiMwYjhlNjk7fS5jbHMtNCwuY2xzLTZ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjAuNXB4O30uY2xzLTV7ZmlsbDojMGZiZDhjO30uY2xzLTZ7ZmlsbDojZmZmO3N0cm9rZTojZTZlNmU2O30uY2xzLTd7ZmlsbDojZmZhYjE5O30uY2xzLTh7ZmlsbDp1cmwoI2xpbmVhci1ncmFkaWVudCk7fS5jbHMtOXtmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50LTIpO30uY2xzLTEwe2ZpbGw6IzIzMWYyMDt9LmNscy0xMXtmaWxsOiM3Yzg3YTU7fS5jbHMtMTJ7ZmlsbDp1cmwoI2xpbmVhci1ncmFkaWVudC0zKTt9LmNscy0xM3tmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50LTQpO30uY2xzLTE0e2ZpbGw6I2U2ZTdlODt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjEwIiB5MT0iMTgiIHgyPSIxMCIgeTI9IjIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyMzFmMjAiLz48c3RvcCBvZmZzZXQ9IjAuMzMiIHN0b3AtY29sb3I9IiMyMzFmMjAiIHN0b3Atb3BhY2l0eT0iMC44OCIvPjxzdG9wIG9mZnNldD0iMC42OCIgc3RvcC1jb2xvcj0iIzIzMWYyMCIgc3RvcC1vcGFjaXR5PSIwLjUxIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjMxZjIwIiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50LTIiIHgxPSIxMCIgeTE9IjYuNTUiIHgyPSIxMCIgeTI9IjEzLjQ1IiB4bGluazpocmVmPSIjbGluZWFyLWdyYWRpZW50Ii8+PGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQtMyIgeDE9IjMyMjAuMzIiIHkxPSItNjk0IiB4Mj0iMzIyMy42OSIgeTI9Ii02OTQiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzA0IDMyMzIpIHJvdGF0ZSgtOTApIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZhYjE5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZhYjE5IiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50LTQiIHgxPSIxMCIgeTE9IjcuMDUiIHgyPSIxMCIgeTI9IjEyLjk1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjMxZjIwIi8+PHN0b3Agb2Zmc2V0PSIwLjIxIiBzdG9wLWNvbG9yPSIjMjMxZjIwIiBzdG9wLW9wYWNpdHk9IjAuODgiLz48c3RvcCBvZmZzZXQ9IjAuNDMiIHN0b3AtY29sb3I9IiMyMzFmMjAiIHN0b3Atb3BhY2l0eT0iMC41MSIvPjxzdG9wIG9mZnNldD0iMC42MyIgc3RvcC1jb2xvcj0iIzIzMWYyMCIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHRpdGxlPlNCPC90aXRsZT48ZyBpZD0iQml0Ij48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0xMywxLjlWOS4yMmEuMjQuMjQsMCwwLDEtLjI0LjI0SDcuMjhBLjI0LjI0LDAsMCwxLDcsOS4yMlYxLjlhLjUzLjUzLDAsMCwxLC4zNi0uNWwuNDQtLjEzYS4yMy4yMywwLDAsMSwuMTYsMGwuMSwwYS4yLjIsMCwwLDAsLjE3LS4wOS4yMi4yMiwwLDAsMSwuMTQtLjA4bC4zNi0uMDZhLjI0LjI0LDAsMCwxLC4xNiwwLC4yMS4yMSwwLDAsMCwuMTIsMCwuMi4yLDAsMCwwLC4xNS0uMDZBLjE5LjE5LDAsMCwxLDkuMzUsMWwuMzYsMGEuMy4zLDAsMCwxLC4xNi4wNS4xOS4xOSwwLDAsMCwuMjYsMEEuMy4zLDAsMCwxLDEwLjI5LDFsLjM2LDBhLjE5LjE5LDAsMCwxLC4xNS4wNy4yLjIsMCwwLDAsLjE1LjA2LjIxLjIxLDAsMCwwLC4xMiwwLC4zMi4zMiwwLDAsMSwuMTYsMGwuMzcuMDZhLjIuMiwwLDAsMSwuMTMuMDkuMjEuMjEsMCwwLDAsLjE3LjA4LjIzLjIzLDAsMCwwLC4xNi0uMDZoMGE1LjQ0LDUuNDQsMCwwLDEsLjU0LjE1QS41My41MywwLDAsMSwxMywxLjlaIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMTMsMS45VjkuMjJhLjI0LjI0LDAsMCwxLS4yNC4yNEg3LjI4QS4yNC4yNCwwLDAsMSw3LDkuMjJWMS45YS41My41MywwLDAsMSwuMzYtLjVsLjQ0LS4xM2EuMjMuMjMsMCwwLDEsLjE2LDBsLjEsMGEuMi4yLDAsMCwwLC4xNy0uMDkuMjIuMjIsMCwwLDEsLjE0LS4wOGwuMzYtLjA2YS4yNC4yNCwwLDAsMSwuMTYsMCwuMjEuMjEsMCwwLDAsLjEyLDAsLjIuMiwwLDAsMCwuMTUtLjA2QS4xOS4xOSwwLDAsMSw5LjM1LDFsLjM2LDBhLjMuMywwLDAsMSwuMTYuMDUuMTkuMTksMCwwLDAsLjI2LDBBLjMuMywwLDAsMSwxMC4yOSwxbC4zNiwwYS4xOS4xOSwwLDAsMSwuMTUuMDcuMi4yLDAsMCwwLC4xNS4wNi4yMS4yMSwwLDAsMCwuMTIsMCwuMzIuMzIsMCwwLDEsLjE2LDBsLjM3LjA2YS4yLjIsMCwwLDEsLjEzLjA5LjIxLjIxLDAsMCwwLC4xNy4wOC4yMy4yMywwLDAsMCwuMTYtLjA2aDBhNS40NCw1LjQ0LDAsMCwxLC41NC4xNUEuNTMuNTMsMCwwLDEsMTMsMS45WiIvPjxwYXRoIGNsYXNzPSJjbHMtNSIgZD0iTTEzLDEuOVY5LjIyYS4yNC4yNCwwLDAsMS0uMjQuMjRINy4yOEEuMjQuMjQsMCwwLDEsNyw5LjIyVjEuOWEuNTMuNTMsMCwwLDEsLjM2LS41bC40NC0uMTNhLjIzLjIzLDAsMCwxLC4xNiwwbC4xLDBhLjIuMiwwLDAsMCwuMTctLjA5LjIyLjIyLDAsMCwxLC4xNC0uMDhsLjM2LS4wNmEuMjQuMjQsMCwwLDEsLjE2LDAsLjIxLjIxLDAsMCwwLC4xMiwwLC4yLjIsMCwwLDAsLjE1LS4wNkEuMTkuMTksMCwwLDEsOS4zNSwxbC4zNiwwYS4zLjMsMCwwLDEsLjE2LjA1LjE5LjE5LDAsMCwwLC4yNiwwQS4zLjMsMCwwLDEsMTAuMjksMWwuMzYsMGEuMTkuMTksMCwwLDEsLjE1LjA3LjIuMiwwLDAsMCwuMTUuMDYuMjEuMjEsMCwwLDAsLjEyLDAsLjMyLjMyLDAsMCwxLC4xNiwwbC4zNy4wNmEuMi4yLDAsMCwxLC4xMy4wOS4yMS4yMSwwLDAsMCwuMTcuMDguMjMuMjMsMCwwLDAsLjE2LS4wNmgwYTUuNDQsNS40NCwwLDAsMSwuNTQuMTVBLjUzLjUzLDAsMCwxLDEzLDEuOVoiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNiIgY3g9IjEwIiBjeT0iMTAiIHI9IjgiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNyIgY3g9IjEwIiBjeT0iMTAiIHI9IjIuOTUiLz48ZyBjbGFzcz0iY2xzLTIiPjxwYXRoIGNsYXNzPSJjbHMtOCIgZD0iTTEwLDIuNUE3LjUsNy41LDAsMSwxLDIuNSwxMCw3LjUsNy41LDAsMCwxLDEwLDIuNU0xMCwyYTgsOCwwLDEsMCw4LDgsOCw4LDAsMCwwLTgtOFoiLz48L2c+PGcgY2xhc3M9ImNscy0yIj48cGF0aCBjbGFzcz0iY2xzLTkiIGQ9Ik0xMCw3LjA1YTMsMywwLDEsMS0yLjk1LDMsMi45NSwyLjk1LDAsMCwxLDMtMi45NW0wLS41QTMuNDUsMy40NSwwLDEsMCwxMy40NSwxMCwzLjQ2LDMuNDYsMCwwLDAsMTAsNi41NVoiLz48L2c+PGNpcmNsZSBjbGFzcz0iY2xzLTEwIiBjeD0iMTAiIGN5PSIxMCIgcj0iMi4xMSIvPjxwYXRoIGNsYXNzPSJjbHMtMTEiIGQ9Ik05Ljk0LDMuM2EuMDguMDgsMCwwLDEsLjEzLDBsLjIuMzUuMi4zNGEuMDcuMDcsMCwwLDEtLjA2LjExaC0uOEEuMDcuMDcsMCwwLDEsOS41NCw0bC4yLS4zNFoiLz48Y2lyY2xlIGNsYXNzPSJjbHMtMTIiIGN4PSIxMCIgY3k9IjEwIiByPSIxLjY4Ii8+PGcgY2xhc3M9ImNscy0yIj48cGF0aCBjbGFzcz0iY2xzLTEzIiBkPSJNMTAsNy41NUEyLjQ1LDIuNDUsMCwxLDEsNy41NSwxMCwyLjQ1LDIuNDUsMCwwLDEsMTAsNy41NW0wLS41QTMsMywwLDEsMCwxMywxMCwyLjk1LDIuOTUsMCwwLDAsMTAsNy4wNVoiLz48L2c+PHJlY3QgY2xhc3M9ImNscy0xMSIgeD0iMy4yNiIgeT0iOS41OCIgd2lkdGg9IjAuODQiIGhlaWdodD0iMC40MiIgcng9IjAuMjEiIHJ5PSIwLjIxIi8+PHJlY3QgY2xhc3M9ImNscy0xMSIgeD0iMTUuODkiIHk9IjkuNTgiIHdpZHRoPSIwLjg0IiBoZWlnaHQ9IjAuNDIiIHJ4PSIwLjIxIiByeT0iMC4yMSIvPjxyZWN0IGNsYXNzPSJjbHMtMTEiIHg9IjkuNTgiIHk9IjE1Ljg5IiB3aWR0aD0iMC44NCIgaGVpZ2h0PSIwLjQyIiByeD0iMC4yMSIgcnk9IjAuMjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2LjEgNi4xKSByb3RhdGUoOTApIi8+PHBhdGggY2xhc3M9ImNscy0xNCIgZD0iTTEzLjM3LDdBLjI1LjI1LDAsMCwxLDEzLjIxLDdhLjM5LjM5LDAsMCwwLS4wOC0uMSw0LjQ0LDQuNDQsMCwwLDAtNi4yNiwwLC4zOS4zOSwwLDAsMC0uMDguMS4yMy4yMywwLDAsMS0uMywwLC4yMS4yMSwwLDAsMSwwLS4zLjQ3LjQ3LDAsMCwxLC4xLS4xLDQuODMsNC44MywwLDAsMSw2Ljg0LDAsLjQ3LjQ3LDAsMCwxLC4xLjEuMjEuMjEsMCwwLDEsMCwuM0EuMjQuMjQsMCwwLDEsMTMuMzcsN1oiLz48ZyBjbGFzcz0iY2xzLTIiPjxwYXRoIGQ9Ik0xMC4yOSwxbC4zNiwwYS4yMi4yMiwwLDAsMSwuMTUuMDYuMTcuMTcsMCwwLDAsLjE1LjA3LjIxLjIxLDAsMCwwLC4xMiwwLC4xOS4xOSwwLDAsMSwuMTIsMGgwbC4zNy4wNmEuMjIuMjIsMCwwLDEsLjEzLjA4LjIuMiwwLDAsMCwuMzIsMGgwbC41NC4xNmEuNTIuNTIsMCwwLDEsLjM2LjV2LjY3QTgsOCwwLDEsMSw3LDIuNTdWMS45YS41Mi41MiwwLDAsMSwuMzYtLjVsLjQzLS4xM2guMDhsLjA5LDBhLjE1LjE1LDAsMCwwLC4xLDAsLjIuMiwwLDAsMCwuMTctLjA5LjIyLjIyLDAsMCwxLC4xMy0uMDhsLjM3LS4wNmgwYS4yNy4yNywwLDAsMSwuMTIsMCwuMTYuMTYsMCwwLDAsLjEyLDAsLjE4LjE4LDAsMCwwLC4xNS0uMDdBLjIyLjIyLDAsMCwxLDkuMzUsMWwuMzYsMGEuMi4yLDAsMCwxLC4xNS4wNS4yMi4yMiwwLDAsMCwuMjgsMEEuMi4yLDAsMCwxLDEwLjI5LDFtMC0uNUEuOTMuOTMsMCwwLDAsMTAsLjU1Ljg0Ljg0LDAsMCwwLDkuNzEuNWwtLjQsMEEuNzUuNzUsMCwwLDAsOSwuNjFhLjY0LjY0LDAsMCwwLS4yLDBIOC42OEw4LjMxLjY1QS44MS44MSwwLDAsMCw4LC43N0g3LjkxYS43Ni43NiwwLDAsMC0uMjEsMEw3LjI1LjkyYTEsMSwwLDAsMC0uNzEsMXYuMzRBOC41LDguNSwwLDEsMCwxOC41LDEwYTguNDQsOC40NCwwLDAsMC01LTcuNzZWMS45YTEsMSwwLDAsMC0uNy0xYy0uMi0uMDctLjM5LS4xMi0uNTgtLjE3bC0uMDYsMGgtLjE5YS45Mi45MiwwLDAsMC0uMjUtLjA5Yy0uMTIsMC0uMjUtLjA1LS4zOC0uMDZoLS4xMWEuNjkuNjksMCwwLDAtLjIsMEEuNzUuNzUsMCwwLDAsMTAuNy41MmwtLjM5LDBoMFoiLz48L2c+PC9nPjwvc3ZnPg==';

/**
 * Manage communication with a ScratchBit device over a Device Manager client socket.
 */
class ScratchBit {

    /**
     * @return {string} - the type of Device Manager device socket that this class will handle.
     */
    static get DEVICE_TYPE () {
        return 'ble';
    }

    /**
     * Construct a ScratchBit communication object.
     * @param {Socket} socket - the socket for a ScratchBit device, as provided by a Device Manager client.
     * @param {Runtime} runtime - the Scratch 3.0 runtime
     */
    constructor (socket, runtime) {
        /**
         * The socket-IO socket used to communicate with the Device Manager about this device.
         * @type {Socket}
         * @private
         */
        this._socket = socket;

        /**
         * The Scratch 3.0 runtime used to trigger the green flag button
         *
         * @type {Runtime}
         * @private
         */
        this._runtime = runtime;

        /**
         * The most recently received value for each sensor.
         * @type {Object.<string, number>}
         * @private
         */
        this._sensors = {
            gf: 0,
            btn: 0,
            tiltX: 0,
            tiltY: 0,
            tiltZ: 0,
            aMag: 0,
            aMagD: 0,
            gMag: 0,
            gMagD: 0,
            brightness: 10,
            speed: 0
        };

        this._gestures = {
            'moving': false,
            'move': {
                active: false,
                timeout: false
            },
            'shake': {
                active: false,
                timeout: false
            },
            'jump': {
                active: false,
                timeout: false
            }
        };

        //this._onRxChar = this._onRxChar.bind(this);
        //this._onDisconnect = this._onDisconnect.bind(this);

        //this._connectEvents();
    }

    /**
     * Manually dispose of this object.
     */
    dispose () {
        this._disconnectEvents();
    }

    /**
     * @return {number} - the latest value received for the tilt sensor's tilt about the X axis.
     */
    get tiltX () {
        return this._sensors.tiltX;
    }

    /**
     * @return {number} - the latest value received for the tilt sensor's tilt about the Y axis.
     */
    get tiltY () {
        return this._sensors.tiltY;
    }

    /**
     * @return {number} - the latest value received from the distance sensor.
     */
    get brightness () {
        var sBrightness = this._mapSensorVal(this._sensors.brightness, 80, 600, 0, 100);
        return Math.round(sBrightness);
    }

    get spin () {
        return this._sensors.tiltZ;
    }

    get speed () {
        return this._sensors.speed;
    }

    _setGestureTimeout (g, t) {
        var gesture = this._gestures[g];
          if (gesture.timeout) return;
        gesture.active = true;
        gesture.timeout = true;
        setTimeout(function() {
            gesture.active = false;
        }, t/2);
        setTimeout(function() {
            gesture.timeout = false;
        }, t);
    }

    _isPressed () {
        return this._sensors.btn === 1;
    }

    _isGesture (g) {
        return this._gestures[g].active;
    }

    /**
     * Attach event handlers to the device socket.
     * @private
     */
    _connectEvents () {
        this._socket.on(BLE_UUIDs.rx, this._onRxChar);
        this._socket.on('deviceWasClosed', this._onDisconnect);
        this._socket.on('disconnect', this._onDisconnect);
    }

    /**
     * Detach event handlers from the device socket.
     * @private
     */
    _disconnectEvents () {
        this._socket.off(BLE_UUIDs.rx, this._onRxChar);
        this._socket.off('deviceWasClosed', this._onDisconnect);
        this._socket.off('disconnect', this._onDisconnect);
    }

    /**
     * Process the sensor data from the incoming BLE characteristic.
     * @param {object} event - the BLE characteristic change event.
     * @property {Uint8Array} data - the incoming BLE data.
     * @private
     */
    _onRxChar (data) {

        if (data[0] >> 7) {
            this._sensors.gf = 1;
        } else {
            if (this._sensors.gf) {
                this._sensors.gf = 0;
                this._runtime.greenFlag();
            }
        }

        this._sensors.btn = (data[2] >> 1) & 1;

        this._sensors.brightness = (data[0] & 0x3F) << 4 | data[1] >> 4;

        this._sensors.tiltX = data[4];
        if ((data[2] >> 2) & 1) this._sensors.tiltX *= -1;
        this._sensors.tiltY = data[3];
        if ((data[2] >> 3) & 1) this._sensors.tiltY *= -1;

        var tmp = data[5] << 24;
        tmp |= data[6] << 16;
        tmp |= data[7] << 8;
        tmp |= data[8];
        tmp =  tmp / 10000000;
        this._sensors.aMagD = this._sensors.aMag - tmp;
        this._sensors.aMag = tmp;

        tmp = data[9] << 24;
        tmp |= data[10] << 16;
        tmp |= data[11] << 8;
        tmp |= data[12];
        tmp = tmp / 10000000;
        this._sensors.gMagD = this._sensors.gMag - tmp;
        this._sensors.gMag = tmp;

        if (Math.abs(this._sensors.aMagD) > 0.02 ||
            Math.abs(this._sensors.gMagD) > 0.02) {
            this._gestures[Gesture.MOVING] = true;
            this._setGestureTimeout(Gesture.MOVE, 250);
        } else if (Math.abs(this._sensors.aMagD) < 0.006 &&
                   Math.abs(this._sensors.gMagD) < 0.006) {
            this._gestures[Gesture.MOVING] = false;
        }

        if (Math.abs(this._sensors.aMagD) > 0.8)
            this._setGestureTimeout(Gesture.SHAKE, 300);

        if (this._gestures[Gesture.JUMP].active && this._sensors.aMag > 0.5)
            this._gestures[Gesture.JUMP].active = false;
        else if (this._sensors.aMag < 0.2)
            this._gestures[Gesture.JUMP].active = true;

        this._sensors.tiltZ = (data[13] << 8) | data[14];
        if ((this._sensors.tiltZ >> 15) & 1) {
            this._sensors.tiltZ = (this._sensors.tiltZ & 0x7FFF) - 0x7FFF;
        }

        this._sensors.tiltZ = Math.round((this._sensors.tiltZ / 16384) * 10);
        this._sensors.speed = Math.round((this._sensors.aMag - 1.0) * 100);
        if (this._sensors.speed < 0) this._sensors.speed = 0;
    }

    /**
     * React to device disconnection. May be called more than once.
     * @private
     */
    _onDisconnect () {
        this._disconnectEvents();
    }

    /**
     * Send a message to the device socket.
     * @param {string} message - the name of the message, such as 'playTone'.
     * @param {object} [details] - optional additional details for the message, such as tone duration and pitch.
     * @private
     */
    _send (message, details) {
        this._socket.emit(message, details);
    }

    _mapSensorVal (val, iMin, iMax, oMin, oMax) {
        if (val > iMax) val = iMax;
        else if (val < iMin) val = iMin;
        return (((oMax - oMin) * (val - iMin)) / (iMax - iMin)) + oMin;
    }
}

const BLE_UUIDs = {
  uuid: '4cdbbd87d6e646c29d0bdf87551e159a',
  rx: '4cdb8702d6e646c29d0bdf87551e159a'
};

const DEV_SPEC = {
  info: {
    uuid: [BLE_UUIDs.uuid],
    read_characteristics: {
      '4cdb8702d6e646c29d0bdf87551e159a': {
        notify: true
      }
    }
  },
  type: 'ble'
};

/**
 * Enum for tilt sensor direction.
 * @readonly
 * @enum {string}
 */
const TiltDirection = {
    FRONT: '1',
    BACK: '2',
    LEFT: '3',
    RIGHT: '4',
    ANY: '5'
};

const Gesture = {
    MOVE: 'move',
    MOVING: 'moving',
    SHAKE: 'shake',
    JUMP: 'jump'
};

/**
 * Scratch 3.0 blocks to interact with a ScratchBit device.
 */
class Scratch3ScratchBitBlocks {

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME() {
        return 'ScratchIt';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return 'scratchbit';
    }

    static get DARK_THRESHOLD () {
        return 15;
    }

    static get BRIGHT_THRESHOLD () {
        return 50;
    }

    /**
     * @return {number} - the tilt sensor counts as "tilted" if its tilt angle meets or exceeds this threshold.
     */
    static get TILT_THRESHOLD () {
        return 20;
    }

    /**
     * Construct a set of ScratchBit blocks.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor (runtime) {
        /**
         * The Scratch 3.0 runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        this.connect();
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: Scratch3ScratchBitBlocks.EXTENSION_ID,
            name: Scratch3ScratchBitBlocks.EXTENSION_NAME,
            blockIconURI: iconURI,
            blocks: [
                {
                    opcode: 'whenGesture',
                    text: 'when [GESTURE]',
                    blockType: BlockType.HAT,
                    arguments: {
                        GESTURE: {
                            type: ArgumentType.STRING,
                            menu: 'GESTURES',
                            defaultValue: 'moved'
                        }
                    }

                },
                {
                    opcode: 'whenPressed',
                    text: 'when button pressed',
                    blockType: BlockType.HAT
                },
                {
                    opcode: 'whenTilted',
                    text: 'when tilted [DIRECTION]?',
                    blockType: BlockType.HAT,
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.SCRATCHBIT_ALL,
                            defaultValue: TiltDirection.ANY
                        }
                    }
                },
                {
                    opcode: 'whenDark',
                    text: 'when it gets [LIGHT]',
                    blockType: BlockType.HAT,
                    arguments: {
                        LIGHT: {
                            type: ArgumentType.STRING,
                            menu: 'lightLevel',
                            defaultValue: 'dark'
                        }
                    }
                },
                '---',
                {
                    opcode: 'isResting',
                    text: 'at rest?',
                    blockType: BlockType.BOOLEAN
                },
                {
                    opcode: 'isPressed',
                    text: 'button pressed?',
                    blockType: BlockType.BOOLEAN
                },
                {
                    opcode: 'isTilted',
                    text: 'tilted [DIRECTION]?',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.SCRATCHBIT_ALL,
                            defaultValue: TiltDirection.ANY
                        }
                    }
                },
                '---',
                // {
                    // opcode: 'whenMoved',
                    // text: 'when moved',
                    // blockType: BlockType.HAT
                // },
                // {
                    // opcode: 'whenShaken',
                    // text: 'when shaken',
                    // blockType: BlockType.HAT
                // },
                // {
                    // opcode: 'whenJumped',
                    // text: 'when jumped',
                    // blockType: BlockType.HAT
                // },
                {
                    opcode: 'getSpin',
                    text: 'spin',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getSpeed',
                    text: 'speed',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getBrightness',
                    text: 'brightness',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getTiltAngle',
                    text: 'tilt angle [DIRECTION]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.SCRATCHBIT,
                            defaultValue: TiltDirection.RIGHT
                        }
                    }
                }
            ],
            menus: {
                GESTURES: ['moved', 'shaken', 'jumped'],
                lightLevel: ['dark', 'bright'],
                tiltDirection: [TiltDirection.FRONT, TiltDirection.BACK, TiltDirection.LEFT, TiltDirection.RIGHT],
                tiltDirectionAny:
                    [TiltDirection.FRONT, TiltDirection.BACK, TiltDirection.LEFT, TiltDirection.RIGHT, TiltDirection.ANY]
            }
        };
    }

    /**
     * Use the Device Manager client to attempt to connect to a ScratchBit device.
     */
    connect () {
        this._device = new ScratchBit(null, this.runtime);
        window.addEventListener('message', (event) => {
            if (event.data.type === 'data')
                this._device._onRxChar(new Uint8Array(event.data.buffer));
        }, false);
        //if (this._device || this._finder) {
            //return;
        //}
        //const deviceManager = this.runtime.ioDevices.deviceManager;
        //const finder = this._finder =
            //deviceManager.searchAndConnect(Scratch3ScratchBitBlocks.EXTENSION_NAME, ScratchBit.DEVICE_TYPE, DEV_SPEC);

        //this._finder.promise.then(
            //socket => {
                //if (this._finder === finder) {
                    //this._finder = null;
                    //this._device = new ScratchBit(socket, this.runtime);
                //} else {
                    //log.warn('Ignoring success from stale ScratchBit connection attempt');
                //}
            //},
            //reason => {
                //if (this._finder === finder) {
                    //this._finder = null;
                    //log.warn(`ScratchBit connection failed: ${reason}`);
                //} else {
                    //log.warn('Ignoring failure from stale ScratchBit connection attempt');
                //}
            //});
    }

    whenPressed () {
        return this._device._isPressed();
    }

    isPressed () {
        return this._device._isPressed();
    }

    whenGesture (args) {
        let gesture = cast.toString(args.GESTURE);
        if (gesture === 'moved') {
            return this._device._isGesture(Gesture.MOVE);
        } else if (gesture === 'shaken') {
            return this._device._isGesture(Gesture.SHAKE);
        } else if (gesture === 'jumped') {
            return this._device._isGesture(Gesture.JUMP);
        }
        return false;
    }

    // whenMoved () {
        // return this._device._isGesture(Gesture.MOVE);
    // }

    // whenShaken () {
        // return this._device._isGesture(Gesture.SHAKE);
    // }

    // whenJumped () {
        // return this._device._isGesture(Gesture.JUMP);
    // }

    isResting () {
        return !this._device._gestures['moving'];
    }

    /**
     * Compare the distance sensor's value to a reference.
     * @param {object} args - the block's arguments.
     * @property {string} OP - the comparison operation: '<' or '>'.
     * @property {number} REFERENCE - the value to compare against.
     * @return {boolean} - the result of the comparison, or false on error.
     */
    whenDark (args) {
        if (args.LIGHT === 'dark')
          return this._device.brightness < Scratch3ScratchBitBlocks.DARK_THRESHOLD;
        else
          return this._device.brightness > Scratch3ScratchBitBlocks.BRIGHT_THRESHOLD;
    }

    /**
     * Test whether the tilt sensor is currently tilted.
     * @param {object} args - the block's arguments.
     * @property {TiltDirection} DIRECTION - the tilt direction to test (front, back, left, right, or any).
     * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
     */
    whenTilted (args) {
        return this._isTilted(args.DIRECTION);
    }

    /**
     * @return {number} - the distance sensor's value, scaled to the [0,100] range.
     */
    getBrightness () {
        return this._device.brightness;
    }

    /**
     * Test whether the tilt sensor is currently tilted.
     * @param {object} args - the block's arguments.
     * @property {TiltDirection} DIRECTION - the tilt direction to test (front, back, left, right, or any).
     * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
     */
    isTilted (args) {
        return this._isTilted(args.DIRECTION);
    }

    /**
     * @param {object} args - the block's arguments.
     * @property {TiltDirection} DIRECTION - the direction (front, back, left, right) to check.
     * @return {number} - the tilt sensor's angle in the specified direction.
     * Note that getTiltAngle(front) = -getTiltAngle(back) and getTiltAngle(left) = -getTiltAngle(right).
     */
    getTiltAngle (args) {
        return this._getTiltAngle(args.DIRECTION);
    }

    getSpin (args) {
        return this._device.spin;
    }

    getSpeed (args) {
        return this._device.speed;
    }

    /**
     * Test whether the tilt sensor is currently tilted.
     * @param {TiltDirection} direction - the tilt direction to test (front, back, left, right, or any).
     * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
     * @private
     */
    _isTilted (direction) {
        direction = cast.toString(direction);
        switch (direction) {
        case TiltDirection.ANY:
            return (Math.abs(this._device.tiltX) >= Scratch3ScratchBitBlocks.TILT_THRESHOLD) ||
                (Math.abs(this._device.tiltY) >= Scratch3ScratchBitBlocks.TILT_THRESHOLD);
        default:
            return this._getTiltAngle(direction) >= Scratch3ScratchBitBlocks.TILT_THRESHOLD;
        }
    }

    /**
     * @param {TiltDirection} direction - the direction (front, back, left, right) to check.
     * @return {number} - the tilt sensor's angle in the specified direction.
     * Note that getTiltAngle(front) = -getTiltAngle(back) and getTiltAngle(left) = -getTiltAngle(right).
     * @private
     */
    _getTiltAngle (direction) {
        direction = cast.toString(direction);
        switch (direction) {
        case TiltDirection.FRONT:
            return this._device.tiltY;
        case TiltDirection.BACK:
            return -this._device.tiltY;
        case TiltDirection.LEFT:
            return -this._device.tiltX;
        case TiltDirection.RIGHT:
            return this._device.tiltX;
        default:
            log.warn(`Unknown tilt direction in _getTiltAngle: ${direction}`);
        }
    }
}

module.exports = Scratch3ScratchBitBlocks;
