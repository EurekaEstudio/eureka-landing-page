import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={(import.meta as unknown as { env: Record<string, string> }).env.VITE_RECAPTCHA_SITE_KEY ?? ""}>
      <App />
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
)
