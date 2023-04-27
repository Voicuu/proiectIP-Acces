using InTheHand.Net.Sockets;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace proiectIP
{

    public partial class mainPage : Form
    {
        // Add these fields inside the MainForm class
        private BluetoothClient _bluetoothClient;
        private Stream _stream;

        // Add the ConnectToBluetoothDeviceAsync method inside the MainForm class
        private async Task ConnectToBluetoothDeviceAsync(Guid serviceClassId)
        {
            _bluetoothClient = new BluetoothClient();
            BluetoothDeviceInfo[] devices = _bluetoothClient.DiscoverDevices();
            BluetoothDeviceInfo targetDevice = null;

            foreach (var device in devices)
            {
                if (device.DeviceName == "YourDeviceName") // Replace with the name of your Bluetooth device
                {
                    targetDevice = device;
                    break;
                }
            }

            if (targetDevice != null)
            {
                await Task.Run(() => _bluetoothClient.Connect(targetDevice.DeviceAddress, serviceClassId));
                _stream = _bluetoothClient.GetStream();
            }
        }
    public mainPage()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            timerOraCurenta.Enabled = true;

        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            oraCurenta.Text = DateTime.Now.ToString("HH:mm:ss");
        }

        private void btnDenyAcces_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Accesul a fost respins!","ACCES RESPINS",MessageBoxButtons.OK, MessageBoxIcon.Stop);
        }

        private void btnLogs_Click(object sender, EventArgs e)
        {

        }

        private void mainPage_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (e.CloseReason == CloseReason.UserClosing)
            {
                // The user clicked the "X" close button
                // Add code to save any unsaved data here if needed
                Application.Exit();
            }
        }
    }
}
