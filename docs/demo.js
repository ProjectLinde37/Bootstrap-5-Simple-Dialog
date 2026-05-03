/* ==========================================================================
   Goosse Dialog – Demo
   ========================================================================== */

/* Info dialog */
document.getElementById('btn-info').addEventListener('click', () => {
    goosseDialog.confirm({
        type: 'info',
        title: 'Information',
        message: 'This is an informational dialog.'
    });
});

/* Warning dialog */
document.getElementById('btn-warning').addEventListener('click', () => {
    goosseDialog.confirm({
        type: 'warning',
        title: 'Please confirm',
        message: 'Are you sure you want to continue?',
        onConfirm: () => {
            alert('Confirmed (demo)');
        }
    });
});

/* Danger dialog */
document.getElementById('btn-danger').addEventListener('click', () => {
    goosseDialog.confirm({
        type: 'danger',
        title: 'Delete item',
        message: 'This action cannot be undone.',
        onConfirm: () => {
            alert('Item deleted (demo)');
        }
    });
});

/* Success dialog */
document.getElementById('btn-success').addEventListener('click', () => {
    goosseDialog.confirm({
        type: 'success',
        title: 'Success',
        message: 'The operation completed successfully.'
    });
});