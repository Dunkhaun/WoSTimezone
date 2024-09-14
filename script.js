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
        { name: 'SST (Singapore Standard Time)', value: 'Asia/Singapore' }  // Added SST
    ];

    const timezoneSelect = document.getElementById('input-timezone');
    const timezoneList = document.getElementById('timezone-list');
    const convertButton = document.getElementById('convert-button');
    const copyAllButton = document.getElementById('copy-all-button');
    const resetButton = document.getElementById('reset-button');
    const loading = document.getElementById('loading');
    const timeFormatSelect = document.getElementById('time-format');

    // Populate timezone dropdown
    timezones.forEach(timezone => {
        const option = document.createElement('option');
        option.value = timezone.value;
        option.textContent = timezone.name;
        timezoneSelect.appendChild(option);
    });

    convertButton.addEventListener('click', function () {
        const inputTime = document.getElementById('input-time').value;
        const inputTimezone = timezoneSelect.value;
        const timeFormat = timeFormatSelect.value;

        if (!inputTime || !inputTimezone) {
            alert('Please enter both time and timezone.');
            return;
        }

        // Show loading spinner
        loading.style.display = 'block';
        timezoneList.innerHTML = '';

        timezones.forEach(timezone => {
            const convertedTime = new Date(new Date(inputTime).toLocaleString("en-US", { timeZone: timezone.value }));
            const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: timeFormat === 'en-US' };
            const formattedTime = convertedTime.toLocaleString(timeFormat, options);
            const listItem = document.createElement('li');
            listItem.innerHTML = ${timezone.name}:$
            {formattedTime} <button class="copy-button"><i class="fas fa-copy"></i> Copy</button>;
            timezoneList.appendChild(listItem);
        });

        // Hide loading spinner
        loading.style.display = 'none';

        // Enable "Copy All" button after conversion
        copyAllButton.style.display = 'block';

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

    copyAllButton.addEventListener('click', function () {
        let allTimesText = '';
        const items = document.querySelectorAll('#timezone-list li');

        items.forEach(item => {
            const timeText = item.textContent.split('Copy')[0].trim();
            allTimesText += timeText + '\n';
        });

        navigator.clipboard.writeText(allTimesText).then(() => {
            alert('All times copied to clipboard');
        });
    });

    resetButton.addEventListener('click', function () {
        document.getElementById('input-time').value = '';
        timezoneSelect.value = '';
        timeFormatSelect.value = 'en-US';
        timezoneList.innerHTML = '';
        copyAllButton.style.display = 'none';
    });
});
