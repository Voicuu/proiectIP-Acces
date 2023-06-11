using System;
using System.Data;
using System.Data.SQLite;
using System.Drawing;
using System.IO;
using System.IO.Ports;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Newtonsoft.Json;
using InTheHand.Net.Sockets;
using InTheHand.Net.Bluetooth;
using InTheHand.Net.Bluetooth.Factory;
using InTheHand.Net;

namespace proiectIP
{
    public partial class MainPage : Form
    {


        private SerialPort _serialPort;
        private Timer _timer;
        private Timer _timerDB;
        private SQLiteConnection sql_con;
        private string dbPath = Path.Combine(Application.StartupPath, "LocalDatabase.sqlite");
        private BluetoothClient _bluetoothClient;
        private BluetoothDeviceInfo _targetDevice;
        //private Guid _serviceUuid = new Guid("8a362ab8-4bb5-4175-9941-c504e118ccfe");

        public MainPage()
        {
            InitializeComponent();
            //InitializeSerialPort();
            InitializeTimer();
            InitializeTimerDB();
            SetConnection();
            CreateTable();
            //InitializeBluetooth();
        }
       /* private void InitializeBluetooth()
        {
            _bluetoothClient = new BluetoothClient();
        }

        public void DiscoverDevices()
        {
            BluetoothDeviceInfo[] devices = _bluetoothClient.DiscoverDevicesInRange();

            foreach (BluetoothDeviceInfo d in devices)
            {
                _targetDevice = d; // Set the first device as the target device
                break;
            }
        }


        public void ConnectToDevice(BluetoothDeviceInfo device)
        {
            _bluetoothClient.BeginConnect(device.DeviceAddress, _serviceUuid, BluetoothClientConnectCallback, _bluetoothClient);
        }

        private void BluetoothClientConnectCallback(IAsyncResult ar)
        {
            _bluetoothClient.EndConnect(ar);
            // Connection completed
        }

        public void SendData(string message)
        {
            byte[] msg = Encoding.ASCII.GetBytes(message);
            NetworkStream stream = _bluetoothClient.GetStream();

            if (stream.CanWrite)
            {
                stream.Write(msg, 0, msg.Length);
            }
        }*/


        private void SetConnection()
        {
            sql_con = new SQLiteConnection($"Data Source={dbPath};Version=3;New=False;Compress=True;");
        }

        public void UpdateangajatDetails(Angajat angajat)
        {
            if (this.InvokeRequired)
            {
                this.Invoke(new Action(() => UpdateangajatDetails(angajat)));
                return;
            }
            labelName.Text = angajat.Nume;
            labelCarNr.Text = angajat.NrMasina;

            // Updating picture box
            //pictureBoxangajatPicture.Image = Image.FromFile(angajat.Poza);
        }

        private void CreateTable()
        {
            string query = @"CREATE TABLE IF NOT EXISTS 'Logs' (
                    'CNP' TEXT PRIMARY KEY,
                    'DateTime' TEXT NOT NULL,
                    'Direction' TEXT NOT NULL)";

            sql_con.Open();

            SQLiteCommand command = new SQLiteCommand(query, sql_con);
            command.ExecuteNonQuery();

            sql_con.Close();
        }

        private void InitializeSerialPort()
        {
            _serialPort = new SerialPort("COM3", 38400); // Replace "COM3" with your Arduino's serial port
            _serialPort.DataReceived += SerialPort_DataReceived;
            _serialPort.Open();
        }

        private void InitializeTimer()
        {
            _timer = new Timer();
            _timer.Interval = 3000; // 3 seconds interval
            _timer.Tick += Timer_Tick;
            _timer.Start();
        }

        private void RefreshLogsForm()
        {
            foreach (Form form in Application.OpenForms)
            {
                if (form is LogsForm logsForm)
                {
                    logsForm.RefreshDataGridView();
                    break;
                }
            }
        }

        private void InitializeTimerDB()
        {
            _timerDB = new Timer();
            _timerDB.Interval = 10000; // 1 minute
            _timerDB.Tick += async (s, e) =>
            {
                await SyncDataAsync();
                RefreshLogsForm(); // add this line
            };
            _timerDB.Start();
        }

