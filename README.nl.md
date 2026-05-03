# Goosse Dialog Module

Reusable JavaScript module for **dialogs and popups**.  
Built on top of **Bootstrap 5** (JS + CSS).

✅ No fixed HTML in layouts  
✅ On-demand DOM injection  
✅ Self-cleaning  
✅ Only **one active dialog at a time** (singleton guard)  
✅ Configurable icons (Tabler, Bootstrap, SVG, etc.)  
✅ MVC compatible  
✅ Production-first  

---

## 📁 Location

```text
public/goosse/dialog/
├── dialog.js
├── dialog.css
└── README.md
```

This module is intentionally placed in `public/`:
- it represents **client-side UI behavior**
- no business logic
- no server-side state

---

## 🔧 Requirements

- **Bootstrap 5.3.x (JS + CSS)**  
- Modern browser

> ⚠️ **Tabler JS is NOT used**  
> Bootstrap JS is explicitly loaded to make `bootstrap.Modal` available.

---

## 📦 Installation

### 1️⃣ Place files

```text
public/goosse/dialog/dialog.js
public/goosse/dialog/dialog.css
```

### 2️⃣ Load scripts in layout (once)

Example in `Views/layouts/admin.php`:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="public/goosse/dialog/dialog.js" defer></script>
<link rel="stylesheet" href="public/goosse/dialog/dialog.css">
```

✅ Bootstrap JS = only JS framework  
✅ No Tabler JS  
✅ No duplicate initialization  

***

## 🎯 Dialog types (important)

The dialog supports **four semantic types**.  
`type` determines **icon, color, and default button**.

| type      | Meaning            | Usage                   |
| --------- | ------------------ | ----------------------- |
| `info`    | Information        | Status, explanation     |
| `warning` | Confirmation needed| Logout, non-destructive |
| `danger`  | Destructive        | Delete, reset           |
| `success` | Success message    | Action completed        |

### ✅ Default

If no `type` is provided, the dialog uses:

    type = 'warning'

This is intentional: a confirmation is **not automatically destructive**.

***

## 🚀 Usage

### ✅ Logout (correct: `warning`)

```js
document.addEventListener('click', function (e) {
  const el = e.target.closest('.js-confirm-logout');
  if (!el) return;

  e.preventDefault();

  goosseDialog.confirm({
    type: 'warning',
    title: 'Logout',
    message: el.dataset.confirm || 'Are you sure you want to log out?',
    onConfirm: () => {
      window.location.href = el.href;
    }
  });
});
```

➡️ ⚠️ yellow icon  
➡️ yellow confirmation button  
➡️ clear "pay attention" message  

***

### ✅ Destructive action (correct: `danger`)

```js
goosseDialog.confirm({
  type: 'danger',
  title: 'Delete user',
  message: 'This action cannot be undone.',
  onConfirm: () => {
    window.location.href = 'admin/users/delete/42';
  }
});
```

➡️ 🔴 red icon  
➡️ red confirmation button  
➡️ serious warning  

***

### ✅ Info popup

```js
goosseDialog.confirm({
  type: 'info',
  title: 'Information',
  message: 'Your changes have been saved.'
});
```

➡️ ℹ️ blue icon  
➡️ OK button  
➡️ no stress  

***

### ✅ Success popup

```js
goosseDialog.confirm({
  type: 'success',
  title: 'Success',
  message: 'The action was performed successfully.'
});
```

***

## 🧠 Options

| Option        | Type      | Default         | Description |
| ------------- | --------- | --------------- | ----------- |
| `type`        | string    | `'warning'`      | `info`, `success`, `warning`, `danger` |
| `title`       | string    | `'Confirm'`     | Title of the dialog |
| `message`     | string    | `'Are you sure?'`| Message text |
| `icon`        | string    | `null`          | Custom icon HTML (overrides type icon) |
| `confirmText` | string    | `type-dependent`| Text on confirm button |
| `cancelText`  | string    | `'Cancel'`      | Text on cancel button (empty = no button) |
| `confirmClass`| string    | `type-dependent`| Bootstrap class for confirm button |
| `onConfirm`   | function  | `null`          | Callback on confirmation (supports Promises) |

## 🧠 Configuration (Icons & Feedback)

You can configure icons and feedback messages globally via the `config` object in a `<script>` tag in your HTML (e.g., in your footer or layout).

```html
<script>
  // Example: Switching to Bootstrap Icons
  goosseDialog.config.icons = {
    info: '<i class="bi bi-info-circle text-primary"></i>',
    warning: '<i class="bi bi-exclamation-triangle text-warning"></i>',
    danger: '<i class="bi bi-exclamation-octagon text-danger"></i>',
    success: '<i class="bi bi-check-circle text-success"></i>'
  };

  // Customize the warning message for double calls
  goosseDialog.config.duplicateWarning = 'A dialog is already active.';
