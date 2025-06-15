/**
 * Notifix.js - Notification Library
 * @version 1.0
 * @author Plenix Network
 * @license MIT
 *
 * Usage:
 * Global script: <script src="notifix.js"></script> then use window.notifix()
 * ES Module: import notifix from './notifix.js' then use notifix()
 * CommonJS: const notifix = require('./notifix.js') then use notifix()
 */

(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global = typeof globalThis !== "undefined" ? globalThis : global || self), (global.notifix = factory()));
})(this, function () {
  "use strict";

  const defaults = {
    type: "default",
    position: "top-right",
    duration: 4000,
    closable: true,
    animation: "slide",
    theme: "light",
    icon: null,
    onClick: null,
    onClose: null,
  };

  const styles = `
        .notifix-container {
            position: fixed;
            z-index: 10000;
            pointer-events: none;
        }
        .notifix-container.top-left { top: 20px; left: 20px; }
        .notifix-container.top-center { top: 20px; left: 50%; transform: translateX(-50%); }
        .notifix-container.top-right { top: 20px; right: 20px; }
        .notifix-container.bottom-left { bottom: 20px; left: 20px; }
        .notifix-container.bottom-center { bottom: 20px; left: 50%; transform: translateX(-50%); }
        .notifix-container.bottom-right { bottom: 20px; right: 20px; }
        .notifix-notification {
            display: flex;
            align-items: center;
            min-width: 300px;
            max-width: 500px;
            margin: 8px 0;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            line-height: 1.4;
            pointer-events: auto;
            cursor: pointer;
            border-left: 4px solid;
            position: relative;
            overflow: hidden;
            opacity: 0;
        }
        .notifix-notification:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .notifix-notification.light { background: #ffffff; color: #333333; }
        .notifix-notification.dark { background: #2d3748; color: #e2e8f0; }
        .notifix-notification.success { border-left-color: #4CAF50; }
        .notifix-notification.error { border-left-color: #f44336; }
        .notifix-notification.warning { border-left-color: #ff9800; }
        .notifix-notification.info { border-left-color: #2196F3; }
        .notifix-notification.default { border-left-color: #607d8b; }
        .notifix-notification.success.light { background: #f1f8e9; }
        .notifix-notification.error.light { background: #ffebee; }
        .notifix-notification.warning.light { background: #fff3e0; }
        .notifix-notification.info.light { background: #e3f2fd; }
        .notifix-icon { font-size: 18px; margin-right: 12px; flex-shrink: 0; }
        .notifix-content { flex: 1; word-wrap: break-word; }
        .notifix-close {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            margin-left: 12px;
            opacity: 0.7;
            transition: opacity 0.2s;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: inherit;
        }
        .notifix-close:hover { opacity: 1; }
        .notifix-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: rgba(0, 0, 0, 0.2);
            transition: width linear;
        }
        @keyframes notifix-slide-in-right {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes notifix-slide-in-left {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes notifix-slide-in-top {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes notifix-slide-in-bottom {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes notifix-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes notifix-bounce-in {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); opacity: 0.8; }
            70% { transform: scale(0.9); opacity: 0.9; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes notifix-zoom-in {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.1); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes notifix-exit {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        .notifix-notification.animate-slide.top-left { animation: notifix-slide-in-left 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .notifix-notification.animate-slide.top-center { animation: notifix-slide-in-top 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .notifix-notification.animate-slide.top-right { animation: notifix-slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .notifix-notification.animate-slide.bottom-left { animation: notifix-slide-in-left 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .notifix-notification.animate-slide.bottom-center { animation: notifix-slide-in-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .notifix-notification.animate-slide.bottom-right { animation: notifix-slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .notifix-notification.animate-fade { animation: notifix-fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .notifix-notification.animate-bounce { animation: notifix-bounce-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .notifix-notification.animate-zoom { animation: notifix-zoom-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .notifix-notification.removing { animation: notifix-exit 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        @media (max-width: 768px) {
            .notifix-notification {
                min-width: 280px;
                max-width: calc(100vw - 40px);
                margin: 6px 0;
                padding: 12px 16px;
                font-size: 13px;
            }
            .notifix-container {
                left: 20px !important;
                right: 20px !important;
                transform: none !important;
            }
            .notifix-container.top-center,
            .notifix-container.bottom-center {
                left: 20px !important;
                right: 20px !important;
            }
        }
  `;

  const defaultIcons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
    default: "💬",
  };

  let stylesInjected = false;
  const containers = {};

  // Inject CSS styles into the document
  function injectStyles() {
    if (stylesInjected || typeof document === "undefined") return;
    const styleSheet = document.createElement("style");
    styleSheet.id = "notifix-styles";
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    stylesInjected = true;
  }

  // Get or create notification container based on position
  function getContainer(position) {
    if (typeof document === "undefined") return null;
    if (!containers[position]) {
      containers[position] = document.createElement("div");
      containers[position].className = `notifix-container ${position}`;
      document.body.appendChild(containers[position]);
    }
    return containers[position];
  }

  // Close and remove a notification element
  function closeNotification(element, options) {
    if (!element || element.classList.contains("removing")) return;
    element.classList.add("removing");
    if (options.onClose) {
      try {
        options.onClose();
      } catch (e) {
        console.warn("Notifix: Error in onClose callback:", e);
      }
    }
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 300);
  }

  // Main function to create a notification
  function notifix(message, options = {}) {
    if (typeof document === "undefined") {
      console.warn("Notifix: Cannot be used outside the browser");
      return () => {};
    }
    injectStyles();
    if (!message || typeof message !== "string") {
      console.warn("Notifix: Message must be a string");
      return () => {};
    }
    if (typeof options === "string") {
      options = { type: options };
    }

    const config = { ...defaults, ...options };

    const validTypes = ["success", "error", "warning", "info", "default"];
    const validPositions = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"];
    const validAnimations = ["slide", "fade", "bounce", "zoom"];
    const validThemes = ["light", "dark"];

    config.type = validTypes.includes(config.type) ? config.type : "default";
    config.position = validPositions.includes(config.position) ? config.position : "top-right";
    config.animation = validAnimations.includes(config.animation) ? config.animation : "slide";
    config.theme = validThemes.includes(config.theme) ? config.theme : "light";
    config.duration = config.duration < 0 ? 0 : config.duration;

    const notification = document.createElement("div");
    notification.className = `notifix-notification ${config.type} ${config.theme} animate-${config.animation} ${config.position}`;

    // Build notification content
    let content = "";
    const icon = config.icon || defaultIcons[config.type] || defaultIcons.default;
    if (icon) {
      content += `<span class="notifix-icon">${icon}</span>`;
    }
    const escapedMessage = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    content += `<div class="notifix-content">${escapedMessage}</div>`;
    if (config.closable) {
      content += `<button class="notifix-close" type="button" aria-label="Close notification">×</button>`;
    }
    if (config.duration > 0) {
      content += `<div class="notifix-progress"></div>`;
    }
    notification.innerHTML = content;

    const container = getContainer(config.position);
    if (!container) {
      console.warn("Notifix: Container could not be created");
      return () => {};
    }

    container.appendChild(notification);
    notification.offsetHeight;

    if (config.onClick && typeof config.onClick === "function") {
      notification.addEventListener("click", (e) => {
        if (!e.target.classList.contains("notifix-close")) {
          try {
            config.onClick();
          } catch (e) {
            console.warn("Notifix: Error in onClick callback:", e);
          }
        }
      });
    }

    if (config.closable) {
      const closeBtn = notification.querySelector(".notifix-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          closeNotification(notification, config);
        });
      }
    }

    // Timer control and hover pause logic
    let timeoutId = null;
    let remainingTime = config.duration;
    let startTime = Date.now();
    let isPaused = false;

    if (config.duration > 0) {
      const progressBar = notification.querySelector(".notifix-progress");
      if (progressBar) {
        progressBar.style.width = "100%";
        progressBar.style.transition = `width ${config.duration}ms linear`;
        setTimeout(() => {
          progressBar.style.width = "0%";
        }, 10);
      }

      const startTimer = () => {
        if (remainingTime <= 0) return;
        startTime = Date.now();
        timeoutId = setTimeout(() => {
          closeNotification(notification, config);
        }, remainingTime);
      };

      const pauseTimer = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
          const elapsed = Date.now() - startTime;
          remainingTime = Math.max(0, remainingTime - elapsed);
          isPaused = true;

          if (progressBar) {
            progressBar.style.animationPlayState = "paused";
            const currentWidth = parseFloat(getComputedStyle(progressBar).width);
            const containerWidth = parseFloat(getComputedStyle(progressBar.parentElement).width);
            const percentage = (currentWidth / containerWidth) * 100;
            progressBar.style.transition = "none";
            progressBar.style.width = `${percentage}%`;
          }
        }
      };

      const resumeTimer = () => {
        if (isPaused && remainingTime > 0) {
          isPaused = false;
          if (progressBar) {
            progressBar.style.transition = `width ${remainingTime}ms linear`;
            setTimeout(() => {
              progressBar.style.width = "0%";
            }, 10);
          }
          startTimer();
        }
      };

      notification.addEventListener("mouseenter", pauseTimer);
      notification.addEventListener("mouseleave", resumeTimer);
      startTimer();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      closeNotification(notification, config);
    };
  }

  notifix.closeAll = function () {
    if (typeof document === "undefined") return;
    const notifications = document.querySelectorAll(".notifix-notification");
    notifications.forEach((notification) => {
      closeNotification(notification, {});
    });
  };

  notifix.setDefaults = function (newDefaults) {
    if (typeof newDefaults === "object" && newDefaults !== null) {
      Object.assign(defaults, newDefaults);
    }
  };

  notifix.getOptions = function () {
    return { ...defaults };
  };

  notifix.destroy = function () {
    if (typeof document === "undefined") return;
    notifix.closeAll();
    Object.values(containers).forEach((container) => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    });
    Object.keys(containers).forEach((key) => {
      delete containers[key];
    });
    const styleSheet = document.getElementById("notifix-styles");
    if (styleSheet) {
      styleSheet.parentNode.removeChild(styleSheet);
    }
    stylesInjected = false;
  };

  notifix.success = (message, options = {}) => notifix(message, { ...options, type: "success" });
  notifix.error = (message, options = {}) => notifix(message, { ...options, type: "error" });
  notifix.warning = (message, options = {}) => notifix(message, { ...options, type: "warning" });
  notifix.info = (message, options = {}) => notifix(message, { ...options, type: "info" });

  notifix.version = "1.0";

  return notifix;
});
