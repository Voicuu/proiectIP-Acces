using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using QRCoder;


namespace proiectIP
{
    public partial class HR_Platform : Form
    {
        public HR_Platform()
        {
            InitializeComponent();
        }


        private void HR_Platform_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (e.CloseReason == CloseReason.UserClosing)
            {
                // The user clicked the "X" close button
                // Add code to save any unsaved data here if needed
                Application.Exit();
            }
        }

        private void HR_Platform_Load(object sender, EventArgs e)
        {

        }

        private void buttonGenerateQRCode_Click(object sender, EventArgs e)
        {
            // Creează o instanță a generatorului de coduri QR
            QRCodeGenerator qrGenerator = new QRCodeGenerator();

            // Introdu mesajul pe care dorești să-l codifici în QR code
            string message = "https://facebook.com";

            // Generează datele QR code-ului
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(message, QRCodeGenerator.ECCLevel.Q);

            // Creează obiectul QR code care va genera imaginea QR code-ului
            QRCode qrCode = new QRCode(qrCodeData);

            // Generează imaginea QR code-ului în format bitmap și o atribuie PictureBox-ului
            using (Bitmap qrCodeImage = qrCode.GetGraphic(20))
            {
                pictureBoxQRCode.Image = new Bitmap(qrCodeImage);
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Angajatul a fost adaugat!", "Succes!", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
    }
}
