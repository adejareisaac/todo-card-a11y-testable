
document.addEventListener('DOMContentLoaded', function() {
    const dueDateTime = document.querySelector('time');
    const remainingSpan = document.querySelector('[data-testid="test-todo-time-remaining"] .showcase');
    const checkbox = document.querySelector('#complete-checkbox');
    const statusElement = document.querySelector('[data-testid="test-todo-status"]');
    const editButton = document.querySelector('[data-testid="test-todo-edit-button"]');
    const deleteButton = document.querySelector('[data-testid="test-todo-delete-button"]');
    const viewMode = document.querySelector('#viewmode');
    const editForm = document.querySelector('#edit-mode');
    const saveButton = document.querySelector('[data-testid="test-todo-save-button"]');
    const cancelButton = document.querySelector('[data-testid="test-todo-cancel-button"]');
    const titleEl = document.querySelector('[data-testid="test-todo-title"]');
    const descEl = document.querySelector('[data-testid="test-todo-description"]');
    const priorityEl = document.querySelector('[data-testid="test-todo-priority"]');
    const editTitleInput = document.querySelector('#edit-title');
    const editDescInput = document.querySelector('#edit-desc');
    const editPrioritySelect = document.querySelector('#edit-priority');
    const editDateInput = document.querySelector('#edit-date');
    const contentCard = document.querySelector('.to-do-container');

    function formatDueDate(dateString) {
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return 'Invalid date';
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function calculateDaysRemaining(dateString) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endDate = new Date(dateString);
        endDate.setHours(0, 0, 0, 0);
        const timeDifference = endDate - today;
        return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    }

    function updateRemainingText() {
        const dueDateValue = dueDateTime.getAttribute('datetime');
        const days = calculateDaysRemaining(dueDateValue);

        if (Number.isNaN(days)) {
            remainingSpan.textContent = 'Invalid due date';
            return;
        }

        if (days > 1) {
            remainingSpan.textContent = `${days} Days Remaining`;
        } else if (days === 1) {
            remainingSpan.textContent = '1 Day Remaining';
        } else if (days === 0) {
            remainingSpan.textContent = 'Due Today';
        } else {
            remainingSpan.textContent = `Overdue by ${Math.abs(days)} Day${Math.abs(days) === 1 ? '' : 's'}`;
        }
    }

    function openEditMode() {
        editTitleInput.value = titleEl.textContent.trim();
        editDescInput.value = descEl.textContent.trim();
        editPrioritySelect.value = priorityEl.textContent.trim();
        const dueDateValue = dueDateTime.getAttribute('datetime');
        editDateInput.value = dueDateValue ? `${dueDateValue}T00:00` : '';
        viewMode.classList.add('hidden');
        editForm.classList.remove('hidden');
    }

    function closeEditMode() {
        editForm.classList.add('hidden');
        viewMode.classList.remove('hidden');
    }

    function updateCard() {
        titleEl.textContent = editTitleInput.value.trim() || 'Untitled';
        descEl.textContent = editDescInput.value.trim() || 'No description provided.';
        priorityEl.textContent = editPrioritySelect.value;

        const selectedDate = editDateInput.value;
        if (selectedDate) {
            const dateOnly = selectedDate.split('T')[0];
            dueDateTime.setAttribute('datetime', dateOnly);
            dueDateTime.textContent = formatDueDate(dateOnly);
        }

        updateRemainingText();
    }

    updateRemainingText();

    checkbox.addEventListener('change', function() {
        statusElement.textContent = checkbox.checked ? 'Done' : 'In Progress';
    });

    editButton.addEventListener('click', openEditMode);
    cancelButton.addEventListener('click', closeEditMode);
    saveButton.addEventListener('click', function() {
        updateCard();
        closeEditMode();
    });

    deleteButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this task?')) {
            contentCard.innerHTML = '<p class="to-do-description-para">This task has been deleted.</p>';
        }
    });
});
