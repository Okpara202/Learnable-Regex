// Credit Card Validator
// Regex patterns for each card type
const cardPatterns = {
  Visa: /^4[0-9]{15}$/,
  Mastercard: /^5[1-5][0-9]{14}$/,
  Amex: /^3[47][0-9]{13}$/,
  Discover: /^6011[0-9]{12}$/,
};

// Luhn Algorithm to verify the number isn't garbage
function luhn(number) {
  let sum = 0;
  let shouldDouble = false;

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

// Main validate function
function validate(input) {
  const number = input.replace(/\s+/g, ""); // strip spaces

  // Find matching card type
  const match = Object.entries(cardPatterns).find(([, regex]) =>
    regex.test(number),
  );

  if (!match) {
    console.log(`"${input}" — Unknown card type.`);
    return;
  }

  const [type] = match;
  const isValid = luhn(number);

  console.log(
    `"${input}" — ${type} | ${isValid ? "Valid ✓" : "Invalid ✗ (Luhn Algorithm failed)"}`,
  );
}

// Test cases
validate("4532015168001000"); // Visa    - valid
validate("5425233430109903"); // MC      - valid
validate("371449635398431"); // Amex    - valid
validate("6011111111111117"); // Discover- valid
validate("4111111111111112"); // Visa    - invalid checksum
validate("1234567890123456"); // Unknown type
