export interface CommandPair {
  command: string;
  output: string;
}

export const TERMINAL_ENTRIES: CommandPair[] = [
  { command: "$ whoami", output: "Islam Kamel" },
  { command: "$ cat focus.txt", output: "Web apps, live data, and AI tools." },
  { command: '$ echo "say hello"', output: "contact@islamkamel.com" },
];

export const FULL_TERMINAL_LINES: string[] = [
  "$ whoami",
  "Islam Kamel",
  "$ cat focus.txt",
  "Web apps, live data, and AI tools.",
  '$ echo "say hello"',
  "contact@islamkamel.com",
];

export const TYPING_MIN_INTERVAL_MS = 40;
export const TYPING_MAX_INTERVAL_MS = 90;
export const PAUSE_AFTER_COMMAND_MS = 400;
export const FINAL_HOLD_MS = 3000;

export interface TerminalState {
  lines: string[];
  cursorLine: number | null;
  isComplete: boolean;
  currentPairIndex: number;
  phase: "typing" | "pause" | "hold" | "done";
  charIndex: number;
}

export function getInitialState(): TerminalState {
  return {
    lines: ["", "", "", "", "", ""],
    cursorLine: 0,
    isComplete: false,
    currentPairIndex: 0,
    phase: "typing",
    charIndex: 0,
  };
}

export function getCompletedState(): TerminalState {
  return {
    lines: [...FULL_TERMINAL_LINES],
    cursorLine: null,
    isComplete: true,
    currentPairIndex: TERMINAL_ENTRIES.length - 1,
    phase: "done",
    charIndex: TERMINAL_ENTRIES[TERMINAL_ENTRIES.length - 1].command.length,
  };
}

export function getRandomTypingDelay(randomFn = Math.random): number {
  return (
    Math.floor(
      randomFn() * (TYPING_MAX_INTERVAL_MS - TYPING_MIN_INTERVAL_MS + 1)
    ) + TYPING_MIN_INTERVAL_MS
  );
}

export function getNextTerminalState(
  currentState: TerminalState,
  randomFn = Math.random
): { nextState: TerminalState; delayMs: number } {
  if (currentState.phase === "done") {
    return { nextState: currentState, delayMs: 0 };
  }

  const { currentPairIndex, charIndex, phase, lines } = currentState;
  const currentEntry = TERMINAL_ENTRIES[currentPairIndex];

  if (phase === "typing") {
    const nextCharIndex = charIndex + 1;
    const commandText = currentEntry.command;
    const nextLines = [...lines];
    const cmdLineIndex = currentPairIndex * 2;

    nextLines[cmdLineIndex] = commandText.slice(0, nextCharIndex);

    if (nextCharIndex < commandText.length) {
      return {
        nextState: {
          ...currentState,
          lines: nextLines,
          cursorLine: cmdLineIndex,
          charIndex: nextCharIndex,
          phase: "typing",
        },
        delayMs: getRandomTypingDelay(randomFn),
      };
    }

    // Finished typing this command; enter 400ms pause before output appears
    return {
      nextState: {
        ...currentState,
        lines: nextLines,
        cursorLine: cmdLineIndex,
        charIndex: nextCharIndex,
        phase: "pause",
      },
      delayMs: PAUSE_AFTER_COMMAND_MS,
    };
  }

  if (phase === "pause") {
    // 400ms pause ended; reveal output line immediately
    const outputLineIndex = currentPairIndex * 2 + 1;
    const nextLines = [...lines];

    nextLines[outputLineIndex] = currentEntry.output;

    const hasNextPair = currentPairIndex + 1 < TERMINAL_ENTRIES.length;

    if (hasNextPair) {
      const nextPairIndex = currentPairIndex + 1;

      return {
        nextState: {
          lines: nextLines,
          cursorLine: nextPairIndex * 2,
          isComplete: false,
          currentPairIndex: nextPairIndex,
          phase: "typing",
          charIndex: 0,
        },
        delayMs: getRandomTypingDelay(randomFn),
      };
    }

    // All pairs finished; enter 3000ms hold with cursor block on final output line 5
    return {
      nextState: {
        lines: nextLines,
        cursorLine: 5,
        isComplete: false,
        currentPairIndex,
        phase: "hold",
        charIndex,
      },
      delayMs: FINAL_HOLD_MS,
    };
  }

  if (phase === "hold") {
    // 3000ms hold ended; reset to initial state and start typing again
    const initialState = getInitialState();

    return {
      nextState: initialState,
      delayMs: getRandomTypingDelay(randomFn),
    };
  }

  return { nextState: currentState, delayMs: 0 };
}

export interface Clock {
  now(): number;
  setTimeout(fn: () => void, ms: number): unknown;
  clearTimeout(id: unknown): void;
}

