using InTheHand.Net.Sockets;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SQLite;
using System.Drawing;
using System.Globalization;
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
        private SerialPort _serialPort;
        private Timer _timer;
        private Timer _timerDB;
        public SQLiteConnection sql_con;
        private string dbPath = Path.Combine(Application.StartupPath, "LocalDatabase.sqlite");


        public MainPage()
        {
            InitializeComponent();
            InitializeSerialPort();
            //InitializeTimer();
            InitializeTimerDB();
            SetConnection();
            CreateTable();
        }

        private void SetConnection()
        {
            sql_con = new SQLiteConnection($"Data Source={dbPath};Version=3;New=False;Compress=True;");
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

/*        private void InitializeTimer()
        {
            _timer = new Timer();
            _timer.Interval = 3000; // 3 seconds interval
            _timer.Tick += Timer_Tick;
            _timer.Start();
        }*/

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
            _timerDB.Tick += async (s, e) => {
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

                        command.CommandText = $"INSERT INTO Logs VALUES ('{log.Object.CNP}', '{log.Object.DateTime}', '{log.Object.Direction}')";
                        command.ExecuteNonQuery();
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


        }

        private void btnDenyAcces_Click(object sender, EventArgs e)
        {
            try
            {
                if (_serialPort != null && _serialPort.IsOpen)
                {
                    _serialPort.Write("0");
                    MessageBox.Show("Accesul a fost respins!", "ACCES RESPINS", MessageBoxButtons.OK, MessageBoxIcon.Stop);
                    
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
            if (e.CloseReason == CloseReason.UserClosing)
            {
                // The user clicked the "X" close button
                // Add code to save any unsaved data here if needed
                Application.Exit();
            }
        }

        protected override void OnFormClosing(FormClosingEventArgs e)
        {
            _serialPort.Close();
            base.OnFormClosing(e);
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