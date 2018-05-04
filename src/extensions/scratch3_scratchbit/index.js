const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const color = require('../../util/color');
const log = require('../../util/log');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len

const iconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iNjAuNDU5MTU2bW0iCiAgIGhlaWdodD0iNjAuNDU5MTZtbSIKICAgdmlld0JveD0iMCAwIDIxNC4yMjUzNiAyMTQuMjI1MzYiCiAgIGlkPSJzdmcyIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IgogICBzb2RpcG9kaTpkb2NuYW1lPSJTY3JhdGNoQml0LnN2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczQiPgogICAgPG1hcmtlcgogICAgICAgaW5rc2NhcGU6c3RvY2tpZD0iQXJyb3cxTHN0YXJ0IgogICAgICAgb3JpZW50PSJhdXRvIgogICAgICAgcmVmWT0iMCIKICAgICAgIHJlZlg9IjAiCiAgICAgICBpZD0ibWFya2VyNDQ2NCIKICAgICAgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlIgogICAgICAgaW5rc2NhcGU6aXNzdG9jaz0idHJ1ZSI+CiAgICAgIDxwYXRoCiAgICAgICAgIGlkPSJwYXRoNDQ2NiIKICAgICAgICAgZD0iTSAwLDAgNSwtNSAtMTIuNSwwIDUsNSAwLDAgWiIKICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmN2YyYTtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6I2Q0NTUwMDtzdHJva2Utd2lkdGg6MXB0O3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuOCwwLDAsMC44LDEwLDApIgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPgogICAgPC9tYXJrZXI+CiAgICA8bWFya2VyCiAgICAgICBpbmtzY2FwZTpzdG9ja2lkPSJBcnJvdzFMc3RhcnQiCiAgICAgICBvcmllbnQ9ImF1dG8iCiAgICAgICByZWZZPSIwIgogICAgICAgcmVmWD0iMCIKICAgICAgIGlkPSJtYXJrZXI0NDQyIgogICAgICAgc3R5bGU9Im92ZXJmbG93OnZpc2libGUiCiAgICAgICBpbmtzY2FwZTppc3N0b2NrPSJ0cnVlIj4KICAgICAgPHBhdGgKICAgICAgICAgaWQ9InBhdGg0NDQ0IgogICAgICAgICBkPSJNIDAsMCA1LC01IC0xMi41LDAgNSw1IDAsMCBaIgogICAgICAgICBzdHlsZT0iZmlsbDojZmY3ZjJhO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTojZDQ1NTAwO3N0cm9rZS13aWR0aDoxcHQ7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC44LDAsMCwwLjgsMTAsMCkiCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+CiAgICA8L21hcmtlcj4KICAgIDxtYXJrZXIKICAgICAgIGlua3NjYXBlOnN0b2NraWQ9IkFycm93MUxzdGFydCIKICAgICAgIG9yaWVudD0iYXV0byIKICAgICAgIHJlZlk9IjAiCiAgICAgICByZWZYPSIwIgogICAgICAgaWQ9IkFycm93MUxzdGFydCIKICAgICAgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlIgogICAgICAgaW5rc2NhcGU6aXNzdG9jaz0idHJ1ZSI+CiAgICAgIDxwYXRoCiAgICAgICAgIGlkPSJwYXRoNDE3MiIKICAgICAgICAgZD0iTSAwLDAgNSwtNSAtMTIuNSwwIDUsNSAwLDAgWiIKICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmN2YyYTtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6I2Q0NTUwMDtzdHJva2Utd2lkdGg6MXB0O3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuOCwwLDAsMC44LDEwLDApIgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPgogICAgPC9tYXJrZXI+CiAgPC9kZWZzPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0iYmFzZSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp6b29tPSIxLjQiCiAgICAgaW5rc2NhcGU6Y3g9IjE2MC4yNjU5MiIKICAgICBpbmtzY2FwZTpjeT0iMTE3Ljg5NzY2IgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIHNob3dndWlkZXM9ImZhbHNlIgogICAgIGZpdC1tYXJnaW4tdG9wPSIyIgogICAgIGZpdC1tYXJnaW4tbGVmdD0iMiIKICAgICBmaXQtbWFyZ2luLXJpZ2h0PSIyIgogICAgIGZpdC1tYXJnaW4tYm90dG9tPSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTE1OCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3ODYiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjIyOTQiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjE0NSIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNDIuODg3MzIsLTY5NS4yNDk1KSI+CiAgICA8cGF0aAogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJzc3Nzc3NzIgogICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgIGlkPSJwYXRoNDE2NCIKICAgICAgIGQ9Im0gMjE4LjI0NTg0LDcwMy4zNDQyIGMgLTIuMjM5OTMsMC44MTQ0MSAtNC43Nzc0NCwyLjYzODIgLTQuNzc3NDQsNC4xNzkyNCAwLDEuNTQxMDQgMi42MzM5MywyLjM3NTU3IDQuNzc3NDQsMS40NzU0NiAyNS41NTUzOCwtMTAuNzMxNDkgNDQuOTMwNzEsLTYuMzM3MTYgNjMuNTA4MywwIDIuMjc5NzksMC43Nzc2NyA0Ljc3NzQ2LDAuMDY1NSA0Ljc3NzQ2LC0xLjQ3NTQ2IDAsLTEuNTQxMDQgLTIuNDc4OTcsLTMuNDIyNTIgLTQuNzc3NDYsLTQuMTc5MjQgLTE4LjcwMTc2LC02LjE1NzA0IC00MC4yOTk4MiwtOC40MzgyNyAtNjMuNTA4MywwIHoiCiAgICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6IzAwYzcwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS4xMzQzOTc2MztzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiAvPgogICAgPGVsbGlwc2UKICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBpZD0icGF0aDQxNDAiCiAgICAgICBjeD0iMjUwIgogICAgICAgY3k9IjgwMi4zNjIxOCIKICAgICAgIHJ4PSI5OS41MjYwNjIiCiAgICAgICByeT0iOTkuNTI2MDciIC8+CiAgICA8cmVjdAogICAgICAgcnk9IjUuMDg4NzcwOSIKICAgICAgIHk9Ii0xODEuNjQxNjkiCiAgICAgICB4PSI3OTcuNzIwMjgiCiAgICAgICBoZWlnaHQ9IjE5LjI4Mzc2IgogICAgICAgd2lkdGg9IjkuMjgzNzYxIgogICAgICAgaWQ9InJlY3Q0MTQ2IgogICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiNiM2IzYjM7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjE7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAsMSwtMSwwLDAsMCkiIC8+CiAgICA8Y2lyY2xlCiAgICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2ZmN2YyYTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6I2Q0NTUwMDtzdHJva2Utd2lkdGg6MS4yODgyNjUzNTtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgaWQ9InBhdGg0MTUwIgogICAgICAgY3g9IjI1MCIKICAgICAgIGN5PSI4MDIuMzYyMTgiCiAgICAgICByPSIzNS40MjcyOTYiIC8+CiAgICA8cGF0aAogICAgICAgc29kaXBvZGk6dHlwZT0ic3RhciIKICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojYjNiM2IzO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjI1NzgxNzM5O3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBpZD0icGF0aDQxNTIiCiAgICAgICBzb2RpcG9kaTpzaWRlcz0iMyIKICAgICAgIHNvZGlwb2RpOmN4PSIzNTIuNjAyMzYiCiAgICAgICBzb2RpcG9kaTpjeT0iNDM3Ljc3MzM4IgogICAgICAgc29kaXBvZGk6cjE9IjEyLjEwMjIzNCIKICAgICAgIHNvZGlwb2RpOnIyPSI3Ljk5MjM3NTkiCiAgICAgICBzb2RpcG9kaTphcmcxPSIwLjUyMzU5ODc4IgogICAgICAgc29kaXBvZGk6YXJnMj0iMS42NTUyNDk2IgogICAgICAgaW5rc2NhcGU6ZmxhdHNpZGVkPSJmYWxzZSIKICAgICAgIGlua3NjYXBlOnJvdW5kZWQ9IjAuMjIiCiAgICAgICBpbmtzY2FwZTpyYW5kb21pemVkPSIwIgogICAgICAgZD0ibSAzNjMuMDgzMiw0NDMuODI0NDkgYyAtMS40MjI0NCwyLjA0MzYyIC04LjY2NTEsMS45MTI3NiAtMTEuMTU1MDIsMS45MTI3OCAtMi4xOTgxMywxMGUtNiAtOC44NzIxMiwwLjA3NjggLTkuODA2NjcsLTEuOTEyNzggLTEuMDU4NiwtMi4yNTM2NyAyLjY3NjA2LC04LjQ2MDU3IDMuOTIxLC0xMC42MTY5MiAxLjA5OTA1LC0xLjkwMzYzIDQuMzY5NTYsLTcuNzIxODcgNi41NTk4NSwtNy41MzY0MyAyLjQ4MTA0LDAuMjEwMDYgNS45ODkwNCw2LjU0NzgyIDcuMjM0MDIsOC43MDQxNSAxLjA5OTA3LDEuOTAzNjIgNC41MDI1Niw3LjY0NTA4IDMuMjQ2ODIsOS40NDkyIHoiCiAgICAgICBpbmtzY2FwZTp0cmFuc2Zvcm0tY2VudGVyLXk9Ii0yLjU1MjQ5NzQiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjc0OTIzMTIzLDAsMCwwLjg0MzY0MDUzLC0xNC4yMTMwNzMsMzU1Ljc4ODA5KSIgLz4KICAgIDxyZWN0CiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLDEsLTEsMCwwLDApIgogICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiNiM2IzYjM7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjE7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGlkPSJyZWN0NDE1NiIKICAgICAgIHdpZHRoPSI5LjI4Mzc2MSIKICAgICAgIGhlaWdodD0iMTkuMjgzNzYiCiAgICAgICB4PSI3OTcuNzIwMjgiCiAgICAgICB5PSItMzM3LjY0MTY5IgogICAgICAgcnk9IjUuMDg4NzcwOSIgLz4KICAgIDxyZWN0CiAgICAgICByeT0iNS4wODg3NzA5IgogICAgICAgeT0iLTg5MC4wMDQyNyIKICAgICAgIHg9Ii0yNTQuNjQxODgiCiAgICAgICBoZWlnaHQ9IjE5LjI4Mzc2MiIKICAgICAgIHdpZHRoPSI5LjI4Mzc2MSIKICAgICAgIGlkPSJyZWN0NDE1OCIKICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojYjNiM2IzO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICB0cmFuc2Zvcm09InNjYWxlKC0xLC0xKSIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2IzYjNiMztmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS4wMDkwMjYxNztzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0ibSAyMTcuNjA3NzksNzUzLjgwMjA3IGMgLTIuMzQ0MDEsMS40ODYwMSAtNC45OTk0MSwyLjI3OTQzIC00Ljk5OTQxLDUuMDkxMjYgMCwyLjgxMTgzIDIuNzU2MzEsNC4zMzQ1NSA0Ljk5OTQxLDIuNjkyMTYgMjYuNzQyNzQsLTE5LjU4MTA0IDQ3LjAxODI4LC0xMS41NjMwMiA2Ni40NTkwNCwwIDIuMzg1NzEsMS40MTg5OCA0Ljk5OTQxLDAuMTE5NjcgNC45OTk0MSwtMi42OTIxNiAwLC0yLjgxMTgzIC0yLjU5NDEzLC0zLjcxMDUzIC00Ljk5OTQxLC01LjA5MTI2IC0xOS41NzA3LC0xMS4yMzQzNSAtNDIuMTcyMjUsLTE1LjM5Njc4IC02Ni40NTkwNCwwIHoiCiAgICAgICBpZD0icGF0aDQ1NDgiCiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJzc3Nzc3NzIiAvPgogIDwvZz4KPC9zdmc+Cg==';

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

      console.log(data);

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
                    opcode: 'whenPressed',
                    text: 'when button pressed',
                    blockType: BlockType.HAT
                },
                {
                    opcode: 'isPressed',
                    text: 'button pressed?',
                    blockType: BlockType.BOOLEAN
                },
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
                    text: 'when it becomes [LIGHT]',
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
                },
                {
                    opcode: 'getSpin',
                    text: 'spin',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getSpeed',
                    text: 'speed',
                    blockType: BlockType.REPORTER
                }
            ],
            menus: {
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
