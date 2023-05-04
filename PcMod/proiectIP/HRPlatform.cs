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
using Firebase.Database;
using Firebase.Storage;
using Firebase.Database.Query;

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

        private void timerOraCurenta2_Tick(object sender, EventArgs e)
        {
            oraCurenta2.Text = DateTime.Now.ToString("HH:mm:ss");
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

        private async void buttonAddEmployee_Click(object sender, EventArgs e)
        {
            // Check if all the required fields are completed and the CNP has 13 characters
            if (string.IsNullOrEmpty(textBoxCNP.Text) || textBoxCNP.Text.Length != 13 ||
                string.IsNullOrEmpty(textBoxSecurityCode.Text) ||
                string.IsNullOrEmpty(textBoxDivizie.Text) ||
                string.IsNullOrEmpty(textBoxAccesRights.Text) ||
                string.IsNullOrEmpty(textBoxEmail.Text) ||
                string.IsNullOrEmpty(textBoxNrLegimitatie.Text) ||
                string.IsNullOrEmpty(textBoxCarNr.Text) ||
                string.IsNullOrEmpty(textBoxName.Text) ||
                pictureBoxPoza.Image == null)
            {
                MessageBox.Show("Vă rugăm să completați toate câmpurile obligatorii și să vă asigurați că CNP-ul are 13 caractere."
                    , "Atentie!", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            try
            {
                // Upload the image to Firebase Storage and get the download URL
                string fileName = $"{Guid.NewGuid().ToString()}.png";
                string imageUrl = await UploadImageToFirebaseStorage(selectedImageData, fileName);

                // Create a new Employee object with the data from the TextBoxes and the image URL
                Angajat angajatNou = new()
                {
                    CNP = textBoxCNP.Text,
                    Nume = textBoxName.Text,
                    NrLegitimatie = textBoxNrLegimitatie.Text,
                    Divizia = textBoxDivizie.Text,
                    CodSecuritate = textBoxSecurityCode.Text,
                    NrMasina = textBoxCarNr.Text,
                    DreptAcces = int.Parse(textBoxAccesRights.Text),
                    Email = textBoxEmail.Text,
                    Poza = imageUrl
                };

                // Save the new Employee object to the Firebase Realtime Database
                var firebaseClient = FirebaseConfig.GetFirebaseClient();
                await firebaseClient.Child("Angajati").Child(angajatNou.CNP).PutAsync(angajatNou);


                MessageBox.Show("Angajatul a fost adaugat!", "Succes!", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Firebase.Storage.FirebaseStorageException ex)
            {
                MessageBox.Show($"An error occurred while uploading the image:\n{ex.Message}\n\n{ex.StackTrace}");
            }
        }

        private async Task<string> UploadImageToFirebaseStorage(byte[] imageData, string fileName)
        {
            var firebaseStorage = new FirebaseStorage("acces-ff85a.appspot.com");
            var storageReference = firebaseStorage.Child("images").Child(fileName);
            using (var memoryStream = new MemoryStream(imageData))
            {
                await storageReference.PutAsync(memoryStream);
            }
            return await storageReference.GetDownloadUrlAsync();
        }


        
    }
}
