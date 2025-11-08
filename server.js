import express from 'express';
import { exec } from 'child_process';

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to trigger AutoFetch
app.get('/run', async (req, res) => {
  res.send('✅ AutoFetch started! Check logs for progress.');

  // Run your existing autofetch script
  exec('node autofetch-cron.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('AutoFetch service is running.');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
