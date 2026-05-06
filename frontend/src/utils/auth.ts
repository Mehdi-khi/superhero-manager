export function getCurrentUser() {
  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
}

export function isAdmin() {
  return getCurrentUser()?.role === "admin";
}

export function isEditor() {
  return getCurrentUser()?.role === "editor";
}

export function canEdit() {
  const role = getCurrentUser()?.role;
  return role === "admin" || role === "editor";
}

export function canDelete() {
  return getCurrentUser()?.role === "admin";
}