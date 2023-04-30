namespace proiectIP
{
    partial class mainPage
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(mainPage));
            this.pbBackground = new System.Windows.Forms.PictureBox();
            this.label1 = new System.Windows.Forms.Label();
            this.oraCurenta = new System.Windows.Forms.Label();
            this.timerOraCurenta = new System.Windows.Forms.Timer(this.components);
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.pictureBox2 = new System.Windows.Forms.PictureBox();
            this.label6 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label9 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.btnDenyAcces = new System.Windows.Forms.Button();
            this.btnLogs = new System.Windows.Forms.Button();
            this.timer1 = new System.Windows.Forms.Timer(this.components);
            this.btnDisconnectPortar = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.pbBackground)).BeginInit();
            this.groupBox2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
            this.groupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // pbBackground
            // 
            this.pbBackground.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pbBackground.Image = ((System.Drawing.Image)(resources.GetObject("pbBackground.Image")));
            this.pbBackground.Location = new System.Drawing.Point(-10, -4);
            this.pbBackground.Name = "pbBackground";
            this.pbBackground.Size = new System.Drawing.Size(782, 440);
            this.pbBackground.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pbBackground.TabIndex = 0;
            this.pbBackground.TabStop = false;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.BackColor = System.Drawing.Color.Transparent;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 22.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(224, 9);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(322, 42);
            this.label1.TabIndex = 1;
            this.label1.Text = "Pagina principală";
            this.label1.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            // 
            // oraCurenta
            // 
            this.oraCurenta.AutoSize = true;
            this.oraCurenta.BackColor = System.Drawing.Color.Transparent;
            this.oraCurenta.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.oraCurenta.Location = new System.Drawing.Point(668, 9);
            this.oraCurenta.Name = "oraCurenta";
            this.oraCurenta.Size = new System.Drawing.Size(0, 25);
            this.oraCurenta.TabIndex = 2;
            // 
            // timerOraCurenta
            // 
            this.timerOraCurenta.Enabled = true;
            this.timerOraCurenta.Tick += new System.EventHandler(this.timer1_Tick);
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.pictureBox2);
            this.groupBox2.Controls.Add(this.label6);
            this.groupBox2.Controls.Add(this.label5);
            this.groupBox2.Location = new System.Drawing.Point(12, 75);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(350, 259);
            this.groupBox2.TabIndex = 5;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Detalii poartă:";
            // 
            // pictureBox2
            // 
            this.pictureBox2.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.pictureBox2.Location = new System.Drawing.Point(9, 93);
            this.pictureBox2.Name = "pictureBox2";
            this.pictureBox2.Size = new System.Drawing.Size(175, 98);
            this.pictureBox2.TabIndex = 11;
            this.pictureBox2.TabStop = false;
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(90, 50);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(41, 15);
            this.label6.TabIndex = 10;
            this.label6.Text = "label6";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(6, 50);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(77, 15);
            this.label5.TabIndex = 9;
            this.label5.Text = "Stare poartă:";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.label9);
            this.groupBox1.Controls.Add(this.label8);
            this.groupBox1.Controls.Add(this.label7);
            this.groupBox1.Controls.Add(this.pictureBox1);
            this.groupBox1.Controls.Add(this.label4);
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Location = new System.Drawing.Point(390, 75);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(350, 259);
            this.groupBox1.TabIndex = 6;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Detalii angajat:";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(51, 164);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(41, 15);
            this.label9.TabIndex = 15;
            this.label9.Text = "label9";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(105, 124);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(41, 15);
            this.label8.TabIndex = 14;
            this.label8.Text = "label8";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(57, 84);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(41, 15);
            this.label7.TabIndex = 13;
            this.label7.Text = "label7";
            // 
            // pictureBox1
            // 
            this.pictureBox1.BackColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.pictureBox1.Location = new System.Drawing.Point(225, 84);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(100, 95);
            this.pictureBox1.TabIndex = 12;
            this.pictureBox1.TabStop = false;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(6, 164);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(38, 15);
            this.label4.TabIndex = 11;
            this.label4.Text = "Sens:";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(6, 124);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(92, 15);
            this.label3.TabIndex = 10;
            this.label3.Text = "Număr mașină:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(6, 84);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(44, 15);
            this.label2.TabIndex = 9;
            this.label2.Text = "Nume:";
            // 
            // btnDenyAcces
            // 
            this.btnDenyAcces.BackColor = System.Drawing.Color.Red;
            this.btnDenyAcces.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnDenyAcces.ForeColor = System.Drawing.SystemColors.ButtonFace;
            this.btnDenyAcces.Location = new System.Drawing.Point(156, 356);
            this.btnDenyAcces.Name = "btnDenyAcces";
            this.btnDenyAcces.Size = new System.Drawing.Size(125, 43);
            this.btnDenyAcces.TabIndex = 7;
            this.btnDenyAcces.Text = "DENY ACCESS";
            this.btnDenyAcces.UseVisualStyleBackColor = false;
            this.btnDenyAcces.Click += new System.EventHandler(this.btnDenyAcces_Click);
            // 
            // btnLogs
            // 
            this.btnLogs.BackColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnLogs.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnLogs.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.btnLogs.Location = new System.Drawing.Point(12, 356);
            this.btnLogs.Name = "btnLogs";
            this.btnLogs.Size = new System.Drawing.Size(125, 43);
            this.btnLogs.TabIndex = 8;
            this.btnLogs.Text = "Logs";
            this.btnLogs.UseVisualStyleBackColor = false;
            this.btnLogs.Click += new System.EventHandler(this.btnLogs_Click);
            // 
            // btnDisconnectPortar
            // 
            this.btnDisconnectPortar.Location = new System.Drawing.Point(670, 399);
            this.btnDisconnectPortar.Name = "btnDisconnectPortar";
            this.btnDisconnectPortar.Size = new System.Drawing.Size(87, 23);
            this.btnDisconnectPortar.TabIndex = 9;
            this.btnDisconnectPortar.Text = "Deconectare";
            this.btnDisconnectPortar.UseVisualStyleBackColor = true;
            // 
            // mainPage
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("$this.BackgroundImage")));
            this.ClientSize = new System.Drawing.Size(769, 434);
            this.Controls.Add(this.btnDisconnectPortar);
            this.Controls.Add(this.btnLogs);
            this.Controls.Add(this.btnDenyAcces);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.oraCurenta);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.pbBackground);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MinimizeBox = false;
            this.Name = "mainPage";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Main Page";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.mainPage_FormClosing);
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.pbBackground)).EndInit();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.PictureBox pbBackground;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label oraCurenta;
        private System.Windows.Forms.Timer timerOraCurenta;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button btnDenyAcces;
        private System.Windows.Forms.Button btnLogs;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Timer timer1;
        private System.Windows.Forms.PictureBox pictureBox2;
        private System.Windows.Forms.Button btnDisconnectPortar;
    }
}

