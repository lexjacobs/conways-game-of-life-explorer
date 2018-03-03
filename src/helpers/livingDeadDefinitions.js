export function flipLivingDead(cell) {
  if (isLiving(cell)) {
    return returnDead();
  }
  if (isDead(cell)) {
    return returnLiving();
  }
  throw new Error('flipLivingDead received rogue cell type');
}

export function isDead(cell) {
  return cell === 0;
}

export function isLiving(cell) {
  return cell === 1;
}

export function returnDead() {
  return 0;
}

export function returnLiving() {
  return 1;
}
