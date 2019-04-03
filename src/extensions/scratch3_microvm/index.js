const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');
const cast = require('../../util/cast');
const formatMessage = require('format-message');
const BLE = require('../../io/ble');
const Base64Util = require('../../util/base64-util');

/**
 * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,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';

/**
 * Enum for microvm BLE command protocol.
 * https://github.com/LLK/scratch-microvm-firmware/blob/master/protocol.md
 * @readonly
 * @enum {number}
 */
const BLECommand = {
    CMD_PIN_CONFIG: 0x80,
    CMD_DISPLAY_TEXT: 0x81,
    CMD_DISPLAY_LED: 0x82
};


/**
 * A time interval to wait (in milliseconds) before reporting to the BLE socket
 * that data has stopped coming from the peripheral.
 */
const BLETimeout = 4500;

/**
 * A time interval to wait (in milliseconds) while a block that sends a BLE message is running.
 * @type {number}
 */
const BLESendInterval = 100;

/**
 * A string to report to the BLE socket when the microvm has stopped receiving data.
 * @type {string}
 */
const BLEDataStoppedError = 'microvm extension stopped receiving data';

/**
 * Enum for microvm protocol.
 * https://github.com/LLK/scratch-microvm-firmware/blob/master/protocol.md
 * @readonly
 * @enum {string}
 */
const BLEUUID = {
    service: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
    rxChar: '6e400003-b5a3-f393-e0a9-e50e24dcca9e',
    txChar: '6e400002-b5a3-f393-e0a9-e50e24dcca9e'
};

/**
 * Manage communication with a MicroVM peripheral over a Scrath Link client socket.
 */
class MicroVM {

    /**
     * Construct a MicroVM communication object.
     * @param {Runtime} runtime - the Scratch 3.0 runtime
     * @param {string} extensionId - the id of the extension
     */
    constructor (runtime, extensionId) {

        /**
         * The Scratch 3.0 runtime used to trigger the green flag button.
         * @type {Runtime}
         * @private
         */
        this._runtime = runtime;

        /**
         * The BluetoothLowEnergy connection socket for reading/writing peripheral data.
         * @type {BLE}
         * @private
         */
        this._ble = null;
        this._runtime.registerPeripheralExtension(extensionId, this);

        /**
         * The id of the extension this peripheral belongs to.
         */
        this._extensionId = extensionId;

        /**
         * The most recently received value for each sensor.
         * @type {Object.<string, number>}
         * @private
         */
        this._sensors = {
            buttonA: 0,
            buttonB: 0
        };

        /**
         * Interval ID for data reading timeout.
         * @type {number}
         * @private
         */
        this._timeoutID = null;

        /**
         * A flag that is true while we are busy sending data to the BLE socket.
         * @type {boolean}
         * @private
         */
        this._busy = false;

        this._busyPacket = false;

        /**
         * ID for a timeout which is used to clear the busy flag if it has been
         * true for a long time.
         */
        this._busyTimeoutID = null;

        this.disconnect = this.disconnect.bind(this);
        this._onConnect = this._onConnect.bind(this);
        this._onMessage = this._onMessage.bind(this);
    }

    setLED (led, state) {
        let output = new Uint8Array(6);
        output[0] = 0xf8;
        output[1] = 4;
        output[2] = 1;
        output[3] = led;
        output[4] = (state === 'on') ? 0x44 : 0x45;
        return this.send(output);
    }

    writeFlash (text) {
        return this.send(text);
    }

    eraseFlash (addr) {
        let output = new Uint8Array(6);
        output[0] = 0xFB;
        output[1] = addr & 0xFF;
        output[2] = (addr >> 8) & 0xFF;
        output[3] = (addr >> 16) & 0xFF;
        output[4] = (addr >> 24) & 0xFF;
        return this.send(output);
    }

    readMemory (addr, length) {
        let output = new Uint8Array(6);
        output[0] = 0xFE;
        for (let i=0,n=0; i<length; i+=16,n++) {
            setTimeout(() => {
                let size = (length - i < 16) ? length - i : 16;
                addr += size;
                output[1] = addr & 0xFF;
                output[2] = (addr >> 8) & 0xFF;
                output[3] = (addr >> 16) & 0xFF;
                output[4] = (addr >> 24) & 0xFF;
                output[5] = size;
                this.send(output);
            }, n*50);
        }
    }

