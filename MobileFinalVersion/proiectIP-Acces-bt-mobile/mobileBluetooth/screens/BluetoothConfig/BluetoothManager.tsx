import { BleManager,Device } from 'react-native-ble-plx';

const bluetoothManager = new BleManager();

// Function to scan for nearby BLE devices
const scanDevices = () => {
  bluetoothManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.error('Error scanning devices:', error);
      return;
    }

    // Process discovered device
    if(device){
    console.log('Discovered device:', device.id, device.name);
    }
  });
};

// Function to stop scanning for devices
const stopScan = () => {
  bluetoothManager.stopDeviceScan();
};

export { scanDevices, stopScan };