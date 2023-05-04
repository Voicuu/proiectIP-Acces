using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Firebase.Database;
using Firebase.Database.Query;

namespace proiectIP
{
    public partial class Login : Form
    {
        public Login()
        {
            InitializeComponent();
            
        }

        private async Task<bool> AuthenticateUser(string role, string username, string password)
        {
            // Get the data from the Firebase Realtime Database using your FirebaseConfig class
            var firebaseClient = FirebaseConfig.GetFirebaseClient();
            var usersData = await firebaseClient
                .Child("Conturi")
                .Child(role)
                .OnceAsync<Dictionary<string, string>>();

            // Check if the user with the entered username exists and if the password matches
            foreach (var user in usersData)
            {
                var userData = user.Object;

                if (userData["username"] == username && userData["password"] == password)
                {
                    return true;
                }
            }

            return false;
        }

        private async void buttonLogin_Click(object sender, EventArgs e)
        {
            string role = comboBoxFunctie.SelectedItem.ToString();
            string username = textBoxUserName.Text;
            string password = textBoxPassword.Text;

            bool isAuthenticated = await AuthenticateUser(role, username, password);

            if (isAuthenticated)
            {
                if (role == "HR")
                {
                    // Open HR form
                    HRPlatform hrForm = new HRPlatform();
                    hrForm.Show();
                    this.Hide();
                }
                else if (role == "PORTAR")
                {
                    // Open Portar form
                    MainPage portarForm = new MainPage();
                    portarForm.Show();
                    this.Hide();
                }
            }
            else
            {
                textBoxPassword.Text = "";
                textBoxUserName.Text = "";
                MessageBox.Show("Username sau parola incorecta", "Eroare", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Login_FormClosing(object sender, FormClosingEventArgs e)
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
