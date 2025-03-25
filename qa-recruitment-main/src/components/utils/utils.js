export const getProgressBarValue = (estimate) => {
    if (estimate >= 5) return 100;
    return estimate * 20;
};

export const getProgressBarVariant = (value) => {
    if (value <= 20) return 'info';
    else if (value <= 40) return 'dark';
    else if (value <= 60) return 'success';
    else if (value <= 80) return 'warning';
    else return 'danger';
};

export const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
        case 'Low': return 'secondary';
        case 'Medium': return 'primary';
        case 'High': return 'warning';
        case 'Critical': return 'danger';
        default: return 'secondary';
    }
};