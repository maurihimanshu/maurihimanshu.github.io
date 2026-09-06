import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  executeCommand,
  getCompletions,
  CommandContext,
  AVAILABLE_COMMANDS,
} from './cliCommands';

describe('cliCommands', () => {
  let mockContext: CommandContext;

  beforeEach(() => {
    mockContext = {
      theme: 'dark',
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
      closeTerminal: vi.fn(),
      clearBuffer: vi.fn(),
    };
  });

  describe('getCompletions', () => {
    it('returns all commands when input is empty or whitespace', () => {
      expect(getCompletions('')).toEqual([...AVAILABLE_COMMANDS]);
      expect(getCompletions('   ')).toEqual([...AVAILABLE_COMMANDS]);
    });

    it('filters commands matching prefix case-insensitively', () => {
      expect(getCompletions('sk')).toEqual(['skills']);
      expect(getCompletions('EX')).toEqual(['experience', 'exit']);
      expect(getCompletions('nonexistent')).toEqual([]);
    });
  });

  describe('executeCommand', () => {
    it('returns empty array for empty or whitespace-only inputs', () => {
      expect(executeCommand('', mockContext)).toEqual([]);
      expect(executeCommand('   ', mockContext)).toEqual([]);
    });

    it('handles help command', () => {
      const result = executeCommand('help', mockContext);
      expect(result).toHaveLength(1);
      expect(result![0].type).toBe('output');
    });

    it('handles about and bio aliases', () => {
      const resultAbout = executeCommand('about', mockContext);
      expect(resultAbout).toHaveLength(1);
      expect(resultAbout![0].type).toBe('output');

      const resultBio = executeCommand('bio', mockContext);
      expect(resultBio).toHaveLength(1);
      expect(resultBio![0].type).toBe('output');
    });

    it('handles skills command', () => {
      const result = executeCommand('skills', mockContext);
      expect(result).toHaveLength(1);
      expect(result![0].type).toBe('output');
    });

    it('handles experience command', () => {
      const result = executeCommand('experience', mockContext);
      expect(result).toHaveLength(1);
      expect(result![0].type).toBe('output');
    });

    it('handles projects command', () => {
      const result = executeCommand('projects', mockContext);
      expect(result).toHaveLength(1);
      expect(result![0].type).toBe('output');
    });

    it('handles docs command', () => {
      const result = executeCommand('docs', mockContext);
      expect(result).toHaveLength(1);
      expect(result![0].type).toBe('output');
    });

    it('handles certs and certifications aliases', () => {
      const resultCerts = executeCommand('certs', mockContext);
      expect(resultCerts).toHaveLength(1);
      expect(resultCerts![0].type).toBe('output');

      const resultCertifications = executeCommand('certifications', mockContext);
      expect(resultCertifications).toHaveLength(1);
      expect(resultCertifications![0].type).toBe('output');
    });

    it('handles patents command', () => {
      const result = executeCommand('patents', mockContext);
      expect(result).toHaveLength(1);
      expect(result![0].type).toBe('output');
    });

    it('handles contact command', () => {
      const result = executeCommand('contact', mockContext);
      expect(result).toHaveLength(1);
      expect(result![0].type).toBe('output');
    });

    it('handles theme command with options (status, dark, light, toggle)', () => {
      // Current theme status
      const resultStatus = executeCommand('theme', mockContext);
      expect(resultStatus).toHaveLength(1);
      expect(resultStatus![0].type).toBe('output');

      // Set dark
      const resultDark = executeCommand('theme dark', mockContext);
      expect(resultDark).toHaveLength(1);
      expect(mockContext.setTheme).toHaveBeenCalledWith('dark');

      // Set light
      const resultLight = executeCommand('theme light', mockContext);
      expect(resultLight).toHaveLength(1);
      expect(mockContext.setTheme).toHaveBeenCalledWith('light');

      // Toggle theme when dark
      const resultToggleDark = executeCommand('theme toggle', mockContext);
      expect(resultToggleDark).toHaveLength(1);
      expect(mockContext.toggleTheme).toHaveBeenCalled();

      // Toggle theme when light (covers both branches of nextTheme)
      const resultToggleLight = executeCommand('theme toggle', {
        ...mockContext,
        theme: 'light',
      });
      expect(resultToggleLight).toHaveLength(1);
    });

    it('handles whoami command', () => {
      const result = executeCommand('whoami', mockContext);
      expect(result).toHaveLength(1);
      expect(result![0].type).toBe('output');
    });

    it('handles date command', () => {
      const result = executeCommand('date', mockContext);
      expect(result).toHaveLength(1);
      expect(result![0].type).toBe('output');
    });

    it('handles echo command with multiple arguments', () => {
      const result = executeCommand('echo Hello Enterprise CLI', mockContext);
      expect(result).toHaveLength(1);
      expect(result![0].type).toBe('output');
    });

    it('handles sudo easter egg', () => {
      const result = executeCommand('sudo rm -rf /', mockContext);
      expect(result).toHaveLength(1);
      expect(result![0].type).toBe('error');
    });

    it('handles clear and cls commands by invoking clearBuffer', () => {
      const resultClear = executeCommand('clear', mockContext);
      expect(resultClear).toEqual([]);
      expect(mockContext.clearBuffer).toHaveBeenCalledTimes(1);

      const resultCls = executeCommand('cls', mockContext);
      expect(resultCls).toEqual([]);
      expect(mockContext.clearBuffer).toHaveBeenCalledTimes(2);
    });

    it('handles exit and quit commands by invoking closeTerminal', () => {
      const resultExit = executeCommand('exit', mockContext);
      expect(resultExit).toEqual([]);
      expect(mockContext.closeTerminal).toHaveBeenCalledTimes(1);

      const resultQuit = executeCommand('quit', mockContext);
      expect(resultQuit).toEqual([]);
      expect(mockContext.closeTerminal).toHaveBeenCalledTimes(2);
    });

    it('handles unknown command with error entry', () => {
      const result = executeCommand('unknowncmd', mockContext);
      expect(result).toHaveLength(1);
      expect(result![0].type).toBe('error');
    });
  });
});
