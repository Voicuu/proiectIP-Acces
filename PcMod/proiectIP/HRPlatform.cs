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
using QRCoder;


namespace proiectIP
{

    public partial class HRPlatform : Form
    {

        public HRPlatform()
        {
            InitializeComponent();
        }

        private void HRPlatform_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (e.CloseReason == CloseReason.UserClosing)
            {
                // The user clicked the "X" close button
                // Add code to save any unsaved data here if needed
                Application.Exit();
            }
        }

        private void HRPlatform_Load(object sender, EventArgs e)
        {
            timerOraCurenta2.Enabled = true;
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

        private void buttonAddEmployee_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Angajatul a fost adaugat!", "Succes!", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        private void btnDisconnectHR_Click(object sender, EventArgs e)
        {
            Login login = new Login();
            login.Show();
            this.Hide();
        }

        private byte[] selectedImageData;
        private void btnBrowse_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog openFileDialog = new OpenFileDialog())
            {
                openFileDialog.Title = "Selectati o imagine";
                openFileDialog.Filter = "Image files (*.jpg; *.jpeg; *.gif; *.bmp; *.png)|*.jpg; *.jpeg; *.gif; *.bmp; *.png";

                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    // Load the selected image into a MemoryStream to avoid locking the file
                    using (FileStream fileStream = new FileStream(openFileDialog.FileName, FileMode.Open))
                    {
                        selectedImageData = new byte[fileStream.Length];
                        fileStream.Read(selectedImageData, 0, selectedImageData.Length);
                    }

                    // Load the image into the PictureBox from the MemoryStream
                    using (MemoryStream memoryStream = new MemoryStream(selectedImageData))
                    {
                        pictureBoxPoza.Image = Image.FromStream(memoryStream);
                    }
                }
            }
        }

        private void timerOraCurenta2_Tick(object sender, EventArgs e)
        {
            oraCurenta2.Text = DateTime.Now.ToString("HH:mm:ss");
        }

        
    }
}