        public async Task SyncDataAsync()
        {
            var firebaseClient = FirebaseConfig.GetFirebaseClient();
            var logs = await firebaseClient.Child("Logs").OnceAsync<Log>();

            sql_con.Open();

            using (SQLiteCommand command = new SQLiteCommand(sql_con))
            {
                using (SQLiteTransaction transaction = sql_con.BeginTransaction())
                {
                    // Clear the Logs table
                    command.CommandText = "DELETE FROM Logs";
                    command.ExecuteNonQuery();

                    // Insert the new logs
                    foreach (var log in logs)
                    {
                        if (log.Object != null)
                        {
                            command.CommandText = $"INSERT INTO Logs VALUES ('{log.Object.CNP}', '{log.Object.DateTime}', '{log.Object.Direction}')";
                            command.ExecuteNonQuery();
                        }
                        else
                        {
                            Console.WriteLine("Skipping...");
                        }
                    }

                    transaction.Commit();
                }
            }

            sql_con.Close();
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            string[] states = { "inchis", "deschis", "deschidere" };
            Random random = new Random();
            int index = random.Next(states.Length);
            string state = states[index];
            UpdateUI(state);
        }

        private void SerialPort_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            string data = _serialPort.ReadLine().Trim();
            Invoke(new Action(() => UpdateUI(data)));
        }

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

        private void mainPage_Load(object sender, EventArgs e)
        {
            timerOraCurenta.Enabled = true;
            /*try
            {
                DiscoverDevices();
                string deviceName = "Andrei's Galaxy A70"; // Replace this with the actual device name

                if (_targetDevice != null && _targetDevice.DeviceName == deviceName) // Checks if the device name matches the name you provided
                {
                    _bluetoothClient.Connect(_targetDevice.DeviceAddress, BluetoothService.SerialPort); // Connects to the device

                    if (_bluetoothClient.Connected)
                    {
                        MessageBox.Show("Connected Successfully", "Connection Status", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    }
                    else
                    {
                        MessageBox.Show("Failed to Connect", "Connection Status", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                    return;
                }

                MessageBox.Show("Device not found", "Connection Status", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Connection Failed: " + ex.Message, "Connection Status", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }*/
        }



        private void btnDenyAcces_Click(object sender, EventArgs e)
        {
            try
            {
                if (_serialPort != null && _serialPort.IsOpen)
                {
                    _serialPort.Write("f");  // Send the character "f" to Arduino
                    MessageBox.Show("Accesul a fost respins! ", "ACCES RESPINS", MessageBoxButtons.OK, MessageBoxIcon.Stop);
                }
                else
                {
                    MessageBox.Show("The serial port is not open!", "ERROR", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "ERROR", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public DataTable GetLogsFromDatabase()
        {
            DataTable dt = new DataTable();

            // Define columns
            dt.Columns.Add("CNP", typeof(string));
            dt.Columns.Add("DateTime", typeof(string));
            dt.Columns.Add("Direction", typeof(string));

            // Always create a new connection
            using (SQLiteConnection con = new SQLiteConnection($"Data Source={dbPath};Version=3;New=False;Compress=True;"))
            {
                con.Open();
                using (SQLiteCommand command = new SQLiteCommand("SELECT * FROM Logs", con))
                {
                    using (SQLiteDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            string cnp = reader.GetString(0);
                            string dateTime = reader.GetString(1);
                            string direction = reader.GetString(2);

                            dt.Rows.Add(cnp, dateTime, direction);
                        }
                    }
                }
            }

            return dt;
        }

        private void btnLogs_Click(object sender, EventArgs e)
        {
            var logsForm = new LogsForm(this); // Pass 'this' MainPage

            if (sql_con.State != ConnectionState.Open)
                sql_con.Open();

            using (SQLiteCommand command = new SQLiteCommand("SELECT * FROM Logs", sql_con))
            {
                using (SQLiteDataReader reader = command.ExecuteReader())
                {
                    DataTable dt = new DataTable();
                    // Specify the schema of DataTable manually
                    dt.Columns.Add("CNP", typeof(string));
                    dt.Columns.Add("DateTime", typeof(string)); // Set it to String
                    dt.Columns.Add("Direction", typeof(string));

                    // Manually populate the DataTable
                    while (reader.Read())
                    {
                        DataRow row = dt.NewRow();
                        row["CNP"] = reader.GetString(0); // Assuming CNP is the first column in your table

                        // Get the string directly
                        row["DateTime"] = reader.GetString(1);

                        row["Direction"] = reader.GetString(2); // Assuming Direction is the third column in your table
                        dt.Rows.Add(row);
                    }

                    logsForm.dataGridView.DataSource = dt;
                }
            }

            sql_con.Close();

            logsForm.Show();
        }

        private void mainPage_FormClosing(object sender, FormClosingEventArgs e)
        {
            //_udpClient?.Close();
            //_serialPort?.Close();
            Application.Exit();
        }

        private void btnDisconnectPortar_Click(object sender, EventArgs e)
        {
            Login login = new Login();
            login.Show();
            this.Hide();
        }

        private void timerOraCurenta_Tick(object sender, EventArgs e)
        {
            oraCurenta.Text = DateTime.Now.ToString("HH:mm:ss");
        }
    }
}
