const exclude = <PrismaObject, Key extends keyof PrismaObject>(pobj: PrismaObject, ...keys: Key[]): PrismaObject => {
  for (let key of keys) {
    delete pobj[key];
  }
  return pobj;
};

export { exclude };