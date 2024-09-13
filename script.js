document.addEventListener('DOMContentLoaded', function () {
    const timezones = [
        { name: 'UTC (Coordinated Universal Time)', value: 'UTC' },
        { name: 'GMT (Greenwich Mean Time)', value: 'Europe/London' },
        { name: 'EST (Eastern Standard Time)', value: 'America/New_York' },
        { name: 'CST (Central Standard Time)', value: 'America/Chicago' },
        { name: 'MST (Mountain Standard Time)', value: 'America/Denver' },
        { name: 'PST (Pacific Standard Time)', value: 'America/Los_Angeles' },
        { name: 'CET (Central European Time)', value: 'Europe/Berlin' },
        { name: 'IST (India Standard Time)', value: 'Asia/Kolkata' },
        { name: 'JST (Japan Standard Time)', value: 'Asia/Tokyo' },
        { name: 'AEST (Australian Eastern Standard Time)', value: 'Australia/Sydney' },
    ];

    const timezoneList = document.getElementById('timezone-list');
    const convertButton = document.getElementById('convert-button');

    convertButton.addEventListener('click', function () {
        const inputTime = document.getElementById('input-time').value;
        const inputTimezone = document.getElementById('input-timezone').value;

        if (!inputTime || !inputTimezone) {
            alert('Please enter both time and timezone.');
            return;
        }

        timezoneList.innerHTML = '';

        timezones.forEach(timezone => {
            const convertedTime = new Date(new Date(inputTime).toLocaleString("en-US", { timeZone: timezone.value }));
            const listItem = document.createElement('li');
            listItem.innerHTML = `${timezone.name}: ${convertedTime.toLocaleString()} <button class="copy-button"><i class="fas fa-copy"></i> Copy</button>`;
            timezoneList.appendChild(listItem);
        });

        const copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
            button.addEventListener('click', function () {
                const timeText = this.parentNode.textContent.split('Copy')[0].trim();
                navigator.clipboard.writeText(timeText).then(() => {
                    alert('Copied to clipboard');
                });
            });
        });
    });
});
