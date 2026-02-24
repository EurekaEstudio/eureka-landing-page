export function openChatWithIntent(intent: string) {
  const w = window as unknown as Record<string, unknown>
  // Force-reveal the widget if it's still hidden (scroll trigger not reached yet)
  if (typeof w.showChatWidget === "function") {
    (w.showChatWidget as () => void)()
  }
  const container = document.getElementById("chat-widget-container")
  const bubble = document.getElementById("initial-message-bubble")
  const messages = document.getElementById("chat-messages")
  if (container) container.classList.add("is-open")
  if (bubble) bubble.classList.remove("show")
  // Remove the generic welcome message so ONLY the agent's response shows
  if (messages) {
    messages.querySelectorAll(".welcome-msg-item").forEach((el) => el.remove())
  }
  if (typeof w.sendToWebhook === "function") {
    ; (w as { sendToWebhook: (msg: string, isQR: boolean) => void }).sendToWebhook(intent, false)
  }
}


export function openChat() {
  const container = document.getElementById("chat-widget-container")
  const bubble = document.getElementById("initial-message-bubble")
  if (container) container.classList.add("is-open")
  if (bubble) bubble.classList.remove("show")
}
