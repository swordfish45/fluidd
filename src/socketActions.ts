import Vue from 'vue'
import { Waits } from '@/globals'

export const SocketActions = {
  async printerInfo () {
    Vue.$socket.emit(
      'printer.info', {
        dispatch: 'socket/onPrinterInfo'
      }
    )
  },

  async serverInfo () {
    Vue.$socket.emit(
      'server.info', {
        dispatch: 'socket/onServerInfo'
      }
    )
  },

  async machineReboot () {
    Vue.$socket.emit(
      'machine.reboot', {
        dispatch: 'void'
      }
    )
  },

  async machineShutdown () {
    Vue.$socket.emit(
      'machine.shutdown', {
        dispatch: 'void'
      }
    )
  },

  async machineDevicePowerDevices () {
    Vue.$socket.emit(
      'machine.device_power.devices', {
        dispatch: 'devicePower/init'
      }
    )
  },

  async machineDevicePowerStatus (device: string) {
    Vue.$socket.emit(
      'machine.device_power.status', {
        dispatch: 'devicePower/onStatus',
        params: { [device]: null }
      }
    )
  },

  async machineDevicePowerToggle (device: string, state: string, wait?: string) {
    const emit = (state === 'on')
      ? 'machine.device_power.on'
      : 'machine.device_power.off'
    Vue.$socket.emit(
      emit, {
        dispatch: 'devicePower/onToggle',
        params: { [device]: null },
        wait
      }
    )
  },

  async printerQueryEndstops () {
    Vue.$socket.emit(
      'printer.query_endstops.status', {
        dispatch: 'socket/onQueryEndstops'
      }
    )
  },

  async printerObjectsList () {
    Vue.$socket.emit(
      'printer.objects.list', {
        dispatch: 'socket/onPrinterObjectsList'
      }
    )
  },

  async printerObjectsSubscribe (objects: {[key: string]: null}) {
    Vue.$socket.emit(
      'printer.objects.subscribe', {
        dispatch: 'socket/onPrinterObjectsSubscribe',
        params: {
          objects
        }
      }
    )
  },

  async printerPrintStart (path: string) {
    Vue.$socket.emit(
      'printer.print.start', {
        dispatch: 'void',
        params: {
          filename: path
        }
      }
    )
  },

  async printerPrintCancel () {
    Vue.$socket.emit(
      'printer.print.cancel', {
        dispatch: 'socket/onPrintCancel',
        wait: Waits.onPrintCancel
      }
    )
  },

  async printerPrintPause () {
    Vue.$socket.emit(
      'printer.print.pause', {
        dispatch: 'socket/onPrintPause',
        wait: Waits.onPrintPause
      }
    )
  },

  async printerPrintResume () {
    Vue.$socket.emit(
      'printer.print.resume', {
        dispatch: 'socket/onPrintResume',
        wait: Waits.onPrintResume
      }
    )
  },

  async printerGcodeScript (gcode: string, wait?: string) {
    Vue.$socket.emit(
      'printer.gcode.script', {
        dispatch: 'socket/onGcodeScript',
        params: {
          script: gcode
        },
        wait
      }
    )
  },

  async printerEmergencyStop () {
    Vue.$socket.emit(
      'printer.emergency_stop', {
        dispatch: 'socket/notifyKlippyDisconnected'
      }
    )
  },

  async serverTemperatureStore () {
    Vue.$socket.emit(
      'server.temperature_store', {
        dispatch: 'socket/onTemperatureStore'
      }
    )
  },

  async serverGcodeStore () {
    Vue.$socket.emit(
      'server.gcode_store', {
        dispatch: 'socket/onGcodeStore'
      }
    )
  },

  /**
   * Loads the metadata for a given filepath.
   * Expects the full path including root.
   * Optionally pass the just the filename and path.
   */
  async serverFilesMetaData (filepath: string) {
    Vue.$socket.emit(
      'server.files.metadata', {
        dispatch: 'files/onFileUpdate',
        params: { filename: filepath }
      }
    )
  },

  /**
   * This only requires path, but we pass root along too
   * for brevity.
   */
  async serverFilesGetDirectory (root: string, path: string) {
    Vue.$socket.emit(
      'server.files.get_directory',
      {
        dispatch: 'files/onServerFilesGetDirectory',
        wait: `${Waits.onGetDirectory}${path}`,
        params: { root, path, extended: true }
      }
    )
  },
  async serverFilesMove (source: string, dest: string) {
    Vue.$socket.emit(
      'server.files.move', {
        dispatch: 'void',
        params: {
          source,
          dest
        }
      }
    )
  },

  /**
   * Create a directory.
   * Root should be included in the path.
   */
  async serverFilesPostDirectory (path: string) {
    Vue.$socket.emit(
      'server.files.post_directory', {
        dispatch: 'void',
        params: {
          path
        }
      }
    )
  },

  async serverFilesDeleteFile (path: string) {
    Vue.$socket.emit(
      'server.files.delete_file', {
        dispatch: 'void',
        params: {
          path
        }
      }
    )
  },

  async serverFilesDeleteDirectory (path: string) {
    Vue.$socket.emit(
      'server.files.delete_directory', {
        dispatch: 'void',
        params: {
          path,
          force: false
        }
      }
    )
  }
}
