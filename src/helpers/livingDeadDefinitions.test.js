/* global test expect */
import {flipLivingDead, isLiving, isDead, returnDead, returnLiving} from './livingDeadDefinitions';

test('flipLivingDead', () => {
  expect(flipLivingDead(returnLiving())).toEqual(returnDead());
  expect(flipLivingDead(returnDead())).toEqual(returnLiving());
  expect(() => flipLivingDead('zombie')).toThrow();
  expect(() => flipLivingDead(0)).not.toThrow();
  expect(() => flipLivingDead(1)).not.toThrow();
});

test('returnLiving does so', () => {
  expect(returnLiving()).toBe(1);
});
test('returnDead does so', () => {
  expect(returnDead()).toBe(0);
});
test('isLiving returns whether cell is currently goliath', () => {
  expect(isLiving(1)).toBe(true);
});
test('isLiving returns whether cell is currently goliath', () => {
  expect(isLiving(0)).toBe(false);
});
test('isLiving returns whether cell is currently dead', () => {
  expect(isLiving(undefined)).toBe(false);
});
test('isDead returns whether cell is currently dead', () => {
  expect(isDead(1)).toBe(false);
});
test('isDead returns whether cell is currently dead', () => {
  expect(isDead(0)).toBe(true);
});
test('isDead returns whether cell is currently dead', () => {
  expect(isDead(undefined)).toBe(false);
});
