
document.addEventListener('DOMContentLoaded', function() {
  
    const dueDate = document.querySelector('time');
    const dueDateValue = dueDate.getAttribute('datetime');

    function calculateDaysRemaining() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const endDate = new Date(dueDateValue);
        endDate.setHours(0, 0, 0, 0);
        
        const timeDifference = endDate - today;
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        
        return daysRemaining;
    }

    const remainingSpan = document.querySelector('[data-testid="test-todo-time-remaining"] .showcase');
    const days = calculateDaysRemaining();
    remainingSpan.textContent = `${days} Days Remaining`;

    // Get checkbox and status elements
    const checkbox = document.querySelector('input[type="checkbox"]');
    const statusElement = document.querySelector('[data-testid="test-todo-status"]');

    // Add click event listener to checkbox
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            statusElement.textContent = 'Done';
        } else {
            statusElement.textContent = 'In Progress';
        }
    });
});