export interface TerminalLifecycleOptions {
  onUpdate: (state: TerminalState) => void;
  reducedMotion?: boolean;
  isIntersecting?: boolean;
  isDocumentHidden?: boolean;
  randomFn?: () => number;
  clock?: Clock;
}

export class TerminalLifecycleController {
  private state: TerminalState;
  private onUpdate: (state: TerminalState) => void;
  private isReduced: boolean;
  private isIntersecting: boolean;
  private isDocumentHidden: boolean;
  private randomFn: () => number;
  private clock: Clock;

  private timerId: unknown = null;
  private scheduledDeadline: number | null = null;
  private remainingMs: number = 0;
  private isPaused: boolean = false;
  private hasStarted: boolean = false;
  private isDestroyed: boolean = false;

  constructor(options: TerminalLifecycleOptions) {
    this.onUpdate = options.onUpdate;
    this.isReduced = options.reducedMotion ?? false;
    this.isIntersecting = options.isIntersecting ?? false;
    this.isDocumentHidden = options.isDocumentHidden ?? false;
    this.randomFn = options.randomFn ?? Math.random;
    this.clock = options.clock ?? {
      now: () => Date.now(),
      setTimeout: (fn, ms) => setTimeout(fn, ms),
      clearTimeout: (id) => clearTimeout(id as NodeJS.Timeout),
    };

    // Initialize with completed state for SSR and initial hydration
    this.state = getCompletedState();
  }

  public getState(): TerminalState {
    return this.state;
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }

  public getRemainingMs(): number {
    return this.remainingMs;
  }

  public getHasStarted(): boolean {
    return this.hasStarted;
  }

  public init(): void {
    // Only start if motion is enabled and artwork is visible
    if (!this.isReduced && this.isIntersecting && !this.isDocumentHidden) {
      this.startAnimation();
    }
  }

  private startAnimation(): void {
    this.hasStarted = true;
    this.isPaused = false;
    this.state = getInitialState();
    this.onUpdate(this.state);
    this.scheduleNextStep(this.getNextDelay());
  }

  private getNextDelay(): number {
    const { delayMs } = getNextTerminalState(this.state, this.randomFn);

    return delayMs;
  }

  private scheduleNextStep(delayMs: number): void {
    if (this.isDestroyed || this.isReduced) return;

    this.remainingMs = delayMs;
    this.scheduledDeadline = this.clock.now() + delayMs;

    this.timerId = this.clock.setTimeout(() => {
      this.timerId = null;
      this.scheduledDeadline = null;
      this.remainingMs = 0;

      const { nextState, delayMs: nextDelay } = getNextTerminalState(
        this.state,
        this.randomFn
      );

      this.state = nextState;
      this.onUpdate(nextState);

      if (!this.isPaused && !this.isDestroyed && !this.isReduced) {
        this.scheduleNextStep(nextDelay);
      }
    }, delayMs);
  }

  public setVisibility({
    isIntersecting,
    isDocumentHidden,
  }: {
    isIntersecting?: boolean;
    isDocumentHidden?: boolean;
  }): void {
    if (this.isDestroyed) return;

    if (isIntersecting !== undefined) this.isIntersecting = isIntersecting;
    if (isDocumentHidden !== undefined)
      this.isDocumentHidden = isDocumentHidden;

    const isVisible = this.isIntersecting && !this.isDocumentHidden;

    if (this.isReduced) {
      return;
    }

    if (isVisible) {
      if (!this.hasStarted) {
        this.startAnimation();
      } else if (this.isPaused) {
        this.resume();
      }
    } else {
      if (this.hasStarted && !this.isPaused) {
        this.pause();
      }
    }
  }

  public pause(): void {
    if (this.isPaused || this.isDestroyed) return;

    if (this.timerId !== null) {
      this.clock.clearTimeout(this.timerId);
      this.timerId = null;

      if (this.scheduledDeadline !== null) {
        const remaining = this.scheduledDeadline - this.clock.now();

        this.remainingMs = Math.max(0, remaining);
      }
    }

    this.isPaused = true;
  }

  public resume(): void {
    if (!this.isPaused || this.isDestroyed || this.isReduced) return;
    this.isPaused = false;

    // Preserve the exact remaining deadline
    const delayToUse = this.remainingMs;

    this.scheduleNextStep(delayToUse);
  }

  public setReducedMotion(isReduced: boolean): void {
    if (this.isDestroyed) return;

    this.isReduced = isReduced;

    if (isReduced) {
      if (this.timerId !== null) {
        this.clock.clearTimeout(this.timerId);
        this.timerId = null;
      }
      this.state = getCompletedState();
      this.isPaused = false;
      this.onUpdate(this.state);
    } else {
      if (this.isIntersecting && !this.isDocumentHidden) {
        this.startAnimation();
      } else {
        this.hasStarted = false;
        this.state = getCompletedState();
        this.onUpdate(this.state);
      }
    }
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.timerId !== null) {
      this.clock.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
