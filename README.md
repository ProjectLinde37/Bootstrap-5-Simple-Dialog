# Goosse Dialog Module

Reusable JavaScript module for **dialogs and popups**.  
Built on top of **Bootstrap 5** (JS + CSS).

✅ No static HTML in layouts  
✅ On‑demand DOM injection  
✅ Self‑cleaning  
✅ Only **one active dialog at a time** (singleton guard)  
✅ Configurable icons (Tabler, Bootstrap, SVG, etc.)  
✅ MVC‑compliant  
✅ Production‑first  

---
## Demo

Live demo of the Goosse Dialog component:

👉 [View the Goosse Dialog demo](https://projectlinde37.github.io/Bootstrap-5-Simple-Dialog/)

The demo showcases:
- All dialog types (`info`, `warning`, `danger`, `success`)
- Confirm and cancel behaviour
- Singleton guard (only one dialog at a time)
- Bootstrap‑native modal behaviour

---

## 📁 Location

```text
public/goosse/dialog/
├── dialog.js
├── dialog.css
└── README.md
````

This module intentionally lives in `public/`:

*   it is **client‑side UI behaviour**
*   no business logic
*   no server state

***

## 🔧 Requirements

*   **Bootstrap 5.3.x (JS + CSS)**
*   Modern browser

> ⚠️ **Tabler JS is NOT used**\
> Bootstrap JS is explicitly loaded to provide `bootstrap.Modal`.

***

## 📦 Installation

### 1️⃣ Place the files

```text
public/goosse/dialog/dialog.js
public/goosse/dialog/dialog.css
```

### 2️⃣ Load scripts in your layout (once)

For example in `Views/layouts/admin.php`:



✅ Bootstrap JS is the only JS framework\
✅ No Tabler JS\
✅ No double initialisation

***

## 🎯 Dialog Types (important)

The dialog supports **four semantic types**.\
`type` determines the **icon, colour and default button**.

| type      | Meaning             | Typical use             |
| --------- | ------------------- | ----------------------- |
| `info`    | Information         | Status, explanation     |
| `warning` | Confirmation needed | Logout, non‑destructive |
| `danger`  | Destructive         | Delete, reset           |
| `success` | Success feedback    | Action completed        |

### ✅ Default

If `type` is not provided, the dialog uses:

```js
type = 'warning'
```

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

➡️ ⚠️ yellow icon\
➡️ yellow confirmation button\
➡️ clear “be careful” message

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

➡️ 🔴 red icon\
➡️ red confirmation button\
➡️ strong warning

***

### ✅ Info popup

```js
goosseDialog.confirm({
  type: 'info',
  title: 'Information',
  message: 'Your changes have been saved.'
});
```

➡️ ℹ️ blue icon\
➡️ OK button\
➡️ no stress

***

### ✅ Success popup

```js
goosseDialog.confirm({
  type: 'success',
  title: 'Success',
  message: 'The action was completed successfully.'
});
```

***

## 🧠 Options

| Option         | Type     | Default           | Description                             |
| -------------- | -------- | ----------------- | --------------------------------------- |
| `type`         | string   | `'warning'`       | `info`, `success`, `warning`, `danger`  |
| `title`        | string   | `'Confirm'`       | Dialog title                            |
| `message`      | string   | `'Are you sure?'` | Message text                            |
| `icon`         | string   | `null`            | Custom icon HTML (overrides type icon)  |
| `confirmText`  | string   | type‑dependent    | Confirmation button text                |
| `cancelText`   | string   | `'Cancel'`        | Cancel button text (empty = no button)  |
| `confirmClass` | string   | type‑dependent    | Bootstrap class for confirm button      |
| `onConfirm`    | function | `null`            | Callback on confirm (supports Promises) |

***

## 🧠 Configuration (Icons & Feedback)

Icons and feedback messages can be configured globally via the `config` object in a `<script>` tag in your HTML (e.g. footer or layout).



By default, **Tabler Icons** are used.

***

## 🚀 API Methods

### ✅ `goosseDialog.confirm(options)`

Displays a dialog with confirm and cancel actions.

```js
goosseDialog.confirm({
  type: 'danger',
  title: 'Delete',
  message: 'This action cannot be undone.',
  onConfirm: () => { /* perform action */ }
});
```

***

### ✅ `goosseDialog.alert(options)`

Displays a simple popup with only an OK button.

```js
goosseDialog.alert({
  title: 'Info',
  message: 'Your changes have been saved.'
});
```

**Internally:** `alert` uses `confirm` with:

*   `type: 'info'`
*   `confirmText: 'OK'`
*   `cancelText: ''` (no cancel button)

***

## 🧠 `data-confirm` and `dataset`

Dialog text often comes from HTML:



In JavaScript:

```js
el.dataset.confirm
```

➡️ `data-confirm` → `dataset.confirm`\
➡️ HTML overrides JS fallback\
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

## 🎨 Styling (`dialog.css`)

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

*   ✅ Bootstrap handles ARIA & focus‑trap
*   ✅ Built‑in HTML escaping (XSS protection) for titles, messages and button text
*   ✅ No inline `eval`
*   ✅ Dialogs are UX, **not security**
*   ✅ Server‑side validation & CSRF protection remain mandatory

***

## ❌ What this module deliberately does NOT do

*   ❌ no AJAX
*   ❌ no POST requests
*   ❌ no business logic
*   ❌ no static HTML
*   ❌ no Tabler JS dependency

***

## Singleton Behaviour (important)

*   The component allows **only one active dialog at a time**
*   Additional `confirm()` or `alert()` calls are ignored while a dialog is open
*   If a dialog is already active, feedback is shown via `goosseToast`
    (or a native `alert` if the toast module is not loaded)
*   After closing, the instance is properly cleaned up

➡️ Prevents stacked modals and UX confusion

***

## ✅ Architectural Decisions

*   **Tabler = CSS theme**
*   **Bootstrap = JS behaviour**
*   **Goosse Dialog = reusable UI module**
*   Type expresses intent, not just colour

***

## ✅ Summary

*   ✅ `warning` is the default (confirmation)
*   ✅ `danger` is explicitly destructive
*   ✅ `info` and `success` are informational
*   ✅ Fewer overrides needed
*   ✅ Consistent UX
*   ✅ Production‑proof

