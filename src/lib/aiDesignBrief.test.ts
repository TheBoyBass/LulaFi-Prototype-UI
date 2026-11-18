import { describe, it, expect } from 'vitest';
import { buildAiDesignBrief } from './aiDesignBrief';
import {
  DESIGN_SYSTEM_CHANGELOG,
  DESIGN_SYSTEM_VERSION,
} from './designSystemVersion';

describe('AI design brief', () => {
  const brief = buildAiDesignBrief();
  it('carries the current standards version so a model knows which rules apply', () => {
    expect(DESIGN_SYSTEM_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
    expect(brief).toContain(`Standards version: v${DESIGN_SYSTEM_VERSION}`);
  });
  it('lists the current release in the version history, newest first', () => {
    expect(DESIGN_SYSTEM_CHANGELOG[0].version).toBe(DESIGN_SYSTEM_VERSION);
    expect(DESIGN_SYSTEM_CHANGELOG.at(-1)?.version).toBe('1.0.0');
    expect(DESIGN_SYSTEM_CHANGELOG[0].notes.length).toBeGreaterThan(0);
  });
  it('states icon teal and light-mode teal text values', () => {
    expect(brief).toContain('#4fe0ca');
    expect(brief.toLowerCase()).toContain('#061b19');
  });
  it('includes both light and dark token lists', () => {
    expect(brief).toContain('Colour tokens — light mode');
    expect(brief).toContain('Colour tokens — dark mode');
  });
  it('bans emojis and requires Inter', () => {
    expect(brief).toContain('No emojis');
    expect(brief).toContain('Inter only');
  });
});
