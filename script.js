// Example ages data from your ages.json
const ages = {
    "2768409": 1383264000000,
    "7679610": 1388448000000,
    "11538514": 1391212000000,
    // add more IDs from your ages.json
};

// Function to interpolate the account creation date
function getAccountCreationDate(userId) {
    const ids = Object.keys(ages).map(id => parseInt(id)).sort((a, b) => a - b);
    const lower = ids.find(id => id <= userId) || ids[0];
    const higher = ids.find(id => id >= userId) || ids[ids.length - 1];

    if (lower === higher) {
        return new Date(ages[lower]);
    }

    const lowerDate = ages[lower];
    const higherDate = ages[higher];
    const ratio = (userId - lower) / (higher - lower);
    const interpolatedDate = lowerDate + ratio * (higherDate - lowerDate);

    return new Date(interpolatedDate);
}

// Function to calculate the account age
function getAccountAge(creationDate) {
    const now = new Date();
    const ageInYears = Math.floor((now - creationDate) / (1000 * 60 * 60 * 24 * 365.25));
    return Math.max(ageInYears, 1); // Show at least 1 year
}

// Main function to retrieve Telegram user data and show the result
window.Telegram.WebApp.onEvent('init', function() {
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
    const creationDate = getAccountCreationDate(userId);
    const age = getAccountAge(creationDate);
    
    document.getElementById('result').innerText = `Your account is approximately ${age} years old.`;
});

// Expand the WebApp to full screen (optional)
window.Telegram.WebApp.expand();
