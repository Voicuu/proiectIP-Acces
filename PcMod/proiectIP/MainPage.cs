using InTheHand.Net.Sockets;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace proiectIP
{

    public partial class MainPage : Form
    {
        //private SerialPort _serialPort;
        private Timer _timer;
    public MainPage()
        {
            InitializeComponent();
            //InitializeSerialPort();
            InitializeTimer();
        }

        /*private void InitializeSerialPort()
        {
            _serialPort = new SerialPort("COM3", 9600); // Replace "COM3" with your Arduino's serial port
            _serialPort.DataReceived += SerialPort_DataReceived;
            _serialPort.Open();
        }*/

        private void InitializeTimer()
        {
            _timer = new Timer();
            _timer.Interval = 3000; // 3 seconds interval
            _timer.Tick += Timer_Tick;
            _timer.Start();
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            string[] states = { "inchis", "deschis", "deschidere" };
            Random random = new Random();
            int index = random.Next(states.Length);
            string state = states[index];
            UpdateUI(state);
        }

        /*private void SerialPort_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            string data = _serialPort.ReadLine().Trim();
            Invoke(new Action(() => UpdateUI(data)));
        }*/

        private void UpdateUI(string state)
        {
            labelGateState.Text = state;

            switch (state)
            {
                case "inchis":
                    pictureBoxGate.Image = Properties.Resources.inchis; // Replace with your closed gate image
                    break;
                case "deschis":
                    pictureBoxGate.Image = Properties.Resources.deschis; // Replace with your opened gate image
                    break;
                case "deschidere":
                    pictureBoxGate.Image = Properties.Resources.deschidere; // Replace with your opening gate image
                    break;
            }
        }

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

        private void mainPage_Load(object sender, EventArgs e)
        {
            timerOraCurenta.Enabled = true;

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
        
        protected override void OnFormClosing(FormClosingEventArgs e)
        {
            //_serialPort.Close();
            base.OnFormClosing(e);
        }

        private void btnDisconnectPortar_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void timerOraCurenta_Tick(object sender, EventArgs e)
        {
            oraCurenta.Text = DateTime.Now.ToString("HH:mm:ss");
        }
    }
}
