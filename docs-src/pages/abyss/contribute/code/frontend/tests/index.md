---
uid: Abyss.Contribute.Frontend.Tests.Index
---

# Contribute to 2sxc / EAV JavaScript/TypeScript Tests

[!include[""](../../_contributors-only.md)]

## Pre-Requisites

* all the pre-requisites for building 2sxc

## Background

On 2sxc and the EAV project we strive to have many unit tests, but as always it's hard to keep up.

One of the challenges is also that some of the tests were written when we were less experienced, so we would do it better today.
So if you do review some tests, note that they may not use the latest best practices.

## Desired Setup and Conventions

As of 2025-12 we want to use [Vitest](https://vitest.dev) for all our unit tests.

## Setup & Installation

Vitest is typically configured in the project's `package.json` and `vitest.config.ts`. Dependencies are installed via:

```bash
npm install
```

For more details, see the [Vitest Installation Guide](https://vitest.dev/guide/).

## Running Tests

```bash
# Run all tests once
npm test

# Run in watch mode (re-runs on file changes)
npm run test:watch

# Run with coverage report
npm run test:coverage
```

## Test File Naming & Location

* Test files should be located next to their source files.
* Naming conventions: `*.spec.ts`
* Example: `src/utils/add.ts` → `src/utils/add.spec.ts`

## Basic Structure

```ts
import { describe, it, expect } from "vitest";

describe("Name of the unit (function/class)", () => {
  it("describes the expected behavior", () => {
    // Arrange
    const input = 1;

    // Act
    const result = input + 1;

    // Assert
    expect(result).toBe(2);
  });
});
```

For more on test structure and assertions, see the [Vitest Documentation](https://vitest.dev).

## Example 1: Testing a Small Function

**Unit (example):**

```ts
export function add(a: number, b: number) {
  return a + b;
}
```

**Test:**

```ts
import { describe, it, expect } from "vitest";
import { add } from "./add";

describe("add", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

## Example 2: Multiple Test Cases at Once (cases array)

If a function has many edge cases, we prefer a `cases` array instead of many separate `it(...)` blocks.

### Variant A: Simple cases (input → expected)

```ts
import { describe, it, expect } from "vitest";

function toUpperSafe(val: unknown) {
  return typeof val === "string" ? val.toUpperCase() : undefined;
}

describe("toUpperSafe", () => {
  const cases: Array<[unknown, string | undefined]> = [
    ["hi", "HI"],
    ["", ""],
    [undefined, undefined],
    [null, undefined],
    [123, undefined],
  ];

  cases.forEach(([input, expected]) => {
    it(`input=${String(input)}`, () => {
      expect(toUpperSafe(input)).toBe(expected);
    });
  });
});
```

### Variant B: Cases with custom test names

For more complex scenarios, include descriptive test names:

```ts
import { describe, it, expect } from "vitest";

function parseUser(input: string) {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}

describe("parseUser", () => {
  const cases = [
    { name: "parses valid JSON", input: '{"name":"John"}', expected: { name: "John" } },
    { name: "returns null on invalid JSON", input: "invalid", expected: null },
    { name: "handles empty string", input: "", expected: null },
  ];

  cases.forEach(({ name, input, expected }) => {
    it(name, () => {
      expect(parseUser(input)).toEqual(expected);
    });
  });
});
```

## Example 3: Testing Async Functions

```ts
import { describe, it, expect } from "vitest";

async function fetchUser(id: number) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

describe("fetchUser", () => {
  it("fetches user data", async () => {
    // Note: In real tests, you'd mock the fetch function
    const result = await fetchUser(1);
    expect(result).toHaveProperty("id");
  });
});
```

For async testing patterns, see [Vitest Async Documentation](https://vitest.dev/guide/features.html#async-tests).

## Example 4: Testing Error Cases

```ts
import { describe, it, expect } from "vitest";

function divide(a: number, b: number) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

describe("divide", () => {
  it("divides two numbers", () => {
    expect(divide(10, 2)).toBe(5);
  });

  it("throws on division by zero", () => {
    expect(() => divide(10, 0)).toThrow("Division by zero");
  });
});
```

## Example 5: Basic Mocking

```ts
import { describe, it, expect, vi } from "vitest";

const mockFetch = vi.fn();

describe("getUserName", () => {
  it("calls fetch with correct URL", async () => {
    mockFetch.mockResolvedValue({ name: "John" });
    
    expect(mockFetch).toHaveBeenCalledWith("/api/user/1");
  });
});
```

For comprehensive mocking details, see [Vitest Mocking Guide](https://vitest.dev/guide/mocking.html).

## Example 6: Testing Private / Internal Functions

Sometimes a class or module exposes behavior via private/internal helper functions that you still want to test.

```ts
import { expect, test, describe } from 'vitest';
import { BuildRule } from './rule';
import { Log } from '../../../../core/logging/Log';
import { RuleLoadTools } from './rule-load-tools';

describe('BuildRule.loadHeaderAndUi', () => {

  // Example which uses data driven testing to cover multiple cases
  test.each([
    { rule: '', expected: undefined },
    { rule: 'abc', expected: undefined },
    { rule: 'id=abc', expected: 'abc' },
    { rule: 'name=MyButton', expected: undefined },
    { rule: 'id=button1&name=MyButton', expected: 'button1' },
    { rule: 'name=MyButton&id=button2', expected: 'button2' },
  ] satisfies { rule: string; expected: string | undefined; }[])
  (`check id $rule`, (c) => {
    const rule = new BuildRule('', new Log('test'));
    var rest = RuleLoadTools.splitParamsArray(c.rule);
    // This is how to access a private method from a test
    // Use bracket notation: rule['loadHeaderAndUi'](...)
    // Keep tests focused on observable behavior (e.g. resulting `id`),
    rule['loadHeaderAndUi']('', rest);
    expect(rule.id).toBe(c.expected);
  });

  // Additional tests can be added for name, group, pos, show, ui, etc.

});
```

## Conventions (Short)

* **describe**: name of the unit (e.g. `RuleLoadTools.splitUrlSections`)

* **it**: describes the expected behavior

* **cases array**: preferred for many variations / edge cases

* Use:
  * `toBe(...)` for primitive values
  * `toEqual(...)` for objects and arrays
  * `toThrow(...)` for error cases
  * `toHaveBeenCalled...()` for mocking assertions

## Useful Resources

* [Official Vitest Documentation](https://vitest.dev)
* [Vitest API Reference](https://vitest.dev/api/)
* [Common Matchers](https://vitest.dev/api/expect.html)
* [Mocking & Stubbing](https://vitest.dev/guide/mocking.html)
