import loaders from './loaders';

const load = async () => {
  for (const i in loaders) {
    if (typeof loaders[i] !== 'function') {
      continue;
    }

    await loaders[i]();
  }
};

load();
