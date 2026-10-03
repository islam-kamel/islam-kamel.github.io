import assert from "node:assert/strict";
import {
  TERMINAL_ENTRIES,
  FULL_TERMINAL_LINES,
  TYPING_MIN_INTERVAL_MS,
  TYPING_MAX_INTERVAL_MS,
  PAUSE_AFTER_COMMAND_MS,
  FINAL_HOLD_MS,
  getInitialState,
  getCompletedState,
  getRandomTypingDelay,
  getNextTerminalState,
  TerminalLifecycleController,
} from "../lib/terminal-progression.ts";

console.log(
  "Checking terminal progression logic, 3000ms hold, and lifecycle controller..."
);

// 1. Initial State invariants
const initial = getInitialState();
assert.equal(initial.lines.length, 6, "Initial state must have 6 lines");
assert.deepEqual(
  initial.lines,
  ["", "", "", "", "", ""],
  "Initial state lines must all be empty"
);
assert.equal(initial.cursorLine, 0, "Initial cursor must be on line 0");
assert.equal(initial.isComplete, false, "Initial state must not be complete");
assert.equal(initial.phase, "typing", "Initial phase must be typing");
assert.equal(initial.charIndex, 0, "Initial charIndex must be 0");

// 2. Completed State invariants (Reduced motion / static view)
const completed = getCompletedState();
assert.equal(completed.lines.length, 6, "Completed state must have 6 lines");
assert.deepEqual(
  completed.lines,
  FULL_TERMINAL_LINES,
  "Completed state lines must match FULL_TERMINAL_LINES"
);
assert.equal(
  completed.cursorLine,
  null,
  "Completed state (reduced motion) cursorLine must be null"
);
assert.equal(
  completed.isComplete,
  true,
  "Completed state must be marked complete"
);
assert.equal(completed.phase, "done", "Completed state phase must be done");

// 3. Typing interval boundaries
for (let i = 0; i < 200; i++) {
  const delay = getRandomTypingDelay();
  assert(
    delay >= TYPING_MIN_INTERVAL_MS && delay <= TYPING_MAX_INTERVAL_MS,
    `Typing delay ${delay} outside range [${TYPING_MIN_INTERVAL_MS}, ${TYPING_MAX_INTERVAL_MS}]`
  );
}

// 4. Progression through commands, 400ms pause, and final 3000ms hold
let state = getInitialState();
// Pair 0 command typing
while (state.phase === "typing" && state.currentPairIndex === 0) {
  const { nextState } = getNextTerminalState(state, () => 0.5);
  state = nextState;
}
assert.equal(state.phase, "pause", "Command 0 must enter pause phase");
assert.equal(state.lines[0], "$ whoami");

// Pause reveal output 0
const afterPause0 = getNextTerminalState(state, () => 0.5);
assert.equal(afterPause0.nextState.lines[1], "Islam Kamel");
assert.equal(afterPause0.nextState.phase, "typing");
assert.equal(afterPause0.nextState.currentPairIndex, 1);
state = afterPause0.nextState;

// Fast forward through Pair 1 and Pair 2 until hold phase
while (state.phase !== "hold") {
  const { nextState } = getNextTerminalState(state, () => 0.5);
  state = nextState;
}

// Verify 3000ms Hold state:
assert.equal(state.phase, "hold", "Must enter hold phase after final output");
assert.deepEqual(
  state.lines,
  FULL_TERMINAL_LINES,
  "All 6 lines must be fully displayed during hold"
);
assert.equal(
  state.cursorLine,
  5,
  "Cursor block must sit on line 5 after the email during hold"
);

// Verify transition out of hold: resets immediately to initial state!
const afterHold = getNextTerminalState(state, () => 0.5);
assert.deepEqual(
  afterHold.nextState.lines,
  ["", "", "", "", "", ""],
  "Text must clear immediately upon hold completion to restart cycle"
);
assert.equal(afterHold.nextState.cursorLine, 0, "Cursor must reset to line 0");
assert.equal(afterHold.nextState.phase, "typing", "Must restart typing cycle");

// 5. Deterministic Lifecycle Controller with FakeClock
class FakeClock {
  constructor() {
    this.currentTime = 1000;
    this.timers = new Map();
    this.nextId = 1;
  }

  now() {
    return this.currentTime;
  }

  setTimeout(fn, ms) {
    const id = this.nextId++;
    this.timers.set(id, { fn, runAt: this.currentTime + ms });
    return id;
  }

  clearTimeout(id) {
    this.timers.delete(id);
  }

  advance(ms) {
    this.currentTime += ms;
    let ranAny = true;
    while (ranAny) {
      ranAny = false;
      const readyTimers = [];
      for (const [id, timer] of this.timers.entries()) {
        if (timer.runAt <= this.currentTime) {
          readyTimers.push({ id, ...timer });
        }
      }
      readyTimers.sort((a, b) => a.runAt - b.runAt);
      for (const timer of readyTimers) {
        if (this.timers.has(timer.id)) {
          this.timers.delete(timer.id);
          ranAny = true;
          timer.fn();
        }
      }
    }
  }