    /**
     * Called by the runtime when user wants to scan for a peripheral.
     */
    scan () {
        if (this._ble) {
            this._ble.disconnect();
        }
        this._ble = new BLE(this._runtime, this._extensionId, {
            filters: [
                {services: [BLEUUID.service]}
            ]
        }, this._onConnect, this.disconnect);
    }

    /**
     * Called by the runtime when user wants to connect to a certain peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect (id) {
        if (this._ble) {
            this._ble.connectPeripheral(id);
        }
    }

    /**
     * Disconnect from the microvm.
     */
    disconnect () {
        window.clearTimeout(this._timeoutID);
        if (this._ble) {
            this._ble.disconnect();
        }
    }

    /**
     * Return true if connected to the microvm.
     * @return {boolean} - whether the microvm is connected.
     */
    isConnected () {
        let connected = false;
        if (this._ble) {
            connected = this._ble.isConnected();
        }
        return connected;
    }

    /**
     * Send a message to the peripheral BLE socket.
     * @param {number} command - the BLE command hex.
     * @param {Uint8Array} message - the message to write
     */
    send (message) {
        if (!this.isConnected()) return;
        if (this._busy) return;

        // Set a busy flag so that while we are sending a message and waiting for
        // the response, additional messages are ignored.
        this._busy = true;

        // Set a timeout after which to reset the busy flag. This is used in case
        // a BLE message was sent for which we never received a response, because
        // e.g. the peripheral was turned off after the message was sent. We reset
        // the busy flag after a while so that it is possible to try again later.
        this._busyTimeoutID = window.setTimeout(() => {
            this._busy = false;
        }, 5000);

        // const output = new Uint8Array(message.length + 1);
        // output[0] = command; // attach command to beginning of message
        // for (let i = 0; i < message.length; i++) {
            // output[i + 1] = message[i];
        // }
        let packets = [];
        for (let i=0,n=0; i<message.length; i+=20,n++) {
            setTimeout(() => {
                this._busy = true;
                let packet = message.slice(i, i+20);
                console.log('Sent:    ', Array.from(packet));
                const data = Base64Util.uint8ArrayToBase64(packet);
                this._ble.write(BLEUUID.service, BLEUUID.txChar, data, 'base64', true).then(
                    () => {
                        this._busy = false;
                        window.clearTimeout(this._busyTimeoutID);
                    }
                );
            }, n*50);
        }
    }

    /**
     * Starts reading data from peripheral after BLE has connected to it.
     * @private
     */
    _onConnect () {
        this._ble.startNotifications(BLEUUID.service, BLEUUID.rxChar, this._onMessage);
        // this._timeoutID = window.setTimeout(
            // () => this._ble.handleDisconnectError(BLEDataStoppedError),
            // BLETimeout
        // );
    }

    /**
     * Process the sensor data from the incoming BLE characteristic.
     * @param {object} base64 - the incoming BLE data.
     * @private
     */
    _onMessage (base64) {

        // parse data
        const data = Base64Util.base64ToUint8Array(base64);
        console.log('Received:', Array.from(data));

        // this._sensors.tiltX = data[1] | (data[0] << 8);
        // if (this._sensors.tiltX > (1 << 15)) this._sensors.tiltX -= (1 << 16);
        // this._sensors.tiltY = data[3] | (data[2] << 8);
        // if (this._sensors.tiltY > (1 << 15)) this._sensors.tiltY -= (1 << 16);

        // this._sensors.buttonA = data[4];
        // this._sensors.buttonB = data[5];

        // this._sensors.touchPins[0] = data[6];
        // this._sensors.touchPins[1] = data[7];
        // this._sensors.touchPins[2] = data[8];

        // this._sensors.gestureState = data[9];

        // cancel disconnect timeout and start a new one
        // window.clearTimeout(this._timeoutID);
        // this._timeoutID = window.setTimeout(
            // () => this._ble.handleDisconnectError(BLEDataStoppedError),
            // BLETimeout
        // );
    }
}

/**
 * Enum for microvm buttons.
 * @readonly
 * @enum {string}
 */
const MicroVMButtons = {
    A: 'A',
    B: 'B',
    ANY: 'any'
};

const DefaultProgram = '0xFC, 0x00, 0x00, 0x03, 0x00, 0x6C, 0x80, 0x40, 0x00, 0x00, 0x81, 0x4e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x44, 0x01, 0x01, 0x26, 0x01, 0x00, 0x45, 0x01, 0x01, 0x26, 0x09, 0x00, 0x01, 0x0a, 0x03, 0x13, 0x00, 0x01, 0x01, 0x44, 0x02, 0x14, 0x00, 0x00, 0x00, 0x26, 0x01, 0x01, 0x45, 0x02, 0x14, 0x00, 0x00, 0x00, 0x26, 0x04, 0x0d, 0x09, 0xFF, 0xFF, 0xFF';
/**
 * Scratch 3.0 blocks to interact with a MicroVM peripheral.
 */