</script>
```

By default, **Tabler Icons** are used.

---

## 🚀 API Methods

### ✅ `goosseDialog.confirm(options)`

Shows a dialog with confirmation and cancel options.

```js
goosseDialog.confirm({
  type: 'danger',
  title: 'Delete',
  message: 'This action cannot be undone.',
  onConfirm: () => { /* perform action */ }
});
```

### ✅ `goosseDialog.alert(options)`

Shows a simple popup with only an OK button.

```js
goosseDialog.alert({
  title: 'Info',
  message: 'Your changes have been saved.'
});
```

**Internally:** `alert` uses `confirm` with:
- `type: 'info'`
- `confirmText: 'OK'`
- `cancelText: ''` (no cancel button)

***

## 🧠 `data-confirm` and `dataset`

Dialog text usually comes from HTML:

```html
<a href="logout" class="js-confirm-logout" data-confirm="Are you sure you want to log out?">Logout</a>
```

In JS:

```js
el.dataset.confirm
```

➡️ `data-confirm` → `dataset.confirm`  
➡️ HTML wins over JS fallback  
➡️ Fully native browser API  

***

## 🎨 Icon Support

The `icon` option accepts **any valid HTML**.

### ✅ Supported

*   Tabler Icons webfont (`<i class="ti …">`)
*   Inline SVG
*   SVG / PNG / JPG via `<img>`

### Examples

```js
icon: '<i class="ti ti-alert-triangle text-warning"></i>'
```

```js
icon: 'public/icons/warning.svg'
```

***

## 🎨 Styling (dialog.css)

### Icon & text alignment

```css
.goosse-dialog-icon {
  font-size: 2rem;
  line-height: 1;
  display: flex;
  align-items: center;
}

.goosse-dialog-message {
  line-height: 1.4;
}
```

***

## 🔒 Security & Accessibility

*   ✅ Bootstrap handles ARIA & focus-trap
*   ✅ Built-in HTML escaping (XSS protection) for titles, messages, and button texts
*   ✅ No inline `eval`
*   ✅ Dialog = UX, **not security**
*   ✅ Server-side validation & CSRF remain mandatory

***

## ❌ What this module intentionally does NOT do

*   ❌ no AJAX
*   ❌ no POST requests
*   ❌ no business logic
*   ❌ no fixed HTML
*   ❌ no Tabler JS dependency

***

## Singleton Behavior (important)

*   The component allows **only one active dialog at a time**
*   Extra `confirm()` or `alert()` calls are ignored while a window is open
*   When a window is already open, feedback is shown via `goosseToast` (or via a standard `alert` if the toast module is not loaded)
*   After closing, the instance is properly cleaned up

➡️ Prevents stacked modals and UX confusion

***

## ✅ Architectural Choices

*   **Tabler = CSS theme**
*   **Bootstrap = JS behavior**
*   **Goosse Dialog = reusable UI module**
*   Type = intent, not just color

***

## ✅ Summary

*   ✅ `warning` is default (confirmation)
*   ✅ `danger` is explicitly destructive
*   ✅ `info` and `success` are informative
*   ✅ Fewer overrides needed
*   ✅ Consistent UX
*   ✅ Production-proof

**Use this as the standard for all dialogs.**

Herbruikbare JavaScript‑module voor **dialogen en popups**.  
Gebouwd bovenop **Bootstrap 5** (JS + CSS).

✅ Geen vaste HTML in layouts  
✅ On‑demand DOM injectie  
✅ Zelfopruimend  
✅ Slechts **één actieve dialog tegelijk** (singleton‑guard)
✅ Configureerbare iconen (Tabler, Bootstrap, SVG, etc.)
✅ MVC‑conform  
✅ Production‑first  

---

## 📁 Locatie


```text
public/goosse/dialog/
├── dialog.js
├── dialog.css
└── README.md