  hasActiveTimers() {
    return this.timers.size > 0;
  }
}

// 5A: Offscreen on mount does NOT start or reset animation
{
  const clock = new FakeClock();
  const ctrl = new TerminalLifecycleController({
    onUpdate: () => {},
    isIntersecting: false,
    isDocumentHidden: false,
    reducedMotion: false,
    clock,
  });

  ctrl.init();
  assert.equal(
    ctrl.getHasStarted(),
    false,
    "Must not start animation when offscreen"
  );
  assert.deepEqual(
    ctrl.getState().lines,
    FULL_TERMINAL_LINES,
    "Must preserve completed lines when offscreen"
  );
  clock.advance(5000);
  assert.equal(
    ctrl.getHasStarted(),
    false,
    "Must remain unstarted while offscreen"
  );
  ctrl.destroy();
}

// 5B: Entering viewport starts animation
{
  const clock = new FakeClock();
  const ctrl = new TerminalLifecycleController({
    onUpdate: () => {},
    isIntersecting: false,
    isDocumentHidden: false,
    reducedMotion: false,
    clock,
    randomFn: () => 0.5,
  });

  ctrl.init();
  assert.equal(ctrl.getHasStarted(), false);

  // Scroll into view
  ctrl.setVisibility({ isIntersecting: true });
  assert.equal(
    ctrl.getHasStarted(),
    true,
    "Must start animation upon becoming visible"
  );
  assert.equal(
    ctrl.getState().lines[0],
    "",
    "Must reset to initial state on start"
  );
  ctrl.destroy();
}

// 5C: Deadline preservation during typing step interruption
{
  const clock = new FakeClock();
  const ctrl = new TerminalLifecycleController({
    onUpdate: () => {},
    isIntersecting: true,
    isDocumentHidden: false,
    reducedMotion: false,
    clock,
    randomFn: () => 0.5,
  });

  ctrl.init();
  const initialDelay = ctrl.getRemainingMs();
  assert(initialDelay >= 40 && initialDelay <= 90);

  // Advance by 25ms
  clock.advance(25);
  // User scrolls away (offscreen)
  ctrl.setVisibility({ isIntersecting: false });
  assert.equal(ctrl.getIsPaused(), true, "Controller must be paused");
  const remaining = ctrl.getRemainingMs();
  assert.equal(
    remaining,
    initialDelay - 25,
    "Remaining typing delay must be preserved exactly"
  );

  // Advance 10 seconds while offscreen: state must NOT advance
  const snapshot = { ...ctrl.getState() };
  clock.advance(10000);
  assert.deepEqual(
    ctrl.getState(),
    snapshot,
    "State must not change while paused"
  );

  // User scrolls back into view
  ctrl.setVisibility({ isIntersecting: true });
  assert.equal(ctrl.getIsPaused(), false, "Controller must resume");

  // Advance remaining - 1ms: should NOT have executed yet
  clock.advance(remaining - 1);
  assert.deepEqual(
    ctrl.getState(),
    snapshot,
    "Step must not fire before exact remaining deadline"
  );

  // Advance final 1ms: step fires!
  clock.advance(1);
  assert.notDeepEqual(
    ctrl.getState(),
    snapshot,
    "Step must fire precisely at deadline"
  );
  ctrl.destroy();
}

// 5D: Deadline preservation during 400ms command pause
{
  const clock = new FakeClock();
  const ctrl = new TerminalLifecycleController({
    onUpdate: () => {},
    isIntersecting: true,
    isDocumentHidden: false,
    reducedMotion: false,
    clock,
    randomFn: () => 0.5,
  });

  ctrl.init();
  while (ctrl.getState().lines[0] !== "$ whoami") {
    clock.advance(ctrl.getRemainingMs());
  }

  assert.equal(ctrl.getState().phase, "pause", "Must be in 400ms pause phase");
  assert.equal(ctrl.getRemainingMs(), 400, "Pause must be scheduled for 400ms");

  // Advance 150ms into the 400ms pause
  clock.advance(150);
  ctrl.setVisibility({ isDocumentHidden: true });
  assert.equal(ctrl.getIsPaused(), true);
  assert.equal(
    ctrl.getRemainingMs(),
    250,
    "Remaining pause must be exactly 250ms"
  );

  // Advance 20 seconds while hidden
  clock.advance(20000);
  assert.equal(
    ctrl.getState().lines[1],
    "",
    "Output line 1 must not appear while tab is hidden"
  );

  // Tab becomes visible again
  ctrl.setVisibility({ isDocumentHidden: false });
  assert.equal(ctrl.getIsPaused(), false);

  clock.advance(249);
  assert.equal(
    ctrl.getState().lines[1],
    "",
    "Output line 1 must not appear before remaining 250ms expires"
  );

  clock.advance(1);
  assert.equal(
    ctrl.getState().lines[1],
    TERMINAL_ENTRIES[0].output,
    "Output must appear immediately once remaining pause deadline expires"
  );
  ctrl.destroy();
}

