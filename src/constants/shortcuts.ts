export interface Shortcut {
  key: string;
  code?: string;
  ctrlOrMeta?: boolean;
  shift?: boolean;
}

export const SHORTCUTS = {
  EXPLORER: {
    key: 'e',
    code: 'KeyE',
    ctrlOrMeta: true,
    shift: true
  } as Shortcut,
  SEARCH: { key: 'f', code: 'KeyF', ctrlOrMeta: true, shift: true } as Shortcut,
  EXTENSIONS: {
    key: 'x',
    code: 'KeyX',
    ctrlOrMeta: true,
    shift: true
  } as Shortcut,
  SETTINGS: {
    key: ',',
    code: 'Comma',
    ctrlOrMeta: true,
    shift: false
  } as Shortcut,
  COMMAND_PALETTE_P: {
    key: 'p',
    code: 'KeyP',
    ctrlOrMeta: true,
    shift: false
  } as Shortcut,
  COMMAND_PALETTE_K: {
    key: 'k',
    code: 'KeyK',
    ctrlOrMeta: true,
    shift: false
  } as Shortcut,
  TERMINAL: {
    key: 'j',
    code: 'KeyJ',
    ctrlOrMeta: true,
    shift: false
  } as Shortcut,
  ESCAPE: {
    key: 'Escape',
    code: 'Escape',
    ctrlOrMeta: false,
    shift: false
  } as Shortcut,
  UP: {
    key: 'ArrowUp',
    code: 'ArrowUp',
    ctrlOrMeta: false,
    shift: false
  } as Shortcut,
  DOWN: {
    key: 'ArrowDown',
    code: 'ArrowDown',
    ctrlOrMeta: false,
    shift: false
  } as Shortcut,
  ENTER: {
    key: 'Enter',
    code: 'Enter',
    ctrlOrMeta: false,
    shift: false
  } as Shortcut
};

/**
 * Checks if a given KeyboardEvent matches the specified shortcut
 */
export const checkShortcut = (e: KeyboardEvent, shortcut: Shortcut) => {
  const isMac =
    typeof navigator !== 'undefined' &&
    (navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
      navigator.userAgent.toUpperCase().indexOf('MAC') >= 0);

  const isCtrlOrMetaPressed = isMac ? e.metaKey : e.ctrlKey;

  // If shortcut explicitly requires ctrlOrMeta, ensure it matches
  if (
    shortcut.ctrlOrMeta !== undefined &&
    !!shortcut.ctrlOrMeta !== isCtrlOrMetaPressed
  ) {
    return false;
  }

  // If shortcut explicitly requires shift, ensure it matches
  if (shortcut.shift !== undefined && !!shortcut.shift !== e.shiftKey) {
    return false;
  }

  // Check key or code match
  if (
    e.key.toLowerCase() === shortcut.key.toLowerCase() ||
    e.code === shortcut.code
  ) {
    return true;
  }

  return false;
};
