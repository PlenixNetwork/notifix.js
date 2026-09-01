# 🔔 Notifix.js

Sick of dull, outdated notifications that feel like they belong in a Windows 95 popup?  
**Notifix.js** brings your interface to life — sleek, modern, mobile-friendly, and fully customizable. 😎

---

## ✨ Why Notifix.js

- 🎨 Supports multiple types of notifications (`success`, `error`, `warning`, `info`, `default`) for every mood
- 🧭 Choose from 6 display positions — because placement matters
- 🎞️ 4 smooth animations that make your messages pop like a pro
- 🌗 Light and dark themes to suit both sun chasers and night owls
- 📱 100% responsive — adapts like your bestie after two coffees
- ⏳ Optional progress bar that's more reliable than your morning routine
- ⚙️ Ultra customizable — tweak it like your gaming setup
- 🔁 Powerful `onClick` and `onClose` callbacks for full control
- 🚀 Zero dependencies — fast, lean, and ready to roll

---

## 👀 See Demo

Check out the live demo of Notifix.js in action:  
[Notifix.js Demo](https://plenixnetwork.github.io/notifix.js/)

---

## 📦 Installation

### Global Script
You can use this library via **jsDelivr CDN**:
```html
<script src="https://cdn.jsdelivr.net/gh/PlenixNetwork/notifix.js/dist/main.js"></script>
<script>
  window.notifix("Hello world! 😄");
</script>
```

### CommonJS
```bash
const notifix = require('notifixjs');
```

### ESModules
```bash
import notifix from 'notifixjs';
```

## 🚀 Basic Usage
```javascript
notifix("Just a casual hello... but stylish 😎");
notifix.success("Success! Like finding fries at the bottom of the bag 🍟");
notifix.error("Uh-oh! That wasn’t supposed to happen 💣");
notifix.warning("Careful! You're walking on thin ice 🧊");
notifix.info("FYI: Coffee makes your code better ☕");
```

## 🌍 Global Configuration
```javascript
notifix.setDefaults({
  duration: 6000,
  position: "top-center",
  theme: "light",
});

const config = notifix.getOptions(); // Check current settings
```

## ⚙️ Advanced Configuration
```javascript
notifix("Custom is my middle name", {
  type: "info",               // Type of notification
  position: "bottom-center",  // Where it shows
  duration: 5000,             // Time in milliseconds
  closable: true,             // Show close button
  animation: "zoom",          // Animation type
  theme: "dark",              // Theme: 'light' or 'dark'
  icon: "🧠",                  // Custom icon (optional)
  onClick: () => console.log("You clicked me! 😏"),
  onClose: () => console.log("Goodbye 😢"),
});
```

## 🛠️ Control Methods
```javascript
notifix.closeAll();  // Close all notifications
notifix.destroy();   // Remove everything including styles and containers
```

## 🎨 Style Customization
```html
.notifix-notification {
  border-radius: 12px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: #fff;
}
```

---

## 📄 License

This project is licensed under the **MIT License**.