// 5E: Exact 3000ms Hold and Cycle Reset Verification
{
  const clock = new FakeClock();
  let latestState = null;
  const ctrl = new TerminalLifecycleController({
    onUpdate: (s) => {
      latestState = s;
    },
    isIntersecting: true,
    isDocumentHidden: false,
    reducedMotion: false,
    clock,
    randomFn: () => 0.5,
  });

  ctrl.init();

  // Fast-forward until entering hold phase
  while (ctrl.getState().phase !== "hold") {
    clock.advance(ctrl.getRemainingMs());
  }

  assert.equal(ctrl.getState().phase, "hold");
  assert.equal(ctrl.getRemainingMs(), FINAL_HOLD_MS, "Hold must be 3000ms");
  assert.deepEqual(ctrl.getState().lines, FULL_TERMINAL_LINES);
  assert.equal(ctrl.getState().cursorLine, 5, "Cursor block must be on line 5");

  // Advance 1000ms into hold: still holding
  clock.advance(1000);
  assert.equal(ctrl.getState().phase, "hold");
  assert.deepEqual(ctrl.getState().lines, FULL_TERMINAL_LINES);

  // User switches tab (hidden) at 1000ms into the hold
  ctrl.setVisibility({ isDocumentHidden: true });
  assert.equal(ctrl.getIsPaused(), true);
  assert.equal(
    ctrl.getRemainingMs(),
    2000,
    "Remaining hold time must be exactly 2000ms"
  );

  // Wait 15 seconds in background: must NOT clear text
  clock.advance(15000);
  assert.deepEqual(
    ctrl.getState().lines,
    FULL_TERMINAL_LINES,
    "Text must remain visible during pause"
  );

  // User returns to tab
  ctrl.setVisibility({ isDocumentHidden: false });
  assert.equal(ctrl.getIsPaused(), false);

  // Advance 1999ms: all lines still displayed
  clock.advance(1999);
  assert.deepEqual(ctrl.getState().lines, FULL_TERMINAL_LINES);

  // Advance final 1ms: exactly 3000ms hold expires!
  clock.advance(1);
  assert.deepEqual(
    ctrl.getState().lines,
    ["", "", "", "", "", ""],
    "All lines must clear immediately upon hold completion to restart cycle"
  );
  assert.equal(ctrl.getState().cursorLine, 0, "Cursor must return to line 0");
  assert.equal(ctrl.getState().phase, "typing", "Cycle must restart typing");

  ctrl.destroy();
}

// 5F: Live reduced-motion toggling
{
  const clock = new FakeClock();
  const ctrl = new TerminalLifecycleController({
    onUpdate: () => {},
    isIntersecting: true,
    isDocumentHidden: false,
    reducedMotion: false,
    clock,
    randomFn: () => 0.5,
  });

  ctrl.init();
  clock.advance(100);
  assert.notDeepEqual(ctrl.getState().lines, FULL_TERMINAL_LINES);

  // Enable reduced motion: immediately shows static full lines with no cursor
  ctrl.setReducedMotion(true);
  assert.equal(
    ctrl.getState().cursorLine,
    null,
    "Reduced motion must have no cursor"
  );
  assert.deepEqual(
    ctrl.getState().lines,
    FULL_TERMINAL_LINES,
    "Reduced motion must show full lines"
  );
  assert.equal(
    clock.hasActiveTimers(),
    false,
    "Reduced motion must cancel active timers"
  );

  // Restore normal motion while visible: restarts animation from start
  ctrl.setReducedMotion(false);
  assert.equal(
    ctrl.getHasStarted(),
    true,
    "Restoring normal motion while visible must restart"
  );
  assert.equal(ctrl.getState().lines[0], "", "Must restart from empty lines");

  // Enable reduced motion, go offscreen, restore normal motion: waits until visible
  ctrl.setReducedMotion(true);
  ctrl.setVisibility({ isIntersecting: false });
  ctrl.setReducedMotion(false);
  assert.equal(
    ctrl.getHasStarted(),
    false,
    "Must not restart animation while offscreen"
  );
  assert.deepEqual(
    ctrl.getState().lines,
    FULL_TERMINAL_LINES,
    "Preserves static full text while offscreen"
  );

  ctrl.destroy();
}

// 5G: StrictMode double mount / destroy safety
{
  const clock = new FakeClock();
  const ctrl = new TerminalLifecycleController({
    onUpdate: () => {},
    isIntersecting: true,
    isDocumentHidden: false,
    reducedMotion: false,
    clock,
  });
  ctrl.init();
  assert(clock.hasActiveTimers(), "Timer must be active");
  ctrl.destroy();
  assert.equal(
    clock.hasActiveTimers(),
    false,
    "destroy() must cancel active timer"
  );
}

console.log(
  "All terminal progression, hold, reset, and lifecycle assertions passed successfully!"
);