```

Deze module hoort bewust in `public/`:
- het is **client‑side UI‑gedrag**
- geen businesslogica
- geen server‑state

---

## 🔧 Vereisten

- **Bootstrap 5.3.x (JS + CSS)**  
- Moderne browser

> ⚠️ **Tabler JS wordt NIET gebruikt**  
> Bootstrap JS wordt expliciet geladen om `bootstrap.Modal` beschikbaar te hebben.

---

## 📦 Installatie

### 1️⃣ Bestanden plaatsen

```

public/goosse/dialog/dialog.js
public/goosse/dialog/dialog.css

````

### 2️⃣ Scripts laden in layout (1×)

Bijvoorbeeld in `Views/layouts/admin.php`:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="public/goosse/dialog/dialog.js" defer></script>
<link rel="stylesheet" href="public/goosse/dialog/dialog.css">
```

✅ Bootstrap JS = enige JS‑framework\
✅ Geen Tabler JS\
✅ Geen dubbele initialisatie

***

## 🎯 Dialog types (belangrijk)

De dialog ondersteunt **vier semantische types**.\
`type` bepaalt **icoon, kleur en standaardknop**.

| type      | Betekenis         | Gebruik                  |
| --------- | ----------------- | ------------------------ |
| `info`    | Informatie        | Status, uitleg           |
| `warning` | Bevestiging nodig | Logout, niet‑destructief |
| `danger`  | Destructief       | Delete, reset            |
| `success` | Succesmelding     | Actie geslaagd           |

### ✅ Standaard

Als `type` niet wordt meegegeven, gebruikt de dialog:

    type = 'warning'

Dat is bewust: een bevestiging is **niet automatisch destructief**.

***

## 🚀 Gebruik

### ✅ Logout (correct: `warning`)



```js
document.addEventListener('click', function (e) {
  const el = e.target.closest('.js-confirm-logout');
  if (!el) return;

  e.preventDefault();

  goosseDialog.confirm({
    type: 'warning',
    title: 'Uitloggen',
    message: el.dataset.confirm || 'Ben je zeker dat je wil uitloggen?',
    onConfirm: () => {
      window.location.href = el.href;
    }
  });
});
```

➡️ ⚠️ geel icoon\
➡️ gele bevestigingsknop\
➡️ duidelijke “opletten”-boodschap

***

### ✅ Destructieve actie (correct: `danger`)

```js
goosseDialog.confirm({
  type: 'danger',
  title: 'Gebruiker verwijderen',
  message: 'Deze actie kan niet ongedaan worden gemaakt.',
  onConfirm: () => {
    window.location.href = 'admin/users/delete/42';
  }
});
```

➡️ 🔴 rood icoon\
➡️ rode bevestigingsknop\
➡️ zware waarschuwing

***

### ✅ Info popup

```js
goosseDialog.confirm({
  type: 'info',
  title: 'Informatie',
  message: 'Je wijzigingen zijn opgeslagen.'
});
```

➡️ ℹ️ blauw icoon\
➡️ OK‑knop\
➡️ geen stress

***

### ✅ Success popup

```js
goosseDialog.confirm({
  type: 'success',
  title: 'Gelukt',
  message: 'De actie werd succesvol uitgevoerd.'
});
```

***

## 🧠 Opties

| Optie         | Type      | Standaard       | Beschrijving |
| ------------- | --------- | --------------- | ----------- |
| `type`        | string    | `'warning'`      | `info`, `success`, `warning`, `danger` |
| `title`       | string    | `'Bevestigen'`   | Titel van de dialog |
| `message`     | string    | `'Weet je het zeker?'` | Berichttekst |
| `icon`        | string    | `null`          | Custom icon HTML (override type icon) |
| `confirmText` | string    | `type-afhankelijk` | Tekst op bevestigingsknop |
| `cancelText`  | string    | `'Annuleren'`    | Tekst op annuleerknop (leeg = geen knop) |
| `confirmClass`| string    | `type-afhankelijk` | Bootstrap class voor bevestigingsknop |
| `onConfirm`   | function  | `null`          | Callback bij bevestiging (ondersteunt Promises) |

## 🧠 Configuratie (Iconen & Feedback)

Je kunt de iconen en feedbackberichten globaal configureren via het `config` object in een `<script>` tag in je HTML (bijv. in je footer of layout).

```html
<script>
  // Voorbeeld: Overschakelen naar Bootstrap Icons
  goosseDialog.config.icons = {
    info: '<i class="bi bi-info-circle text-primary"></i>',
    warning: '<i class="bi bi-exclamation-triangle text-warning"></i>',
    danger: '<i class="bi bi-exclamation-octagon text-danger"></i>',
    success: '<i class="bi bi-check-circle text-success"></i>'
  };

  // Pas het waarschuwingsbericht aan voor dubbele aanroepen
  goosseDialog.config.duplicateWarning = 'Er is al een dialoog actief.';
