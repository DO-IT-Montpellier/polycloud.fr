/**
 * Browser-side logic of the partner form (/partenaires), kept free of DOM code so it can be tested.
 * The payload matches the API contract of the `polycloud-sponsor-form` Worker (DO-IT-Montpellier/cloudflare).
 */
import type { Choice } from '../data/sponsoring';

export interface SponsorPayload {
  company: string;
  website: string;
  contactName: string;
  role: string;
  email: string;
  phone: string;
  size: Choice | undefined;
  tier: Choice | undefined;
  options: Choice[];
  twoYears: boolean;
  partner2026: boolean;
  message: string;
  turnstileToken: string;
}

/**
 * Turns the submitted form into the API payload. Radio and checkbox values are choice ids,
 * looked up in `choices` so the API receives the label the visitor saw.
 */
export function buildPayload(data: FormData, choices: Record<string, Choice>): SponsorPayload {
  const text = (name: string) => String(data.get(name) ?? '');
  const choice = (id: FormDataEntryValue | null) => (id === null ? undefined : choices[String(id)]);

  return {
    company: text('company'),
    website: text('website'),
    contactName: text('contactName'),
    role: text('role'),
    email: text('email'),
    phone: text('phone'),
    size: choice(data.get('size')),
    tier: choice(data.get('tier')),
    options: data.getAll('options').flatMap((id) => choice(id) ?? []),
    twoYears: data.has('twoYears'),
    partner2026: data.has('partner2026'),
    message: text('message'),
    turnstileToken: text('cf-turnstile-response'),
  };
}

/** Wraps `fn` so that calls made while a previous call is still running are ignored (double clicks). */
export function submitOnce<T>(fn: () => Promise<T>): () => Promise<T | undefined> {
  let pending = false;
  return async () => {
    if (pending) return undefined;
    pending = true;
    try {
      return await fn();
    } finally {
      pending = false;
    }
  };
}

/** The message shown when the API refuses the request for a reason other than invalid fields. */
export function errorMessage(status: number, body: unknown, email: string): string {
  const error =
    typeof body === 'object' && body !== null && 'error' in body ? body.error : undefined;
  if (status === 403 && error === 'turnstile') {
    return 'La vérification anti-robot a expiré, merci de réessayer.';
  }
  return `L'envoi a échoué. Réessayez, ou écrivez-nous à ${email}.`;
}

/** A message to show instead of sending, or null when the payload can be sent. */
export function checkBeforeSend(payload: SponsorPayload): string | null {
  // Turnstile fills its token a moment after the page loads, and again after each reset
  if (!payload.turnstileToken) {
    return 'Merci de patienter pendant la vérification anti-robot, puis réessayez.';
  }
  return null;
}
