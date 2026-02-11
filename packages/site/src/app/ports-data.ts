import rawPorts from '../data/ports.json';
import type { PortInfo } from './types';

const hasString = (value: unknown): value is string => typeof value === 'string';

const hasStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(hasString);

const isPortInfo = (value: unknown): value is PortInfo => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<PortInfo>;

  return (
    hasString(candidate.slug) &&
    hasString(candidate.packageName) &&
    hasString(candidate.displayName) &&
    hasString(candidate.description) &&
    hasString(candidate.version) &&
    hasStringArray(candidate.tags)
  );
};

export function parsePortsData(data: unknown): PortInfo[] {
  if (!Array.isArray(data)) {
    throw new Error('Invalid ports data: expected an array.');
  }

  for (const [index, item] of data.entries()) {
    if (!isPortInfo(item)) {
      throw new Error(`Invalid ports data at index ${index}.`);
    }
  }

  return data;
}

export const portList = parsePortsData(rawPorts);
