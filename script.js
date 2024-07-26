// script.js
const display = document.getElementById('display');

// ... other functions ...

function updateDisplay(value) {
    display.textContent = value;
}

// Assuming you have a function to get Telegram's theme
function getTelegramTheme() {
  // Logic to get Telegram's theme (light or dark)
  return telegramTheme; // Return 'light' or 'dark'
}

// Function to set CSS variables based on theme
function setThemeColors() {
  const theme = getTelegramTheme();
  const root = document.documentElement;
  if (theme === 'light') {
    root.style.setProperty('--telegram-background', '#ffffff');
    root.style.setProperty('--telegram-text', '#000000');
  } else {
    root.style.setProperty('--telegram-background', '#000000');
    root.style.setProperty('--telegram-text', '#ffffff');
  }
}

// Initial call to set theme colors
setThemeColors();

// Listen for theme changes (if applicable)
// ...
        
