// join.js

document.addEventListener('DOMContentLoaded', () => {
    // Set timestamp
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Modal logic
    const modals = {
        'np-modal': document.getElementById('np-modal'),
        'bronze-modal': document.getElementById('bronze-modal'),
        'silver-modal': document.getElementById('silver-modal'),
        'gold-modal': document.getElementById('gold-modal'),
    };

    const openButtons = document.querySelectorAll('.modal-open');
    openButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = btn.getAttribute('data-modal');
            if (modals[modalId]) {
                modals[modalId].showModal();
            }
        });
    });

    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const dialog = btn.closest('dialog');
            if (dialog) {
                dialog.close();
            }
        });
    });

    // Close on click outside
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('click', (e) => {
            const rect = dialog.getBoundingClientRect();
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                dialog.close();
            }
        });
    });
});
