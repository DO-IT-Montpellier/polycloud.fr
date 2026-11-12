import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPayload, submitOnce, errorMessage } from './sponsor-form.ts';

const choices = {
  lt50: { id: 'lt50', label: 'Moins de 50 salarié·e·s' },
  or: { id: 'or', label: 'Or · 2 000 € HT · 4 places' },
  pause: { id: 'pause', label: 'Pause café / déjeuner · 800 €' },
  afterparty: { id: 'afterparty', label: 'Afterparty · 1 000 €' },
};

function filledForm() {
  const data = new FormData();
  for (const [name, value] of Object.entries({
    company: 'Acme',
    website: 'https://acme.example',
    contactName: 'Ada Lovelace',
    role: 'CTO',
    email: 'ada@acme.example',
    phone: '',
    size: 'lt50',
    tier: 'or',
    twoYears: 'on',
    message: 'Bonjour',
    'cf-turnstile-response': 'token-123',
  })) {
    data.append(name, value);
  }
  data.append('options', 'pause');
  data.append('options', 'afterparty');
  return data;
}

test('buildPayload maps the form to the API contract', () => {
  assert.deepEqual(buildPayload(filledForm(), choices), {
    company: 'Acme',
    website: 'https://acme.example',
    contactName: 'Ada Lovelace',
    role: 'CTO',
    email: 'ada@acme.example',
    phone: '',
    size: choices.lt50,
    tier: choices.or,
    options: [choices.pause, choices.afterparty],
    twoYears: true,
    partner2026: false,
    message: 'Bonjour',
    turnstileToken: 'token-123',
  });
});

test('buildPayload leaves unanswered choices out', () => {
  const data = filledForm();
  data.delete('tier');
  data.delete('options');
  const payload = buildPayload(data, choices);
  assert.equal(payload.tier, undefined);
  assert.deepEqual(payload.options, []);
});

test('submitOnce ignores a second call while pending', async () => {
  let calls = 0;
  let finish = () => {};
  const submit = submitOnce(() => {
    calls++;
    return new Promise<void>((resolve) => (finish = resolve));
  });

  const first = submit();
  await submit();
  assert.equal(calls, 1);

  finish();
  await first;
  submit();
  assert.equal(calls, 2);
});

test('errorMessage explains what to do', () => {
  assert.equal(
    errorMessage(403, { ok: false, error: 'turnstile' }, 'sponsors@polycloud.fr'),
    'La vérification anti-robot a expiré, merci de réessayer.',
  );
  const fallback = "L'envoi a échoué. Réessayez, ou écrivez-nous à sponsors@polycloud.fr.";
  assert.equal(
    errorMessage(500, { ok: false, error: 'server' }, 'sponsors@polycloud.fr'),
    fallback,
  );
  assert.equal(errorMessage(0, null, 'sponsors@polycloud.fr'), fallback);
});
