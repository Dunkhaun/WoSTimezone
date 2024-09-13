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
        { name: 'SST (Singapore Standard Time)', value: 'Asia/Singapore' }
    ];

    const translations = {
        'en': {
            'enter-time': 'Enter time:',
            'select-timezone': 'Select your timezone:',
            'time-format': 'Time Format:',
            'select-language': 'Select Language:',
            'converted-times': 'Converted Times:',
            'copy': 'Copy',
            'copy-all': 'Copy All',
            'reset': 'Reset',
            'toggle-theme': 'Toggle Theme',
            'loading': 'Loading...',
            'copied': 'Copied to clipboard',
            'copied-all': 'All times copied to clipboard',
            'please-enter': 'Please enter both time and timezone.',
            'convert-button': "Converting"
        },
        'ar': {
            'enter-time': 'أدخل الوقت:',
            'select-timezone': 'حدد منطقتك الزمنية:',
            'time-format': 'تنسيق الوقت:',
            'select-language': 'اختر اللغة:',
            'converted-times': 'الأوقات المحولة:',
            'copy': 'نسخ',
            'copy-all': 'نسخ الكل',
            'reset': 'إعادة تعيين',
            'toggle-theme': 'تبديل السمة',
            'loading': 'جار التحميل...',
            'copied': 'تم نسخه إلى الحافظة',
            'copied-all': 'تم نسخ جميع الأوقات إلى الحافظة',
            'please-enter': 'الرجاء إدخال كل من الوقت والمنطقة الزمنية.',
            'convert-button': 'Converting'
        },
        'ko': {
            'enter-time': '시간 입력:',
            'select-timezone': '시간대 선택:',
            'time-format': '시간 형식:',
            'select-language': '언어 선택:',
            'converted-times': '변환된 시간:',
            'copy': '복사',
            'copy-all': '모두 복사',
            'reset': '초기화',
            'toggle-theme': '테마 변경',
            'loading': '로딩 중...',
            'copied': '클립보드에 복사됨',
            'copied-all': '모든 시간이 클립보드에 복사되었습니다',
            'please-enter': '시간과 시간대를 모두 입력해 주세요.',
            'convert-button': 'Converting'
        },
        'fr': {
            'enter-time': 'Entrer l\'heure:',
            'select-timezone': 'Sélectionnez votre fuseau horaire:',
            'time-format': 'Format de l\'heure:',
            'select-language': 'Choisir la langue:',
            'converted-times': 'Heures Converties:',
            'copy': 'Copier',
            'copy-all': 'Tout Copier',
            'reset': 'Réinitialiser',
            'toggle-theme': 'Changer de thème',
            'loading': 'Chargement...',
            'copied': 'Copié dans le presse-papiers',
            'copied-all': 'Tous les temps ont été copiés dans le presse-papiers',
            'please-enter': 'Veuillez entrer à la fois l\'heure et le fuseau horaire.',
            'convert-button': 'Converting'
        }
    };

    const timezoneSelect = document.getElementById('input-timezone');
    const timezoneList = document.getElementById('timezone-list');
    const convertButton = document.getElementById('convert-button');
    const copyAllButton = document.getElementById('copy-all-button');
    const resetButton = document.getElementById('reset-button');
    const loading = document.getElementById('loading');
    const timeFormatSelect = document.getElementById('time-format');
    const toggleThemeButton = document.getElementById('toggle-theme-button');
    const languageSelect = document.getElementById('language-select');

    // Populate timezone dropdown
    timezones.forEach(timezone => {
        const option = document.createElement('option');
        option.value = timezone.value;
        option.textContent = timezone.name;
        timezoneSelect.appendChild(option);
    });

    // Translate UI
    function translateUI(language) {
        document.querySelector('label[for="input-time"]').textContent = translations[language]['enter-time'];
        document.querySelector('label[for="input-timezone"]').textContent = translations[language]['select-timezone'];
        document.querySelector('label[for="time-format"]').textContent = translations[language]['time-format'];
        document.querySelector('label[for="language-select"]').textContent = translations[language]['select-language'];
        document.querySelector('#results h2').textContent = translations[language]['converted-times'];
        convertButton.innerHTML = `<i class="fas fa-sync-alt"></i> ${translations[language]['convert']}`;
        copyAllButton.innerHTML = `<i class="fas fa-copy"></i> ${translations[language]['copy-all']}`;
        resetButton.innerHTML = `<i class="fas fa-redo"></i> ${translations[language]['reset']}`;
        toggleThemeButton.innerHTML = `<i class="fas fa-palette"></i> ${translations[language]['toggle-theme']}`;
        loading.textContent = translations[language]['loading'];
    }

    // Set default language
    let currentLanguage = 'en';
    translateUI(currentLanguage);

    languageSelect.addEventListener('change', function () {
        currentLanguage = this.value;
        translateUI(currentLanguage);
    });

    convertButton.addEventListener('click', function () {
        const inputTime = document.getElementById('input-time').value;
        const inputTimezone = timezoneSelect.value;
        const timeFormat = timeFormatSelect.value;

        if (!inputTime || !inputTimezone) {
            alert(translations[currentLanguage]['please-enter']);
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
            listItem.innerHTML = `${timezone.name}: ${formattedTime} <button class="copy-button"><i class="fas fa-copy"></i> ${translations[currentLanguage]['copy']}</button>`;
            timezoneList.appendChild(listItem);
        });

        // Hide loading spinner
        loading.style.display = 'none';

        // Enable "Copy All" button after conversion
        copyAllButton.style.display = 'block';

        const copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
            button.addEventListener('click', function () {
                const timeText = this.parentNode.textContent.replace(translations[currentLanguage]['copy'], '').trim();
                navigator.clipboard.writeText(timeText).then(() => {
                    alert(translations[currentLanguage]['copied']);
                });
            });
        });

        // Copy all times functionality
        copyAllButton.addEventListener('click', function () {
            let allTimes = '';
            timezoneList.querySelectorAll('li').forEach(li => {
                allTimes += li.textContent.replace(translations[currentLanguage]['copy'], '').trim() + '\n';
            });
            navigator.clipboard.writeText(allTimes).then(() => {
                alert(translations[currentLanguage]['copied-all']);
            });
        });
    });

    resetButton.addEventListener('click', function () {
        document.getElementById('input-time').value = '';
        timezoneSelect.value = '';
        timezoneList.innerHTML = '';
        copyAllButton.style.display = 'none';
    });

    toggleThemeButton.addEventListener('click', function () {
        document.body.classList.toggle('pink-theme');
        document.body.classList.toggle('black-theme');
        document.body.classList.toggle('pink-black-theme');
    });

    // Populate local timezone if available
    function setLocalTimezone() {
        if (Intl.DateTimeFormat().resolvedOptions().timeZone) {
            timezoneSelect.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
    }
    setLocalTimezone();

    // Update theme based on user preference
    function updateTheme() {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.body.classList.add(currentTheme);
        }
    }
    updateTheme();
});
