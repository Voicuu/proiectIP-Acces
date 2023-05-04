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

        /*private async void buttonLogin_Click(object sender, EventArgs e)
        {
            string userName = textBoxUserName.Text;
            string password = textBoxPassword.Text;
            bool userFound = true;

            // Initialize a Firebase client with your Firebase Realtime Database URL
            FirebaseClient firebaseClient = FirebaseConfig.GetFirebaseClient();

            // Query the database using the Child, OrderByChild, and EqualTo methods
            IEnumerable<FirebaseObject<Angajat>> queryResult = await firebaseClient
                .Child("Angajati") // Replace with the actual path in your database
                .OnceAsync<Angajat>(); // Specify the type of object you expect to receive

            // Access the queried data from the query result
            foreach (FirebaseObject<Angajat> result in queryResult)
            {
                Angajat ang = result.Object;
                
                if(ang.Nume == userName && ang.CodSecuritate == password)
                {
                    userFound = true;
                }
            }

            if (comboBoxFunctie.Text=="PORTAR" && userFound)
            {
                MainPage mp = new MainPage();
                this.Hide();
                mp.Show();
                
            }
            else if(comboBoxFunctie.Text=="HR" && userFound)
            {
                HRPlatform hr = new HRPlatform();
                this.Hide();
                hr.Show();
            }
            else
            {
                MessageBox.Show("Username sau parola incorecta!", "Eroare!", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }*/

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
                else if (role == "Portar")
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
