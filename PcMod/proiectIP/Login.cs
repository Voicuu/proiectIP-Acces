using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace proiectIP
{
    public partial class Login : Form
    {
        public Login()
        {
            InitializeComponent();
            
        }

        private void buttonLogin_Click(object sender, EventArgs e)
        {
            if(comboBoxFunctie.Text=="PORTAR")
            {
                MainPage mp = new MainPage();
                this.Hide();
                mp.Show();
                
            }else if(comboBoxFunctie.Text=="HR")
            {
                HRPlatform hr = new HRPlatform();
                this.Hide();
                hr.Show();
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