</script>
```

Standaard worden **Tabler Icons** gebruikt.

---

## 🚀 API Methods

### ✅ `goosseDialog.confirm(options)`

Toont een dialog met bevestiging en annuleer opties.

```js
goosseDialog.confirm({
  type: 'danger',
  title: 'Verwijderen',
  message: 'Deze actie kan niet ongedaan worden gemaakt.',
  onConfirm: () => { /* actie uitvoeren */ }
});
```

### ✅ `goosseDialog.alert(options)`

Toont een simpele popup met alleen OK knop.

```js
goosseDialog.alert({
  title: 'Info',
  message: 'Je wijzigingen zijn opgeslagen.'
});
```

**Intern:** `alert` gebruikt `confirm` met:
- `type: 'info'`
- `confirmText: 'OK'`
- `cancelText: ''` (geen annuleerknop)

***

## 🧠 `data-confirm` en `dataset`

De dialog‑tekst komt meestal uit HTML:

```html
<a href="logout" class="js-confirm-logout" data-confirm="Ben je zeker dat je wil uitloggen?">Uitloggen</a>
```

In JS:

```js
el.dataset.confirm
```

➡️ `data-confirm` → `dataset.confirm`  
➡️ HTML wint van JS fallback  
➡️ Volledig native browser‑API

***

## 🎨 Icon‑ondersteuning

De `icon`‑optie accepteert **elke geldige HTML**.

### ✅ Ondersteund

*   Tabler Icons webfont (`<i class="ti …">`)
*   Inline SVG
*   SVG / PNG / JPG via `<img>`

### Voorbeelden

```js
icon: '<i class="ti ti-alert-triangle text-warning"></i>'
```

```js
icon: 'public/icons/warning.svg'
```

***

## 🎨 Styling (dialog.css)

### Icon & tekst uitlijning

```css
.goosse-dialog-icon {
  font-size: 2rem;
  line-height: 1;
  display: flex;
  align-items: center;
}

.goosse-dialog-message {
  line-height: 1.4;
}
```

***

## 🔒 Security & Accessibility

*   ✅ Bootstrap regelt ARIA & focus‑trap
*   ✅ Ingebouwde HTML-escaping (XSS-beveiliging) voor titels, berichten en knopteksten
*   ✅ Geen inline `eval`
*   ✅ Dialog = UX, **geen security**
*   ✅ Server‑side validatie & CSRF blijven verplicht

***

## ❌ Wat deze module bewust NIET doet

*   ❌ geen AJAX
*   ❌ geen POST‑requests
*   ❌ geen businesslogica
*   ❌ geen vaste HTML
*   ❌ geen Tabler JS afhankelijkheid

***

## Singleton‑gedrag (belangrijk)

*   De component staat **slechts één actieve dialog tegelijk toe**
*   Extra `confirm()` of `alert()` calls worden genegeerd zolang er een venster openstaat
*   Wanneer er al een venster openstaat, wordt er een feedback-melding getoond via `goosseToast` (of via een standaard `alert` als de toast-module niet geladen is)
*   Na sluiten wordt de instance netjes opgeruimd

➡️ Voorkomt gestapelde modals en UX‑verwarring

***

## ✅ Architecturale keuzes

*   **Tabler = CSS‑theme**
*   **Bootstrap = JS‑gedrag**
*   **Goosse Dialog = herbruikbare UI‑module**
*   Type = intentie, niet alleen kleur

***

## ✅ Samenvatting

*   ✅ `warning` is standaard (bevestiging)
*   ✅ `danger` is expliciet destructief
*   ✅ `info` en `success` zijn informatief
*   ✅ Minder overrides nodig
*   ✅ Consistente UX
*   ✅ Production‑proof
