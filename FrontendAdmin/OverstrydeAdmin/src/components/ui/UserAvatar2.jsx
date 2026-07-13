import React from "react"

const getInitials = (user) => `${user.name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()

export const UserAvatar = ({ user }) => (
  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-base font-bold">
    {user.photo ? (
      <img src={user.photo} alt={`${user.name} ${user.last_name}`} className="h-full w-full object-cover" />
    ) : (
      getInitials(user)
    )}
  </div>
)
