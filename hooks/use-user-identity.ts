"use client"

import { useState, useEffect } from "react"

export function useUserIdentity() {
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    // Check for existing ID
    let storedId = localStorage.getItem("vrai_quebec_user_id")

    if (!storedId) {
      // Generate new ID if none exists
      storedId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      localStorage.setItem("vrai_quebec_user_id", storedId)
    }

    setUserId(storedId)
  }, [])

  return userId
}
