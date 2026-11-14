import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  tiers,
  addOns,
  companySizes,
  undecidedTier,
  tierChoice,
  addOnChoice,
  formatEur,
} from './sponsoring.ts';

/** Intl uses no-break spaces in French numbers; compare with plain spaces. */
const plain = (text: string) => text.replace(/\s/g, ' ');

test('formatEur writes euros the French way', () => {
  assert.equal(plain(formatEur(2000)), '2 000 €');
  assert.equal(plain(formatEur(150)), '150 €');
});

test('tierChoice labels a tier with its price and places', () => {
  const or = tiers.find((t) => t.id === 'or')!;
  const choice = tierChoice(or);
  assert.deepEqual(
    { ...choice, label: plain(choice.label) },
    { id: 'or', label: 'Or · 2 000 € HT · 4 places' },
  );
});

test('addOnChoice labels an option with its price', () => {
  const afterparty = addOns.find((a) => a.id === 'afterparty')!;
  assert.equal(plain(addOnChoice(afterparty).label), 'Afterparty · 1 000 €');
});

test('every choice fits the API contract', () => {
  const all = [
    ...tiers.map(tierChoice),
    undecidedTier,
    ...addOns.map(addOnChoice),
    ...companySizes,
  ];
  for (const { id, label } of all) {
    assert.match(id, /^[a-z0-9-]{1,40}$/);
    assert.ok(label.length > 0 && label.length <= 120, label);
  }
  assert.equal(new Set(all.map((c) => c.id)).size, all.length, 'ids are unique');
});
