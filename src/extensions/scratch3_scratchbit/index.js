const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const color = require('../../util/color');
const log = require('../../util/log');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len

const iconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMTkwLjMwNTIyIgogICBoZWlnaHQ9IjIwNy4xMDcwNCIKICAgaWQ9InN2ZzIiCiAgIHZlcnNpb249IjEuMSIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC41IHIxMDA0MCIKICAgc29kaXBvZGk6ZG9jbmFtZT0iZHJhd2luZy0xLnN2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczQiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjEuODEwMTkzNCIKICAgICBpbmtzY2FwZTpjeD0iNzMuMTU5OTM1IgogICAgIGlua3NjYXBlOmN5PSIxMTAuOTI4ODUiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgZml0LW1hcmdpbi10b3A9IjI1IgogICAgIGZpdC1tYXJnaW4tbGVmdD0iMjUiCiAgICAgZml0LW1hcmdpbi1yaWdodD0iMjUiCiAgICAgZml0LW1hcmdpbi1ib3R0b209IjI1IgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTEyNiIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3MjUiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjExOSIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTQuOTY0MjEsLTI0My43NDQzNSkiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOiNmOWE1NDI7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDAiCiAgICAgICBkPSJNIDkwLjE4NzUsNjcuNjI1IEMgNzYuOTIzODAyLDY3LjYyNSA2NC41MzM4NzUsNzAuNjg3MzIyIDU0LDc2IGwgLTMzLjA5Mzc1LDAgMCw0Ny42MjUgYyAtMC4wMDY2LDAuMzIzMDUgLTAuMDMxMjUsMC42NDQ0MSAtMC4wMzEyNSwwLjk2ODc1IDAsMC4zMjQzNCAwLjAyNDY4LDAuNjQ1NyAwLjAzMTI1LDAuOTY4NzUgbCAwLDAuNDM3NSBjIDAuOTA5MDQ5LDMwLjgyMDEzIDMxLjU3NDkyOCw1NS41OTM3NSA2OS4yODEyNSw1NS41OTM3NSAzNy43MDYzMiwwIDY4LjM3MjIsLTI0Ljc3MzYyIDY5LjI4MTI1LC01NS41OTM3NSBsIDAuMDMxMiwwIDAsLTEuNDA2MjUgTCAxNTkuNSw3NiAxMjYuMzc1LDc2IEMgMTE1Ljg0MTEzLDcwLjY4NzMyMiAxMDMuNDUxMiw2Ny42MjUgOTAuMTg3NSw2Ny42MjUgeiIKICAgICAgIGlkPSJyZWN0Mzc4NiIKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTkuOTE2MywyNDMuNzU3NjQpIiAvPgogICAgPHBhdGgKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICBpZD0icGF0aDUwNTE0IgogICAgICAgZD0ibSAzMTAuMTAzOCwzMTEuMzgyNjQgYyAtMTMuMjYzNywwIC0yNS42NTM2MywyLjc2MjQ3IC0zNi4xODc1LDcuNTU0OTUgbCAtMzMuMDkzNzUsMCAwLDQyLjk2MTcxIGMgLTAuMDA3LDAuMjkxNDIgLTAuMDMxMiwwLjU4MTMyIC0wLjAzMTIsMC44NzM5IDAsMC4yOTI1OCAwLjAyNDcsMC41ODI0NyAwLjAzMTIsMC44NzM4OSBsIDAsMC4zOTQ2NiBjIDAuOTA5MDUsMjcuODAyMzMgMzEuNTc0OTMsNTAuMTUwMiA2OS4yODEyNSw1MC4xNTAyIDM3LjcwNjMyLDAgNjguMzcyMiwtMjIuMzQ3ODcgNjkuMjgxMjUsLTUwLjE1MDIgbCAwLjAzMTIsMCAwLC0xLjI2ODU1IDVlLTUsLTQzLjgzNTYxIC0zMy4xMjUsMCBjIC0xMC41MzM4NywtNC43OTI0OCAtMjIuOTIzOCwtNy41NTQ5NSAtMzYuMTg3NSwtNy41NTQ5NSB6IgogICAgICAgc3R5bGU9ImZpbGw6I2Y5YTU0MjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC45NDk3ODA2NCIgLz4KICAgIDxwYXRoCiAgICAgICBzb2RpcG9kaTp0eXBlPSJhcmMiCiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLW9wYWNpdHk6MTtzdHJva2UtZGFzaGFycmF5Om5vbmUiCiAgICAgICBpZD0icGF0aDI5ODciCiAgICAgICBzb2RpcG9kaTpjeD0iMzEwLjExNjgyIgogICAgICAgc29kaXBvZGk6Y3k9IjMzNi4xNjQwMyIKICAgICAgIHNvZGlwb2RpOnJ4PSI2OS43MDA1MjMiCiAgICAgICBzb2RpcG9kaTpyeT0iNjkuNzAwNTIzIgogICAgICAgZD0ibSAzNzkuODE3MzQsMzM2LjE2NDAzIGMgMCwzOC40OTQ1NCAtMzEuMjA1OTgsNjkuNzAwNTMgLTY5LjcwMDUyLDY5LjcwMDUzIC0zOC40OTQ1MywwIC02OS43MDA1MiwtMzEuMjA1OTkgLTY5LjcwMDUyLC02OS43MDA1MyAwLC0zOC40OTQ1MyAzMS4yMDU5OSwtNjkuNzAwNTIgNjkuNzAwNTIsLTY5LjcwMDUyIDM4LjQ5NDU0LDAgNjkuNzAwNTIsMzEuMjA1OTkgNjkuNzAwNTIsNjkuNzAwNTIgeiIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDAuODE3NTM1NzksMCw1MS4zNTI5ODQpIiAvPgogICAgPHBhdGgKICAgICAgIHNvZGlwb2RpOnR5cGU9ImFyYyIKICAgICAgIHN0eWxlPSJmaWxsOiNlNmU2ZTY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjE7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2Utb3BhY2l0eToxO3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIKICAgICAgIGlkPSJwYXRoMjk4OSIKICAgICAgIHNvZGlwb2RpOmN4PSIxNzQuMjg1NzIiCiAgICAgICBzb2RpcG9kaTpjeT0iMzIzLjA3NjQ4IgogICAgICAgc29kaXBvZGk6cng9IjcuMTQyODU3MSIKICAgICAgIHNvZGlwb2RpOnJ5PSI3LjE0Mjg1NzEiCiAgICAgICBkPSJtIDE4MS40Mjg1OCwzMjMuMDc2NDggYyAwLDMuOTQ0ODkgLTMuMTk3OTcsNy4xNDI4NSAtNy4xNDI4Niw3LjE0Mjg1IC0zLjk0NDg5LDAgLTcuMTQyODYsLTMuMTk3OTYgLTcuMTQyODYsLTcuMTQyODUgMCwtMy45NDQ4OSAzLjE5Nzk3LC03LjE0Mjg2IDcuMTQyODYsLTcuMTQyODYgMy45NDQ4OSwwIDcuMTQyODYsMy4xOTc5NyA3LjE0Mjg2LDcuMTQyODYgeiIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDAuODE3NTM1NzksODYuNzE0Mjg2LDYzLjg1NTkwNykiIC8+CiAgICA8cGF0aAogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMC44MTc1MzU3OSwxODMsNjMuODU1OTA3KSIKICAgICAgIGQ9Im0gMTgxLjQyODU4LDMyMy4wNzY0OCBjIDAsMy45NDQ4OSAtMy4xOTc5Nyw3LjE0Mjg1IC03LjE0Mjg2LDcuMTQyODUgLTMuOTQ0ODksMCAtNy4xNDI4NiwtMy4xOTc5NiAtNy4xNDI4NiwtNy4xNDI4NSAwLC0zLjk0NDg5IDMuMTk3OTcsLTcuMTQyODYgNy4xNDI4NiwtNy4xNDI4NiAzLjk0NDg5LDAgNy4xNDI4NiwzLjE5Nzk3IDcuMTQyODYsNy4xNDI4NiB6IgogICAgICAgc29kaXBvZGk6cnk9IjcuMTQyODU3MSIKICAgICAgIHNvZGlwb2RpOnJ4PSI3LjE0Mjg1NzEiCiAgICAgICBzb2RpcG9kaTpjeT0iMzIzLjA3NjQ4IgogICAgICAgc29kaXBvZGk6Y3g9IjE3NC4yODU3MiIKICAgICAgIGlkPSJwYXRoMjk5MSIKICAgICAgIHN0eWxlPSJmaWxsOiNlNmU2ZTY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjE7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2Utb3BhY2l0eToxO3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIKICAgICAgIHNvZGlwb2RpOnR5cGU9ImFyYyIgLz4KICAgIDxwYXRoCiAgICAgICBzb2RpcG9kaTp0eXBlPSJhcmMiCiAgICAgICBzdHlsZT0iZmlsbDojZTZlNmU2O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLW9wYWNpdHk6MTtzdHJva2UtZGFzaGFycmF5Om5vbmUiCiAgICAgICBpZD0icGF0aDI5OTMiCiAgICAgICBzb2RpcG9kaTpjeD0iMTc0LjI4NTcyIgogICAgICAgc29kaXBvZGk6Y3k9IjMyMy4wNzY0OCIKICAgICAgIHNvZGlwb2RpOnJ4PSI3LjE0Mjg1NzEiCiAgICAgICBzb2RpcG9kaTpyeT0iNy4xNDI4NTcxIgogICAgICAgZD0ibSAxODEuNDI4NTgsMzIzLjA3NjQ4IGMgMCwzLjk0NDg5IC0zLjE5Nzk3LDcuMTQyODUgLTcuMTQyODYsNy4xNDI4NSAtMy45NDQ4OSwwIC03LjE0Mjg2LC0zLjE5Nzk2IC03LjE0Mjg2LC03LjE0Mjg1IDAsLTMuOTQ0ODkgMy4xOTc5NywtNy4xNDI4NiA3LjE0Mjg2LC03LjE0Mjg2IDMuOTQ0ODksMCA3LjE0Mjg2LDMuMTk3OTcgNy4xNDI4Niw3LjE0Mjg2IHoiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwwLjgxNzUzNTc5LDEzNS44MzExLDk3LjE3MTk0OSkiIC8+CiAgICA8cGF0aAogICAgICAgc29kaXBvZGk6dHlwZT0ic3RhciIKICAgICAgIHN0eWxlPSJmaWxsOiNlNmU2ZTY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuMjk3MDUxNzk7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2Utb3BhY2l0eToxO3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIKICAgICAgIGlkPSJwYXRoMjk5NSIKICAgICAgIHNvZGlwb2RpOnNpZGVzPSIzIgogICAgICAgc29kaXBvZGk6Y3g9IjE3Mi44NTcxNSIKICAgICAgIHNvZGlwb2RpOmN5PSIyMjguMDc2NDgiCiAgICAgICBzb2RpcG9kaTpyMT0iMTQuMzc0NzIzIgogICAgICAgc29kaXBvZGk6cjI9IjcuMTg3MzYxMiIKICAgICAgIHNvZGlwb2RpOmFyZzE9IjAuNTIzNTk4NzgiCiAgICAgICBzb2RpcG9kaTphcmcyPSIxLjU3MDc5NjMiCiAgICAgICBpbmtzY2FwZTpmbGF0c2lkZWQ9InRydWUiCiAgICAgICBpbmtzY2FwZTpyb3VuZGVkPSIwIgogICAgICAgaW5rc2NhcGU6cmFuZG9taXplZD0iMCIKICAgICAgIGQ9Im0gMTg1LjMwNjAyLDIzNS4yNjM4NCAtMjQuODk3NzUsMCAxMi40NDg4OCwtMjEuNTYyMDkgeiIKICAgICAgIGlua3NjYXBlOnRyYW5zZm9ybS1jZW50ZXIteT0iLTIuMjY1MTEyIgogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC43NzA5NzkyNywwLDAsMC42MzAzMDMxNSwxNzYuODQ3NTQsMTQzLjU2NzU1KSIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDojZjlhNTQyO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLW9wYWNpdHk6MTtzdHJva2UtZGFzaGFycmF5Om5vbmUiCiAgICAgICBkPSJNIDExMC40MDYyNSA2MC44MTI1IEwgOTkuOTM3NSA2Ni44NzUgQyA5OC43MDExNDMgNjYuNjM0MTY0IDk3LjQxNTc2IDY2LjQ2ODc1IDk2LjA5Mzc1IDY2LjQ2ODc1IEMgOTQuMzEzOTI2IDY2LjQ2ODc1IDkyLjU4MzMyNSA2Ni42OTcwMDEgOTAuOTY4NzUgNjcuMTI1IEwgODAuNjU2MjUgNjEuMTU2MjUgTCA4MC42NTYyNSA3NCBMIDgxLjM3NSA3My41OTM3NSBDIDc5LjgxNTg1NSA3NS43OTg2NDkgNzguOTA2MjUgNzguMzYzIDc4LjkwNjI1IDgxLjEyNSBDIDc4LjkwNjI1IDg5LjIxNTEwOSA4Ni42MDEzNTYgOTUuNzgxMjUgOTYuMDkzNzUgOTUuNzgxMjUgQyAxMDUuNTg2MTQgOTUuNzgxMjUgMTEzLjI4MTI1IDg5LjIxNTEwOSAxMTMuMjgxMjUgODEuMTI1IEMgMTEzLjI4MTI1IDc4LjEyOTE1OSAxMTIuMjE3MiA3NS4zNTE3NCAxMTAuNDA2MjUgNzMuMDMxMjUgTCAxMTAuNDA2MjUgNjAuODEyNSB6ICIKICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxNC45NjQyMSwyNDMuNzQ0MzUpIgogICAgICAgaWQ9InBhdGg1MDQ3NyIgLz4KICA8L2c+Cjwvc3ZnPgo=';

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
            tiltX: 0,
            tiltY: 0,
            aMag: 0,
            aMagD: 0,
            gMag: 0,
            gMagD: 0,
            brightness: 10
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

        this._onRxChar = this._onRxChar.bind(this);
        this._onDisconnect = this._onDisconnect.bind(this);

        this._connectEvents();
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
        var sBrightness = this._mapSensorVal(this._sensors.brightness, 0, 1023, 0, 100);
        return Math.round(sBrightness);
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
    _onRxChar (event) {

        if (event.data[0] >> 7) {
            this._sensors.gf = 1;
        } else {
            if (this._sensors.gf) {
                this._sensors.gf = 0;
                this._runtime.greenFlag();
            }
        }

        this._sensors.brightness = (event.data[0] & 0x3F) << 4 | event.data[1] >> 4;

        this._sensors.tiltX = event.data[3];
        if ((event.data[2] >> 3) & 1) this._sensors.tiltX *= -1;
        this._sensors.tiltY = event.data[4];
        if ((event.data[2] >> 2) & 1) this._sensors.tiltY *= -1;

        var tmp = event.data[5] << 24;
        tmp |= event.data[6] << 16;
        tmp |= event.data[7] << 8;
        tmp |= event.data[8];
        tmp =  tmp / 10000000;
        this._sensors.aMagD = this._sensors.aMag - tmp;
        this._sensors.aMag = tmp;

        tmp = event.data[9] << 24;
        tmp |= event.data[10] << 16;
        tmp |= event.data[11] << 8;
        tmp |= event.data[12];
        tmp = tmp / 10000000;
        this._sensors.gMagD = this._sensors.gMag - tmp;
        this._sensors.gMag = tmp;

        if (Math.abs(this._sensors.aMagD) > 0.1) {
            this._gestures[Gesture.MOVING] = true;
            this._setGestureTimeout(Gesture.MOVE, 250);
        } else if (Math.abs(this._sensors.aMagD) < 0.006) {
            this._gestures[Gesture.MOVING] = false;
        }

        if (Math.abs(this._sensors.aMagD) > 0.8)
            this._setGestureTimeout(Gesture.SHAKE, 300);

        if (this._gestures[Gesture.JUMP].active && this._sensors.aMag > 0.5)
            this._gestures[Gesture.JUMP].active = false;
        else if (this._sensors.aMag < 0.2)
            this._gestures[Gesture.JUMP].active = true;
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
    FRONT: 'front',
    BACK: 'back',
    LEFT: 'left',
    RIGHT: 'right',
    ANY: 'any'
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
        return 'ScratchBit';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return 'scratchbit';
    }

    /**
     * @return {number} - the tilt sensor counts as "tilted" if its tilt angle meets or exceeds this threshold.
     */
    static get DARK_THRESHOLD () {
        return 15;
    }

    /**
     * @return {number} - the tilt sensor counts as "tilted" if its tilt angle meets or exceeds this threshold.
     */
    static get TILT_THRESHOLD () {
        return 15;
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
            iconURI: iconURI,
            blocks: [
                {
                    opcode: 'whenMoved',
                    text: 'when moved',
                    blockType: BlockType.HAT
                },
                {
                    opcode: 'whenShaken',
                    text: 'when shaken',
                    blockType: BlockType.HAT
                },
                {
                    opcode: 'whenJumped',
                    text: 'when jumped',
                    blockType: BlockType.HAT
                },
                {
                    opcode: 'isMoving',
                    text: 'moving?',
                    blockType: BlockType.BOOLEAN
                },
                {
                    opcode: 'whenDark',
                    text: 'when [LIGHT]',
                    blockType: BlockType.HAT,
                    arguments: {
                        LIGHT: {
                            type: ArgumentType.STRING,
                            menu: 'lightLevel',
                            defaultValue: 'dark'
                        }
                    }
                },
                {
                    opcode: 'getBrightness',
                    text: 'brightness',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'whenTilted',
                    text: 'when tilted [DIRECTION]?',
                    blockType: BlockType.HAT,
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'tiltDirectionAny',
                            defaultValue: TiltDirection.ANY
                        }
                    }
                },
                {
                    opcode: 'isTilted',
                    text: 'tilted [DIRECTION]?',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'tiltDirectionAny',
                            defaultValue: TiltDirection.ANY
                        }
                    }
                },
                {
                    opcode: 'getTiltAngle',
                    text: 'tilt angle [DIRECTION]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'tiltDirection',
                            defaultValue: TiltDirection.FRONT
                        }
                    }
                }
            ],
            menus: {
                lightLevel: ['dark', 'light'],
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
        if (this._device || this._finder) {
            return;
        }
        const deviceManager = this.runtime.ioDevices.deviceManager;
        const finder = this._finder =
            deviceManager.searchAndConnect(Scratch3ScratchBitBlocks.EXTENSION_NAME, ScratchBit.DEVICE_TYPE, DEV_SPEC);

        this._finder.promise.then(
            socket => {
                if (this._finder === finder) {
                    this._finder = null;
                    this._device = new ScratchBit(socket, this.runtime);
                } else {
                    log.warn('Ignoring success from stale ScratchBit connection attempt');
                }
            },
            reason => {
                if (this._finder === finder) {
                    this._finder = null;
                    log.warn(`ScratchBit connection failed: ${reason}`);
                } else {
                    log.warn('Ignoring failure from stale ScratchBit connection attempt');
                }
            });
    }

    whenMoved () {
        return this._device._isGesture(Gesture.MOVE);
    }

    whenShaken () {
        return this._device._isGesture(Gesture.SHAKE);
    }

    whenJumped () {
        return this._device._isGesture(Gesture.JUMP);
    }

    isMoving () {
        return this._device._gestures['moving'];
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
          return this._device.brightness > Scratch3ScratchBitBlocks.DARK_THRESHOLD;
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

    /**
     * Test whether the tilt sensor is currently tilted.
     * @param {TiltDirection} direction - the tilt direction to test (front, back, left, right, or any).
     * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
     * @private
     */
    _isTilted (direction) {
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
