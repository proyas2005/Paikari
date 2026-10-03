const apiUrl = '';

async function csrfHeaders() {
  const response = await fetch(`${apiUrl}/auth/csrf-token`, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error('Unable to start a secure session.');
  const data = await response.json() as { token: string };
  return { Accept: 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': data.token };
}

export async function registerAccount(payload: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: await csrfHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errors = data.errors ? Object.values(data.errors).flat().join(' ') : null;
    throw new Error(errors || data.message || 'Unable to create your account.');
  }

  return data as { message: string };
}

export async function loginAccount(payload: { email: string; password: string; remember: boolean }) {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: await csrfHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) throw new Error(data.message || 'Unable to sign in.');
  return data as { message: string };
}

export function signInWithGoogle() {
  window.location.assign(`${apiUrl}/auth/google`);
}
