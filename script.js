document.addEventListener('DOMContentLoaded', function () {
    const topTimezones = [
        'UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 
        'Australia/Sydney', 'Europe/Paris', 'America/Los_Angeles', 
        'Asia/Dubai', 'America/Sao_Paulo', 'Asia/Shanghai'
    ];
    
    const timezoneSelect = document.getElementById('input-timezone');
    const timezoneList = document.getElementById('timezone-list');
    const convertButton = document.getElementById('convert-button');

    // Populate timezone dropdown
    topTimezones.forEach(timezone => {
        const option = document.createElement('option');
        option.value = timezone;
        option.textContent = timezone.replace('_', ' ');
        timezoneSelect.appendChild(option);
    });

    convertButton.addEventListener('click', function () {
        const inputTime = document.getElementById('input-time').value;
        const inputTimezone = timezoneSelect.value;

        if (!inputTime || !inputTimezone) {
            alert('Please enter both time and timezone.');
            return;
        }

        timezoneList.innerHTML = '';

        topTimezones.forEach(timezone => {
            const convertedTime = new Date(new Date(inputTime).toLocaleString("en-US", { timeZone: timezone }));
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${timezone.replace('_', ' ')}: ${convertedTime.toLocaleString()}</span> <button class="copy-button">Copy</button>`;
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
