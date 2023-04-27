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

        private void button1_Click(object sender, EventArgs e)
        {
            if(comboBox1.Text=="PORTAR")
            {
                mainPage mp = new mainPage();
                this.Hide();
                mp.Show();
                
            }else if(comboBox1.Text=="HR")
            {
                HR_Platform hr = new HR_Platform();
                this.Hide();
                hr.Show();
            }
        }
    }
}