class Scratch3MicroVMBlocks {

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return 'microvm';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return 'microvm';
    }

    get LED_STATE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microvm.ledStateMenu.on',
                    default: 'on',
                    description: 'label for on state'
                }),
                value: 'on'
            },
            {
                text: formatMessage({
                    id: 'microvm.ledStateMenu.off',
                    default: 'off',
                    description: 'label for on state'
                }),
                value: 'off'
            }
        ];
    }

    /**
     * Construct a set of MicroVM blocks.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor (runtime) {
        /**
         * The Scratch 3.0 runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // Create a new MicroVM peripheral instance
        this._peripheral = new MicroVM(this.runtime, Scratch3MicroVMBlocks.EXTENSION_ID);
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: Scratch3MicroVMBlocks.EXTENSION_ID,
            name: Scratch3MicroVMBlocks.EXTENSION_NAME,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'setLED',
                    text: formatMessage({
                        id: 'microvm.setLED',
                        default: 'turn LED [LED] [STATE]',
                        description: 'Toggle LED on and off'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        LED: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'microvm.defaultLED',
                                default: '0',
                                description: 'Default LED to toggle'
                            })
                        },
                        STATE: {
                            type: ArgumentType.STRING,
                            menu: 'ledState',
                            defaultValue: 'on'
                        }
                    }
                },
                {
                    opcode: 'writeFlash',
                    text: formatMessage({
                        id: 'microvm.writeFlash',
                        default: 'write flash [BYTES]',
                        description: 'Send bytes to flash memory'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        BYTES: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'microvm.defaultBytesToFlash',
                                default: DefaultProgram,
                                description: 'Send bytes to be written to flash memory'
                            })
                        }
                    }
                },
                {
                    opcode: 'eraseFlash',
                    text: formatMessage({
                        id: 'microvm.eraseFlash',
                        default: 'erase flash [ADDR]',
                        description: 'Erase bytes at flash memory location'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ADDR: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'microvm.defaultAddrToErase',
                                default: '0x30000',
                                description: 'Erase flash memory at location'
                            })
                        }
                    }
                },
                {
                    opcode: 'dump',
                    text: formatMessage({
                        id: 'microvm.dump',
                        default: 'dump [ADDR] [LEN]',
                        description: 'dump memory location'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ADDR: {
                            type: ArgumentType.NUMBER,
                            defaultValue: formatMessage({
                                id: 'microvm.defaultMemoryAddress',
                                default: '0x30000',
                                description: 'default memory location.'
                            })
                        },
                        LEN: {
                            type: ArgumentType.NUMBER,
                            defaultValue: formatMessage({
                                id: 'microvm.defaultMemoryLength',
                                default: '100',
                                description: 'default memory dump length.'
                            })
                        }
                    }
                },
                {
                    opcode: 'download',
                    text: formatMessage({
                        id: 'microvm.download',
                        default: 'download',
                        description: 'download bytes to microvm'
                    }),
                    blockType: BlockType.COMMAND
                }
            ],
            menus: {
              ledState: this.LED_STATE_MENU
            }
        };
    }

   setLED (args) {
        this._peripheral.setLED(args.LED, args.STATE);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, BLESendInterval);
        });
   }

    writeFlash (args) {
        let bytes = args.BYTES.split(', ');
        if (bytes.length == 0) return;
        bytes = bytes.map(b => parseInt(b));
        this._peripheral.writeFlash(bytes);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, BLESendInterval);
        });
    }

    eraseFlash (args) {
        let addr = parseInt(args.ADDR);
        if (isNaN(addr)) return;
        this._peripheral.eraseFlash(addr);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, BLESendInterval);
        });
    }

    dump (args) {
        let addr = parseInt(args.ADDR);
        let length = parseInt(args.LEN);
        if (isNaN(addr) || isNaN(length)) return;
        this._peripheral.readMemory(addr, length);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, BLESendInterval);
        });
    }

    download () {
      let targets = this.runtime.executableTargets;
      for (i in targets) {
        console.log(targets[i].sprite.name, targets[i].blocks._blocks);
      }
    }
}

module.exports = Scratch3MicroVMBlocks;
