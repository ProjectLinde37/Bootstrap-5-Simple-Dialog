/* ==========================================================================
   Goosse Dialog Module
   - Bootstrap 5 native
   - Geen vaste HTML
   - On-demand DOM injectie
   - Zelfopruimend
   ========================================================================== */

(function (window)
{
    'use strict';
    let activeInstance = null;

    const TYPE_CONFIG = {
        info: {
            confirmClass: 'btn-primary',
            confirmText: 'OK'
        },
        warning: {
            confirmClass: 'btn-warning',
            confirmText: 'Bevestigen'
        },
        danger: {
            confirmClass: 'btn-danger',
            confirmText: 'Verwijderen'
        },
        success: {
            confirmClass: 'btn-success',
            confirmText: 'OK'
        }
    };

    const CONFIG = {
        icons: {
            info: '<i class="ti ti-info-circle text-primary"></i>',
            warning: '<i class="ti ti-alert-triangle text-warning"></i>',
            danger: '<i class="ti ti-exclamation-circle text-danger"></i>',
            success: '<i class="ti ti-check text-success"></i>'
        },
        duplicateWarning: 'Er is al een dialoogvenster geopend.'
    };

    function createDialog(options)
    {
        // ✅ Singleton guard: slechts 1 dialog tegelijk
        if (activeInstance) {
            if (window.goosseToast) {
                window.goosseToast.show({
                    type: 'warning',
                    title: 'Aandacht',
                    message: CONFIG.duplicateWarning
                });
            } else {
                // Fallback als toast niet geladen is
                alert(CONFIG.duplicateWarning);
            }
            return;
        }

        const {
            title = 'Bevestigen',
            message = 'Weet je het zeker?',
            type = 'warning',
            icon = null,
            confirmText = null,
            cancelText = 'Annuleren',
            confirmClass = null,
            onConfirm = null
        } = options || {};

        const typeConfig = TYPE_CONFIG[type] || TYPE_CONFIG.danger;
        const modalId = 'goosse-dialog-' + (crypto.randomUUID?.() || Date.now());

        const finalIcon = icon !== null ? icon : (CONFIG.icons[type] || CONFIG.icons.warning);
        const finalConfirmClass = confirmClass || typeConfig.confirmClass;
        const finalConfirmText = confirmText || typeConfig.confirmText;

        /* ✅ Guard: foute configuratie vroeg detecteren */
        if (!finalConfirmText || !finalConfirmClass) {
            throw new Error('goosseDialog: confirm button configuration invalid');
        }


        const container = document.createElement('div');
        container.innerHTML = `
      <div class="modal fade goosse-dialog" id="${modalId}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title">${esc(title)}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"
                      aria-label="Sluiten"></button>
            </div>

            
<div class="modal-body d-flex align-items-center gap-3">
  ${finalIcon ? `<div class="goosse-dialog-icon">${finalIcon}</div>` : ''}
  <div class="goosse-dialog-message">${esc(message)}</div>
</div>


            <div class="modal-footer">
  ${cancelText ? `
    <button type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal">
      ${esc(cancelText)}
    </button>
  ` : ''}
  <button type="button"

          class="btn ${esc(finalConfirmClass)} goosse-confirm-btn">
    ${esc(finalConfirmText)}
  </button>
</div>


          </div>
        </div>
      </div>
    `;

        document.body.appendChild(container);

        const modalEl = document.getElementById(modalId);
        const modal = new bootstrap.Modal(modalEl, {
            backdrop: 'static',
            keyboard: false
        });

        const confirmBtn = modalEl.querySelector('.goosse-confirm-btn');

        confirmBtn.addEventListener('click', function ()
        {
            if (typeof onConfirm === 'function') {
                const result = onConfirm();

                if (result === false) return;

                if (result instanceof Promise) {
                    result.then(r =>
                    {
                        if (r !== false) modal.hide();
                    });
                    return;
                }
            }

            modal.hide();
        });

        modalEl.addEventListener('hidden.bs.modal', function ()
        {
            activeInstance = null;
            container.remove();
        });

        modal.show();
        activeInstance = modal;
    }

    /* ==========================
       Helpers
       ========================== */

    /**
     * Eenvoudige HTML escaping voor veiligheid (XSS)
     */
    function esc(str = '')
    {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /* ==========================
       Publieke API
       ========================== */

    window.goosseDialog = {

        config: CONFIG,

        confirm(options)
        {
            createDialog(options);
        },

        alert(options)
        {
            createDialog({
                title: options?.title || 'Info',
                message: options?.message || '',
                confirmText: 'OK',
                cancelText: '',
                confirmClass: 'btn-primary',
                onConfirm: null
            });
        }

    };

})(window);