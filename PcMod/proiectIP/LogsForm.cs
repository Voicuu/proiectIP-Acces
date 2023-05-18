using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SQLite;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace proiectIP
{

    public partial class LogsForm : Form
    {
        private MainPage _mainPage;
        public LogsForm(MainPage mainPage)
        {
            _mainPage = mainPage;
            InitializeComponent();
        }

        protected override async void OnShown(EventArgs e)
        {
            base.OnShown(e);
            await _mainPage.SyncDataAsync();

            DataTable dt = _mainPage.GetLogsFromDatabase();
            dataGridView.DataSource = dt;

            // Refresh the DataGridView
            dataGridView.Refresh();
        }
        public void RefreshDataGridView()
        {
            dataGridView.DataSource = null; // clear the old data
            dataGridView.DataSource = _mainPage.GetLogsFromDatabase();
        }



    }
}
