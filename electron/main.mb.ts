import { app } from 'electron';
import { menubar } from 'menubar';
import path from 'node:path';

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged
    ? process.env.DIST
    : path.join(process.env.DIST, '../public');

// Define the path to the icon and index.html for the menubar app
const iconPath = path.join(process.env.VITE_PUBLIC, 'icon.png');
const indexPath = app.isPackaged
    ? path.join(process.env.DIST, 'index.html')
    : process.env['VITE_DEV_SERVER_URL'] || path.join(process.env.DIST, 'index.html');

// Initialize menubar
const mb = menubar({
    icon: iconPath,
    index: indexPath,
    browserWindow: {
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        height: 600,
        width: 300,
    },
});

mb.on('ready', () => {
    // Additional menubar app logic here
});

// You might keep or adjust the existing app lifecycle events as needed
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // This is typically used to re-create a window in apps with a UI,
    // but for a menubar app, you might not need this logic.
});
