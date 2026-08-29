const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');

export async function registerAccount(payload: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errors = data.errors ? Object.values(data.errors).flat().join(' ') : null;
    throw new Error(errors || data.message || 'Unable to create your account.');
  }

  return data as { message: string };
}

export function signInWithGoogle() {
  window.location.assign(`${apiUrl}/auth/google`);
}
