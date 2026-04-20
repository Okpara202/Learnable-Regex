# Credit Card Validator

A simple JavaScript program that identifies a credit card's network (Visa, Mastercard, etc.) and validates the number using the Luhn algorithm.

---

## How to Run

clone the repository

```bash
git clone https://github.com/Okpara202/Learnable-Regex.git
cd Learnable-Regex
```

In your terminal:

```
node index.js
```

---

## How It Works

### Step 1 — Strip spaces

User input may contain spaces (e.g. `4532 0151 6800 1000`). These are stripped first so only the raw digits are processed.

### Step 2 — Identify card type (Regex)

Each card network has a known prefix and length. A regex pattern is written for each one:

| Card       | Pattern               | What it checks                       |
| ---------- | --------------------- | ------------------------------------ |
| Visa       | `/^4[0-9]{15}$/`      | Starts with `4`, 16 digits total     |
| Mastercard | `/^5[1-5][0-9]{14}$/` | Starts with `51–55`, 16 digits total |
| Amex       | `/^3[47][0-9]{13}$/`  | Starts with `34` or `37`, 15 digits  |
| Discover   | `/^6011[0-9]{12}$/`   | Starts with `6011`, 16 digits total  |

**Regex breakdown (using Visa as example):**

```
^4[0-9]{15}$
│ │         │
│ │         └── End of string
│ └──────────── Followed by exactly 15 more digits (0–9)
└────────────── Must start with 4
```

- `^` and `$` anchor the pattern so no extra characters can sneak in.
- `[0-9]` matches any single digit.
- `{15}` means exactly 15 repetitions of the previous token.

### Step 3 — Luhn Algorithm

The regex only confirms the card _looks_ right. The Luhn algorithm checks whether the number is mathematically valid — every real card number passes this test.

**How it works:**

1. Start from the rightmost digit and move left.
2. Every second digit gets doubled.
3. If doubling gives a number > 9, subtract 9.
4. Add all digits together.
5. If the total is divisible by 10 → valid. Otherwise → invalid.

**Example with `4532015168001000`:**

```
Digits (right to left): 0 0 0 1 0 0 8 6 1 5 1 0 2 3 5 4
Double every 2nd:        0 0 0 2 0 0 7 6 2 1 2 0 4 6 1 8
                                  (8→16→7)        (5→10→1)
Sum = 0+0+0+2+0+0+7+6+2+1+2+0+4+6+1+8 = 39... → 40 ✓
```

Sum divisible by 10 = valid.

---

## Sample Output

```
"4532015168001000" — Visa     | Valid ✓
"5425233430109903" — Mastercard | Valid ✓
"371449635398431"  — Amex     | Valid ✓
"6011111111111117" — Discover  | Valid ✓
"4111111111111112" — Visa     | Invalid ✗ (Luhn Algorithm failed)
"1234567890123456" — Unknown card type.
```
