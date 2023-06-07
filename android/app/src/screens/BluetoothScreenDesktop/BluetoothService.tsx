import { BleManager, Device } from 'react-native-ble-plx';

type ConnectionCallback = (success: boolean, device?: Device, error?: Error) => void;

class BluetoothService {
  private bleManager: BleManager;

  constructor() {
    this.bleManager = new BleManager();
  }

  public connectToDevice(macAddress: string, callback: ConnectionCallback) {
    this.bleManager
      .connectToDevice(macAddress)
      .then((device) => {
        console.log('Connected to device:', device.name);
        callback(true, device);
      })
      .catch((error) => {
        console.error('Error connecting to device:', error);
        callback(false, undefined, error);
      });
  }
}

export default new BluetoothService();