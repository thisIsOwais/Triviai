// 
// app/sso-callback/page.tsx
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"

export default function SSO() {
  return <AuthenticateWithRedirectCallback />
}


