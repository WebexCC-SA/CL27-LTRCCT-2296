document.addEventListener('DOMContentLoaded', function() {
    const attendeeID = localStorage.getItem('attendeeID') || 'Not Set';
    const placeholders = document.querySelectorAll('.attendee-id-placeholder');

    placeholders.forEach(function(placeholder) {
        placeholder.textContent = attendeeID;
    });

    const passwordValue = document.getElementById('attendee-password');
    const passwordContainer = document.querySelector('.attendee-password-container');
    const attendeePassword = localStorage.getItem('attendeePassword');

    if (passwordValue && attendeePassword) {
        passwordValue.textContent = attendeePassword;
    }

    if (passwordContainer && attendeePassword) {
        passwordContainer.addEventListener('click', function() {
            navigator.clipboard.writeText(attendeePassword).then(() => {
                console.log('Password copied to clipboard');
            }).catch(err => {
                console.error('Could not copy password: ', err);
            });
        });
    }
});
