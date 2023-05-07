export function isDigit(s: string): boolean {
  const code = s.charCodeAt(0);
  if (code >= 0x0030 && code <= 0x0039) return true;
  return is(s, _Nd);
}

export function isUpper(s: string): boolean {
  const code = s.charCodeAt(0);
  if (code <= latin.length)
    return (latin[code] & LatinMask.pLmask) == LatinMask.pLu;
  return is(s, _Lu);
}

export function isLower(s: string): boolean {
  const code = s.charCodeAt(0);
  if (code <= latin.length)
    return (latin[code] & LatinMask.pLmask) == LatinMask.pLl;
  return is(s, _Ll);
}

export function isPunct(s: string): boolean {
  const code = s.charCodeAt(0);
  if (code <= latin.length) return (latin[code] & LatinMask.pP) !== 0;
  return is(s, _P);
}

export function isSymbol(s: string): boolean {
  const code = s.charCodeAt(0);
  if (code <= latin.length) return (latin[code] & LatinMask.pS) !== 0;
  return is(s, _S);
}

function is(s: string, table: Table): boolean {
  if (s.length == 1) {
    const code = s.charCodeAt(0);
    return search(code, table.T16);
  } else if (s.length == 2) {
    const code = convert32toCode(s);
    return search(code, table.T32);
  }
  return false;
}

function convert32toCode(s: string): number {
  const start = s.charCodeAt(0);
  const end = s.charCodeAt(1);
  return (start - 0xd800) * 0x400 + (end - 0xdc00) + 0x10000;
}

function search(code: number, table: number[][]): boolean {
  if (code > table[table.length - 1][1] || code < table[0][0]) return false;
  let start = 0;
  let end = table.length;
  while (start < end) {
    const middle = Math.floor(start + (end - start) / 2);
    const t = table[middle];
    if (code >= t[0] && code <= t[1])
      return t[2] === 1 || (code - t[0]) % t[2] === 0;
    if (code > t[1]) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return false;
}

// Data obtained from the Go unicode package.
// Unicode version : 13.0.0

enum LatinMask {
  pC = 1 << 0, // a control character.
  pP = 1 << 1, // a punctuation character.
  pN = 1 << 2, // a numeral.
  pS = 1 << 3, // a symbolic character.
  pZ = 1 << 4, // a spacing character.
  pLu = 1 << 5, // an upper-case letter.
  pLl = 1 << 6, // a lower-case letter.
  pp = 1 << 7, // a printable character according to Go's definition.
  pg = pp | pZ, // a graphical character according to the Unicode definition.
  pLo = pLl | pLu, // a letter that is neither upper nor lower case.
  pLmask = pLo,
}

const latin: number[] = [
  LatinMask.pC, // '\x00'
  LatinMask.pC, // '\x01'
  LatinMask.pC, // '\x02'
  LatinMask.pC, // '\x03'
  LatinMask.pC, // '\x04'
  LatinMask.pC, // '\x05'
  LatinMask.pC, // '\x06'
  LatinMask.pC, // '\a'
  LatinMask.pC, // '\b'
  LatinMask.pC, // '\t'
  LatinMask.pC, // '\n'
  LatinMask.pC, // '\v'
  LatinMask.pC, // '\f'
  LatinMask.pC, // '\r'
  LatinMask.pC, // '\x0e'
  LatinMask.pC, // '\x0f'
  LatinMask.pC, // '\x10'
  LatinMask.pC, // '\x11'
  LatinMask.pC, // '\x12'
  LatinMask.pC, // '\x13'
  LatinMask.pC, // '\x14'
  LatinMask.pC, // '\x15'
  LatinMask.pC, // '\x16'
  LatinMask.pC, // '\x17'
  LatinMask.pC, // '\x18'
  LatinMask.pC, // '\x19'
  LatinMask.pC, // '\x1a'
  LatinMask.pC, // '\x1b'
  LatinMask.pC, // '\x1c'
  LatinMask.pC, // '\x1d'
  LatinMask.pC, // '\x1e'
  LatinMask.pC, // '\x1f'
  LatinMask.pZ | LatinMask.pp, // ' '
  LatinMask.pP | LatinMask.pp, // '!'
  LatinMask.pP | LatinMask.pp, // '"'
  LatinMask.pP | LatinMask.pp, // '#'
  LatinMask.pS | LatinMask.pp, // '$'
  LatinMask.pP | LatinMask.pp, // '%'
  LatinMask.pP | LatinMask.pp, // '&'
  LatinMask.pP | LatinMask.pp, // '\''
  LatinMask.pP | LatinMask.pp, // '('
  LatinMask.pP | LatinMask.pp, // ')'
  LatinMask.pP | LatinMask.pp, // '*'
  LatinMask.pS | LatinMask.pp, // '+'
  LatinMask.pP | LatinMask.pp, // ','
  LatinMask.pP | LatinMask.pp, // '-'
  LatinMask.pP | LatinMask.pp, // '.'
  LatinMask.pP | LatinMask.pp, // '/'
  LatinMask.pN | LatinMask.pp, // '0'
  LatinMask.pN | LatinMask.pp, // '1'
  LatinMask.pN | LatinMask.pp, // '2'
  LatinMask.pN | LatinMask.pp, // '3'
  LatinMask.pN | LatinMask.pp, // '4'
  LatinMask.pN | LatinMask.pp, // '5'
  LatinMask.pN | LatinMask.pp, // '6'
  LatinMask.pN | LatinMask.pp, // '7'
  LatinMask.pN | LatinMask.pp, // '8'
  LatinMask.pN | LatinMask.pp, // '9'
  LatinMask.pP | LatinMask.pp, // ':'
  LatinMask.pP | LatinMask.pp, // ';'
  LatinMask.pS | LatinMask.pp, // '<'
  LatinMask.pS | LatinMask.pp, // '='
  LatinMask.pS | LatinMask.pp, // '>'
  LatinMask.pP | LatinMask.pp, // '?'
  LatinMask.pP | LatinMask.pp, // '@'
  LatinMask.pLu | LatinMask.pp, // 'A'
  LatinMask.pLu | LatinMask.pp, // 'B'
  LatinMask.pLu | LatinMask.pp, // 'C'
  LatinMask.pLu | LatinMask.pp, // 'D'
  LatinMask.pLu | LatinMask.pp, // 'E'
  LatinMask.pLu | LatinMask.pp, // 'F'
  LatinMask.pLu | LatinMask.pp, // 'G'
  LatinMask.pLu | LatinMask.pp, // 'H'
  LatinMask.pLu | LatinMask.pp, // 'I'
  LatinMask.pLu | LatinMask.pp, // 'J'
  LatinMask.pLu | LatinMask.pp, // 'K'
  LatinMask.pLu | LatinMask.pp, // 'L'
  LatinMask.pLu | LatinMask.pp, // 'M'
  LatinMask.pLu | LatinMask.pp, // 'N'
  LatinMask.pLu | LatinMask.pp, // 'O'
  LatinMask.pLu | LatinMask.pp, // 'P'
  LatinMask.pLu | LatinMask.pp, // 'Q'
  LatinMask.pLu | LatinMask.pp, // 'R'
  LatinMask.pLu | LatinMask.pp, // 'S'
  LatinMask.pLu | LatinMask.pp, // 'T'
  LatinMask.pLu | LatinMask.pp, // 'U'
  LatinMask.pLu | LatinMask.pp, // 'V'
  LatinMask.pLu | LatinMask.pp, // 'W'
  LatinMask.pLu | LatinMask.pp, // 'X'
  LatinMask.pLu | LatinMask.pp, // 'Y'
  LatinMask.pLu | LatinMask.pp, // 'Z'
  LatinMask.pP | LatinMask.pp, // '['
  LatinMask.pP | LatinMask.pp, // '\\'
  LatinMask.pP | LatinMask.pp, // ']'
  LatinMask.pS | LatinMask.pp, // '^'
  LatinMask.pP | LatinMask.pp, // '_'
  LatinMask.pS | LatinMask.pp, // '`'
  LatinMask.pLl | LatinMask.pp, // 'a'
  LatinMask.pLl | LatinMask.pp, // 'b'
  LatinMask.pLl | LatinMask.pp, // 'c'
  LatinMask.pLl | LatinMask.pp, // 'd'
  LatinMask.pLl | LatinMask.pp, // 'e'
  LatinMask.pLl | LatinMask.pp, // 'f'
  LatinMask.pLl | LatinMask.pp, // 'g'
  LatinMask.pLl | LatinMask.pp, // 'h'
  LatinMask.pLl | LatinMask.pp, // 'i'
  LatinMask.pLl | LatinMask.pp, // 'j'
  LatinMask.pLl | LatinMask.pp, // 'k'
  LatinMask.pLl | LatinMask.pp, // 'l'
  LatinMask.pLl | LatinMask.pp, // 'm'
  LatinMask.pLl | LatinMask.pp, // 'n'
  LatinMask.pLl | LatinMask.pp, // 'o'
  LatinMask.pLl | LatinMask.pp, // 'p'
  LatinMask.pLl | LatinMask.pp, // 'q'
  LatinMask.pLl | LatinMask.pp, // 'r'
  LatinMask.pLl | LatinMask.pp, // 's'
  LatinMask.pLl | LatinMask.pp, // 't'
  LatinMask.pLl | LatinMask.pp, // 'u'
  LatinMask.pLl | LatinMask.pp, // 'v'
  LatinMask.pLl | LatinMask.pp, // 'w'
  LatinMask.pLl | LatinMask.pp, // 'x'
  LatinMask.pLl | LatinMask.pp, // 'y'
  LatinMask.pLl | LatinMask.pp, // 'z'
  LatinMask.pP | LatinMask.pp, // '{'
  LatinMask.pS | LatinMask.pp, // '|'
  LatinMask.pP | LatinMask.pp, // '}'
  LatinMask.pS | LatinMask.pp, // '~'
  LatinMask.pC, // '\u007f'
  LatinMask.pC, // '\u0080'
  LatinMask.pC, // '\u0081'
  LatinMask.pC, // '\u0082'
  LatinMask.pC, // '\u0083'
  LatinMask.pC, // '\u0084'
  LatinMask.pC, // '\u0085'
  LatinMask.pC, // '\u0086'
  LatinMask.pC, // '\u0087'
  LatinMask.pC, // '\u0088'
  LatinMask.pC, // '\u0089'
  LatinMask.pC, // '\u008a'
  LatinMask.pC, // '\u008b'
  LatinMask.pC, // '\u008c'
  LatinMask.pC, // '\u008d'
  LatinMask.pC, // '\u008e'
  LatinMask.pC, // '\u008f'
  LatinMask.pC, // '\u0090'
  LatinMask.pC, // '\u0091'
  LatinMask.pC, // '\u0092'
  LatinMask.pC, // '\u0093'
  LatinMask.pC, // '\u0094'
  LatinMask.pC, // '\u0095'
  LatinMask.pC, // '\u0096'
  LatinMask.pC, // '\u0097'
  LatinMask.pC, // '\u0098'
  LatinMask.pC, // '\u0099'
  LatinMask.pC, // '\u009a'
  LatinMask.pC, // '\u009b'
  LatinMask.pC, // '\u009c'
  LatinMask.pC, // '\u009d'
  LatinMask.pC, // '\u009e'
  LatinMask.pC, // '\u009f'
  LatinMask.pZ, // '\u00a0'
  LatinMask.pP | LatinMask.pp, // '¡'
  LatinMask.pS | LatinMask.pp, // '¢'
  LatinMask.pS | LatinMask.pp, // '£'
  LatinMask.pS | LatinMask.pp, // '¤'
  LatinMask.pS | LatinMask.pp, // '¥'
  LatinMask.pS | LatinMask.pp, // '¦'
  LatinMask.pP | LatinMask.pp, // '§'
  LatinMask.pS | LatinMask.pp, // '¨'
  LatinMask.pS | LatinMask.pp, // '©'
  LatinMask.pLo | LatinMask.pp, // 'ª'
  LatinMask.pP | LatinMask.pp, // '«'
  LatinMask.pS | LatinMask.pp, // '¬'
  0, // '\u00ad'
  LatinMask.pS | LatinMask.pp, // '®'
  LatinMask.pS | LatinMask.pp, // '¯'
  LatinMask.pS | LatinMask.pp, // '°'
  LatinMask.pS | LatinMask.pp, // '±'
  LatinMask.pN | LatinMask.pp, // '²'
  LatinMask.pN | LatinMask.pp, // '³'
  LatinMask.pS | LatinMask.pp, // '´'
  LatinMask.pLl | LatinMask.pp, // 'µ'
  LatinMask.pP | LatinMask.pp, // '¶'
  LatinMask.pP | LatinMask.pp, // '·'
  LatinMask.pS | LatinMask.pp, // '¸'
  LatinMask.pN | LatinMask.pp, // '¹'
  LatinMask.pLo | LatinMask.pp, // 'º'
  LatinMask.pP | LatinMask.pp, // '»'
  LatinMask.pN | LatinMask.pp, // '¼'
  LatinMask.pN | LatinMask.pp, // '½'
  LatinMask.pN | LatinMask.pp, // '¾'
  LatinMask.pP | LatinMask.pp, // '¿'
  LatinMask.pLu | LatinMask.pp, // 'À'
  LatinMask.pLu | LatinMask.pp, // 'Á'
  LatinMask.pLu | LatinMask.pp, // 'Â'
  LatinMask.pLu | LatinMask.pp, // 'Ã'
  LatinMask.pLu | LatinMask.pp, // 'Ä'
  LatinMask.pLu | LatinMask.pp, // 'Å'
  LatinMask.pLu | LatinMask.pp, // 'Æ'
  LatinMask.pLu | LatinMask.pp, // 'Ç'
  LatinMask.pLu | LatinMask.pp, // 'È'
  LatinMask.pLu | LatinMask.pp, // 'É'
  LatinMask.pLu | LatinMask.pp, // 'Ê'
  LatinMask.pLu | LatinMask.pp, // 'Ë'
  LatinMask.pLu | LatinMask.pp, // 'Ì'
  LatinMask.pLu | LatinMask.pp, // 'Í'
  LatinMask.pLu | LatinMask.pp, // 'Î'
  LatinMask.pLu | LatinMask.pp, // 'Ï'
  LatinMask.pLu | LatinMask.pp, // 'Ð'
  LatinMask.pLu | LatinMask.pp, // 'Ñ'
  LatinMask.pLu | LatinMask.pp, // 'Ò'
  LatinMask.pLu | LatinMask.pp, // 'Ó'
  LatinMask.pLu | LatinMask.pp, // 'Ô'
  LatinMask.pLu | LatinMask.pp, // 'Õ'
  LatinMask.pLu | LatinMask.pp, // 'Ö'
  LatinMask.pS | LatinMask.pp, // '×'
  LatinMask.pLu | LatinMask.pp, // 'Ø'
  LatinMask.pLu | LatinMask.pp, // 'Ù'
  LatinMask.pLu | LatinMask.pp, // 'Ú'
  LatinMask.pLu | LatinMask.pp, // 'Û'
  LatinMask.pLu | LatinMask.pp, // 'Ü'
  LatinMask.pLu | LatinMask.pp, // 'Ý'
  LatinMask.pLu | LatinMask.pp, // 'Þ'
  LatinMask.pLl | LatinMask.pp, // 'ß'
  LatinMask.pLl | LatinMask.pp, // 'à'
  LatinMask.pLl | LatinMask.pp, // 'á'
  LatinMask.pLl | LatinMask.pp, // 'â'
  LatinMask.pLl | LatinMask.pp, // 'ã'
  LatinMask.pLl | LatinMask.pp, // 'ä'
  LatinMask.pLl | LatinMask.pp, // 'å'
  LatinMask.pLl | LatinMask.pp, // 'æ'
  LatinMask.pLl | LatinMask.pp, // 'ç'
  LatinMask.pLl | LatinMask.pp, // 'è'
  LatinMask.pLl | LatinMask.pp, // 'é'
  LatinMask.pLl | LatinMask.pp, // 'ê'
  LatinMask.pLl | LatinMask.pp, // 'ë'
  LatinMask.pLl | LatinMask.pp, // 'ì'
  LatinMask.pLl | LatinMask.pp, // 'í'
  LatinMask.pLl | LatinMask.pp, // 'î'
  LatinMask.pLl | LatinMask.pp, // 'ï'
  LatinMask.pLl | LatinMask.pp, // 'ð'
  LatinMask.pLl | LatinMask.pp, // 'ñ'
  LatinMask.pLl | LatinMask.pp, // 'ò'
  LatinMask.pLl | LatinMask.pp, // 'ó'
  LatinMask.pLl | LatinMask.pp, // 'ô'
  LatinMask.pLl | LatinMask.pp, // 'õ'
  LatinMask.pLl | LatinMask.pp, // 'ö'
  LatinMask.pS | LatinMask.pp, // '÷'
  LatinMask.pLl | LatinMask.pp, // 'ø'
  LatinMask.pLl | LatinMask.pp, // 'ù'
  LatinMask.pLl | LatinMask.pp, // 'ú'
  LatinMask.pLl | LatinMask.pp, // 'û'
  LatinMask.pLl | LatinMask.pp, // 'ü'
  LatinMask.pLl | LatinMask.pp, // 'ý'
  LatinMask.pLl | LatinMask.pp, // 'þ'
  LatinMask.pLl | LatinMask.pp, // 'ÿ'
];

interface Table {
  T16: number[][];
  T32: number[][];
}

const _Nd: Table = {
  T16: [
    // [0x0030, 0x0039, 1],
    [0x0660, 0x0669, 1],
    [0x06f0, 0x06f9, 1],
    [0x07c0, 0x07c9, 1],
    [0x0966, 0x096f, 1],
    [0x09e6, 0x09ef, 1],
    [0x0a66, 0x0a6f, 1],
    [0x0ae6, 0x0aef, 1],
    [0x0b66, 0x0b6f, 1],
    [0x0be6, 0x0bef, 1],
    [0x0c66, 0x0c6f, 1],
    [0x0ce6, 0x0cef, 1],
    [0x0d66, 0x0d6f, 1],
    [0x0de6, 0x0def, 1],
    [0x0e50, 0x0e59, 1],
    [0x0ed0, 0x0ed9, 1],
    [0x0f20, 0x0f29, 1],
    [0x1040, 0x1049, 1],
    [0x1090, 0x1099, 1],
    [0x17e0, 0x17e9, 1],
    [0x1810, 0x1819, 1],
    [0x1946, 0x194f, 1],
    [0x19d0, 0x19d9, 1],
    [0x1a80, 0x1a89, 1],
    [0x1a90, 0x1a99, 1],
    [0x1b50, 0x1b59, 1],
    [0x1bb0, 0x1bb9, 1],
    [0x1c40, 0x1c49, 1],
    [0x1c50, 0x1c59, 1],
    [0xa620, 0xa629, 1],
    [0xa8d0, 0xa8d9, 1],
    [0xa900, 0xa909, 1],
    [0xa9d0, 0xa9d9, 1],
    [0xa9f0, 0xa9f9, 1],
    [0xaa50, 0xaa59, 1],
    [0xabf0, 0xabf9, 1],
    [0xff10, 0xff19, 1],
  ],
  T32: [
    [0x104a0, 0x104a9, 1],
    [0x10d30, 0x10d39, 1],
    [0x11066, 0x1106f, 1],
    [0x110f0, 0x110f9, 1],
    [0x11136, 0x1113f, 1],
    [0x111d0, 0x111d9, 1],
    [0x112f0, 0x112f9, 1],
    [0x11450, 0x11459, 1],
    [0x114d0, 0x114d9, 1],
    [0x11650, 0x11659, 1],
    [0x116c0, 0x116c9, 1],
    [0x11730, 0x11739, 1],
    [0x118e0, 0x118e9, 1],
    [0x11950, 0x11959, 1],
    [0x11c50, 0x11c59, 1],
    [0x11d50, 0x11d59, 1],
    [0x11da0, 0x11da9, 1],
    [0x16a60, 0x16a69, 1],
    [0x16b50, 0x16b59, 1],
    [0x1d7ce, 0x1d7ff, 1],
    [0x1e140, 0x1e149, 1],
    [0x1e2f0, 0x1e2f9, 1],
    [0x1e950, 0x1e959, 1],
    [0x1fbf0, 0x1fbf9, 1],
  ],
};

const _Lu: Table = {
  T16: [
    // [0x0041, 0x005a, 1],
    // [0x00c0, 0x00d6, 1],
    // [0x00d8, 0x00de, 1],
    [0x0100, 0x0136, 2],
    [0x0139, 0x0147, 2],
    [0x014a, 0x0178, 2],
    [0x0179, 0x017d, 2],
    [0x0181, 0x0182, 1],
    [0x0184, 0x0186, 2],
    [0x0187, 0x0189, 2],
    [0x018a, 0x018b, 1],
    [0x018e, 0x0191, 1],
    [0x0193, 0x0194, 1],
    [0x0196, 0x0198, 1],
    [0x019c, 0x019d, 1],
    [0x019f, 0x01a0, 1],
    [0x01a2, 0x01a6, 2],
    [0x01a7, 0x01a9, 2],
    [0x01ac, 0x01ae, 2],
    [0x01af, 0x01b1, 2],
    [0x01b2, 0x01b3, 1],
    [0x01b5, 0x01b7, 2],
    [0x01b8, 0x01bc, 4],
    [0x01c4, 0x01cd, 3],
    [0x01cf, 0x01db, 2],
    [0x01de, 0x01ee, 2],
    [0x01f1, 0x01f4, 3],
    [0x01f6, 0x01f8, 1],
    [0x01fa, 0x0232, 2],
    [0x023a, 0x023b, 1],
    [0x023d, 0x023e, 1],
    [0x0241, 0x0243, 2],
    [0x0244, 0x0246, 1],
    [0x0248, 0x024e, 2],
    [0x0370, 0x0372, 2],
    [0x0376, 0x037f, 9],
    [0x0386, 0x0388, 2],
    [0x0389, 0x038a, 1],
    [0x038c, 0x038e, 2],
    [0x038f, 0x0391, 2],
    [0x0392, 0x03a1, 1],
    [0x03a3, 0x03ab, 1],
    [0x03cf, 0x03d2, 3],
    [0x03d3, 0x03d4, 1],
    [0x03d8, 0x03ee, 2],
    [0x03f4, 0x03f7, 3],
    [0x03f9, 0x03fa, 1],
    [0x03fd, 0x042f, 1],
    [0x0460, 0x0480, 2],
    [0x048a, 0x04c0, 2],
    [0x04c1, 0x04cd, 2],
    [0x04d0, 0x052e, 2],
    [0x0531, 0x0556, 1],
    [0x10a0, 0x10c5, 1],
    [0x10c7, 0x10cd, 6],
    [0x13a0, 0x13f5, 1],
    [0x1c90, 0x1cba, 1],
    [0x1cbd, 0x1cbf, 1],
    [0x1e00, 0x1e94, 2],
    [0x1e9e, 0x1efe, 2],
    [0x1f08, 0x1f0f, 1],
    [0x1f18, 0x1f1d, 1],
    [0x1f28, 0x1f2f, 1],
    [0x1f38, 0x1f3f, 1],
    [0x1f48, 0x1f4d, 1],
    [0x1f59, 0x1f5f, 2],
    [0x1f68, 0x1f6f, 1],
    [0x1fb8, 0x1fbb, 1],
    [0x1fc8, 0x1fcb, 1],
    [0x1fd8, 0x1fdb, 1],
    [0x1fe8, 0x1fec, 1],
    [0x1ff8, 0x1ffb, 1],
    [0x2102, 0x2107, 5],
    [0x210b, 0x210d, 1],
    [0x2110, 0x2112, 1],
    [0x2115, 0x2119, 4],
    [0x211a, 0x211d, 1],
    [0x2124, 0x212a, 2],
    [0x212b, 0x212d, 1],
    [0x2130, 0x2133, 1],
    [0x213e, 0x213f, 1],
    [0x2145, 0x2183, 62],
    [0x2c00, 0x2c2e, 1],
    [0x2c60, 0x2c62, 2],
    [0x2c63, 0x2c64, 1],
    [0x2c67, 0x2c6d, 2],
    [0x2c6e, 0x2c70, 1],
    [0x2c72, 0x2c75, 3],
    [0x2c7e, 0x2c80, 1],
    [0x2c82, 0x2ce2, 2],
    [0x2ceb, 0x2ced, 2],
    [0x2cf2, 0xa640, 31054],
    [0xa642, 0xa66c, 2],
    [0xa680, 0xa69a, 2],
    [0xa722, 0xa72e, 2],
    [0xa732, 0xa76e, 2],
    [0xa779, 0xa77d, 2],
    [0xa77e, 0xa786, 2],
    [0xa78b, 0xa78d, 2],
    [0xa790, 0xa792, 2],
    [0xa796, 0xa7aa, 2],
    [0xa7ab, 0xa7ae, 1],
    [0xa7b0, 0xa7b4, 1],
    [0xa7b6, 0xa7be, 2],
    [0xa7c2, 0xa7c4, 2],
    [0xa7c5, 0xa7c7, 1],
    [0xa7c9, 0xa7f5, 44],
    [0xff21, 0xff3a, 1],
  ],
  T32: [
    [0x10400, 0x10427, 1],
    [0x104b0, 0x104d3, 1],
    [0x10c80, 0x10cb2, 1],
    [0x118a0, 0x118bf, 1],
    [0x16e40, 0x16e5f, 1],
    [0x1d400, 0x1d419, 1],
    [0x1d434, 0x1d44d, 1],
    [0x1d468, 0x1d481, 1],
    [0x1d49c, 0x1d49e, 2],
    [0x1d49f, 0x1d4a5, 3],
    [0x1d4a6, 0x1d4a9, 3],
    [0x1d4aa, 0x1d4ac, 1],
    [0x1d4ae, 0x1d4b5, 1],
    [0x1d4d0, 0x1d4e9, 1],
    [0x1d504, 0x1d505, 1],
    [0x1d507, 0x1d50a, 1],
    [0x1d50d, 0x1d514, 1],
    [0x1d516, 0x1d51c, 1],
    [0x1d538, 0x1d539, 1],
    [0x1d53b, 0x1d53e, 1],
    [0x1d540, 0x1d544, 1],
    [0x1d546, 0x1d54a, 4],
    [0x1d54b, 0x1d550, 1],
    [0x1d56c, 0x1d585, 1],
    [0x1d5a0, 0x1d5b9, 1],
    [0x1d5d4, 0x1d5ed, 1],
    [0x1d608, 0x1d621, 1],
    [0x1d63c, 0x1d655, 1],
    [0x1d670, 0x1d689, 1],
    [0x1d6a8, 0x1d6c0, 1],
    [0x1d6e2, 0x1d6fa, 1],
    [0x1d71c, 0x1d734, 1],
    [0x1d756, 0x1d76e, 1],
    [0x1d790, 0x1d7a8, 1],
    [0x1d7ca, 0x1e900, 4406],
    [0x1e901, 0x1e921, 1],
  ],
};

const _Ll: Table = {
  T16: [
    // [0x0061, 0x007a, 1],
    // [0x00b5, 0x00df, 42],
    // [0x00e0, 0x00f6, 1],
    // [0x00f8, 0x00ff, 1],
    [0x0101, 0x0137, 2],
    [0x0138, 0x0148, 2],
    [0x0149, 0x0177, 2],
    [0x017a, 0x017e, 2],
    [0x017f, 0x0180, 1],
    [0x0183, 0x0185, 2],
    [0x0188, 0x018c, 4],
    [0x018d, 0x0192, 5],
    [0x0195, 0x0199, 4],
    [0x019a, 0x019b, 1],
    [0x019e, 0x01a1, 3],
    [0x01a3, 0x01a5, 2],
    [0x01a8, 0x01aa, 2],
    [0x01ab, 0x01ad, 2],
    [0x01b0, 0x01b4, 4],
    [0x01b6, 0x01b9, 3],
    [0x01ba, 0x01bd, 3],
    [0x01be, 0x01bf, 1],
    [0x01c6, 0x01cc, 3],
    [0x01ce, 0x01dc, 2],
    [0x01dd, 0x01ef, 2],
    [0x01f0, 0x01f3, 3],
    [0x01f5, 0x01f9, 4],
    [0x01fb, 0x0233, 2],
    [0x0234, 0x0239, 1],
    [0x023c, 0x023f, 3],
    [0x0240, 0x0242, 2],
    [0x0247, 0x024f, 2],
    [0x0250, 0x0293, 1],
    [0x0295, 0x02af, 1],
    [0x0371, 0x0373, 2],
    [0x0377, 0x037b, 4],
    [0x037c, 0x037d, 1],
    [0x0390, 0x03ac, 28],
    [0x03ad, 0x03ce, 1],
    [0x03d0, 0x03d1, 1],
    [0x03d5, 0x03d7, 1],
    [0x03d9, 0x03ef, 2],
    [0x03f0, 0x03f3, 1],
    [0x03f5, 0x03fb, 3],
    [0x03fc, 0x0430, 52],
    [0x0431, 0x045f, 1],
    [0x0461, 0x0481, 2],
    [0x048b, 0x04bf, 2],
    [0x04c2, 0x04ce, 2],
    [0x04cf, 0x052f, 2],
    [0x0560, 0x0588, 1],
    [0x10d0, 0x10fa, 1],
    [0x10fd, 0x10ff, 1],
    [0x13f8, 0x13fd, 1],
    [0x1c80, 0x1c88, 1],
    [0x1d00, 0x1d2b, 1],
    [0x1d6b, 0x1d77, 1],
    [0x1d79, 0x1d9a, 1],
    [0x1e01, 0x1e95, 2],
    [0x1e96, 0x1e9d, 1],
    [0x1e9f, 0x1eff, 2],
    [0x1f00, 0x1f07, 1],
    [0x1f10, 0x1f15, 1],
    [0x1f20, 0x1f27, 1],
    [0x1f30, 0x1f37, 1],
    [0x1f40, 0x1f45, 1],
    [0x1f50, 0x1f57, 1],
    [0x1f60, 0x1f67, 1],
    [0x1f70, 0x1f7d, 1],
    [0x1f80, 0x1f87, 1],
    [0x1f90, 0x1f97, 1],
    [0x1fa0, 0x1fa7, 1],
    [0x1fb0, 0x1fb4, 1],
    [0x1fb6, 0x1fb7, 1],
    [0x1fbe, 0x1fc2, 4],
    [0x1fc3, 0x1fc4, 1],
    [0x1fc6, 0x1fc7, 1],
    [0x1fd0, 0x1fd3, 1],
    [0x1fd6, 0x1fd7, 1],
    [0x1fe0, 0x1fe7, 1],
    [0x1ff2, 0x1ff4, 1],
    [0x1ff6, 0x1ff7, 1],
    [0x210a, 0x210e, 4],
    [0x210f, 0x2113, 4],
    [0x212f, 0x2139, 5],
    [0x213c, 0x213d, 1],
    [0x2146, 0x2149, 1],
    [0x214e, 0x2184, 54],
    [0x2c30, 0x2c5e, 1],
    [0x2c61, 0x2c65, 4],
    [0x2c66, 0x2c6c, 2],
    [0x2c71, 0x2c73, 2],
    [0x2c74, 0x2c76, 2],
    [0x2c77, 0x2c7b, 1],
    [0x2c81, 0x2ce3, 2],
    [0x2ce4, 0x2cec, 8],
    [0x2cee, 0x2cf3, 5],
    [0x2d00, 0x2d25, 1],
    [0x2d27, 0x2d2d, 6],
    [0xa641, 0xa66d, 2],
    [0xa681, 0xa69b, 2],
    [0xa723, 0xa72f, 2],
    [0xa730, 0xa731, 1],
    [0xa733, 0xa771, 2],
    [0xa772, 0xa778, 1],
    [0xa77a, 0xa77c, 2],
    [0xa77f, 0xa787, 2],
    [0xa78c, 0xa78e, 2],
    [0xa791, 0xa793, 2],
    [0xa794, 0xa795, 1],
    [0xa797, 0xa7a9, 2],
    [0xa7af, 0xa7b5, 6],
    [0xa7b7, 0xa7bf, 2],
    [0xa7c3, 0xa7c8, 5],
    [0xa7ca, 0xa7f6, 44],
    [0xa7fa, 0xab30, 822],
    [0xab31, 0xab5a, 1],
    [0xab60, 0xab68, 1],
    [0xab70, 0xabbf, 1],
    [0xfb00, 0xfb06, 1],
    [0xfb13, 0xfb17, 1],
    [0xff41, 0xff5a, 1],
  ],
  T32: [
    [0x10428, 0x1044f, 1],
    [0x104d8, 0x104fb, 1],
    [0x10cc0, 0x10cf2, 1],
    [0x118c0, 0x118df, 1],
    [0x16e60, 0x16e7f, 1],
    [0x1d41a, 0x1d433, 1],
    [0x1d44e, 0x1d454, 1],
    [0x1d456, 0x1d467, 1],
    [0x1d482, 0x1d49b, 1],
    [0x1d4b6, 0x1d4b9, 1],
    [0x1d4bb, 0x1d4bd, 2],
    [0x1d4be, 0x1d4c3, 1],
    [0x1d4c5, 0x1d4cf, 1],
    [0x1d4ea, 0x1d503, 1],
    [0x1d51e, 0x1d537, 1],
    [0x1d552, 0x1d56b, 1],
    [0x1d586, 0x1d59f, 1],
    [0x1d5ba, 0x1d5d3, 1],
    [0x1d5ee, 0x1d607, 1],
    [0x1d622, 0x1d63b, 1],
    [0x1d656, 0x1d66f, 1],
    [0x1d68a, 0x1d6a5, 1],
    [0x1d6c2, 0x1d6da, 1],
    [0x1d6dc, 0x1d6e1, 1],
    [0x1d6fc, 0x1d714, 1],
    [0x1d716, 0x1d71b, 1],
    [0x1d736, 0x1d74e, 1],
    [0x1d750, 0x1d755, 1],
    [0x1d770, 0x1d788, 1],
    [0x1d78a, 0x1d78f, 1],
    [0x1d7aa, 0x1d7c2, 1],
    [0x1d7c4, 0x1d7c9, 1],
    [0x1d7cb, 0x1e922, 4439],
    [0x1e923, 0x1e943, 1],
  ],
};

const _P: Table = {
  T16: [
    // [0x0021, 0x0023, 1],
    // [0x0025, 0x002a, 1],
    // [0x002c, 0x002f, 1],
    // [0x003a, 0x003b, 1],
    // [0x003f, 0x0040, 1],
    // [0x005b, 0x005d, 1],
    // [0x005f, 0x007b, 28],
    // [0x007d, 0x00a1, 36],
    // [0x00a7, 0x00ab, 4],
    // [0x00b6, 0x00b7, 1],
    // [0x00bb, 0x00bf, 4],
    [0x037e, 0x0387, 9],
    [0x055a, 0x055f, 1],
    [0x0589, 0x058a, 1],
    [0x05be, 0x05c0, 2],
    [0x05c3, 0x05c6, 3],
    [0x05f3, 0x05f4, 1],
    [0x0609, 0x060a, 1],
    [0x060c, 0x060d, 1],
    [0x061b, 0x061e, 3],
    [0x061f, 0x066a, 75],
    [0x066b, 0x066d, 1],
    [0x06d4, 0x0700, 44],
    [0x0701, 0x070d, 1],
    [0x07f7, 0x07f9, 1],
    [0x0830, 0x083e, 1],
    [0x085e, 0x0964, 262],
    [0x0965, 0x0970, 11],
    [0x09fd, 0x0a76, 121],
    [0x0af0, 0x0c77, 391],
    [0x0c84, 0x0df4, 368],
    [0x0e4f, 0x0e5a, 11],
    [0x0e5b, 0x0f04, 169],
    [0x0f05, 0x0f12, 1],
    [0x0f14, 0x0f3a, 38],
    [0x0f3b, 0x0f3d, 1],
    [0x0f85, 0x0fd0, 75],
    [0x0fd1, 0x0fd4, 1],
    [0x0fd9, 0x0fda, 1],
    [0x104a, 0x104f, 1],
    [0x10fb, 0x1360, 613],
    [0x1361, 0x1368, 1],
    [0x1400, 0x166e, 622],
    [0x169b, 0x169c, 1],
    [0x16eb, 0x16ed, 1],
    [0x1735, 0x1736, 1],
    [0x17d4, 0x17d6, 1],
    [0x17d8, 0x17da, 1],
    [0x1800, 0x180a, 1],
    [0x1944, 0x1945, 1],
    [0x1a1e, 0x1a1f, 1],
    [0x1aa0, 0x1aa6, 1],
    [0x1aa8, 0x1aad, 1],
    [0x1b5a, 0x1b60, 1],
    [0x1bfc, 0x1bff, 1],
    [0x1c3b, 0x1c3f, 1],
    [0x1c7e, 0x1c7f, 1],
    [0x1cc0, 0x1cc7, 1],
    [0x1cd3, 0x2010, 829],
    [0x2011, 0x2027, 1],
    [0x2030, 0x2043, 1],
    [0x2045, 0x2051, 1],
    [0x2053, 0x205e, 1],
    [0x207d, 0x207e, 1],
    [0x208d, 0x208e, 1],
    [0x2308, 0x230b, 1],
    [0x2329, 0x232a, 1],
    [0x2768, 0x2775, 1],
    [0x27c5, 0x27c6, 1],
    [0x27e6, 0x27ef, 1],
    [0x2983, 0x2998, 1],
    [0x29d8, 0x29db, 1],
    [0x29fc, 0x29fd, 1],
    [0x2cf9, 0x2cfc, 1],
    [0x2cfe, 0x2cff, 1],
    [0x2d70, 0x2e00, 144],
    [0x2e01, 0x2e2e, 1],
    [0x2e30, 0x2e4f, 1],
    [0x2e52, 0x3001, 431],
    [0x3002, 0x3003, 1],
    [0x3008, 0x3011, 1],
    [0x3014, 0x301f, 1],
    [0x3030, 0x303d, 13],
    [0x30a0, 0x30fb, 91],
    [0xa4fe, 0xa4ff, 1],
    [0xa60d, 0xa60f, 1],
    [0xa673, 0xa67e, 11],
    [0xa6f2, 0xa6f7, 1],
    [0xa874, 0xa877, 1],
    [0xa8ce, 0xa8cf, 1],
    [0xa8f8, 0xa8fa, 1],
    [0xa8fc, 0xa92e, 50],
    [0xa92f, 0xa95f, 48],
    [0xa9c1, 0xa9cd, 1],
    [0xa9de, 0xa9df, 1],
    [0xaa5c, 0xaa5f, 1],
    [0xaade, 0xaadf, 1],
    [0xaaf0, 0xaaf1, 1],
    [0xabeb, 0xfd3e, 20819],
    [0xfd3f, 0xfe10, 209],
    [0xfe11, 0xfe19, 1],
    [0xfe30, 0xfe52, 1],
    [0xfe54, 0xfe61, 1],
    [0xfe63, 0xfe68, 5],
    [0xfe6a, 0xfe6b, 1],
    [0xff01, 0xff03, 1],
    [0xff05, 0xff0a, 1],
    [0xff0c, 0xff0f, 1],
    [0xff1a, 0xff1b, 1],
    [0xff1f, 0xff20, 1],
    [0xff3b, 0xff3d, 1],
    [0xff3f, 0xff5b, 28],
    [0xff5d, 0xff5f, 2],
    [0xff60, 0xff65, 1],
  ],
  T32: [
    [0x10100, 0x10102, 1],
    [0x1039f, 0x103d0, 49],
    [0x1056f, 0x10857, 744],
    [0x1091f, 0x1093f, 32],
    [0x10a50, 0x10a58, 1],
    [0x10a7f, 0x10af0, 113],
    [0x10af1, 0x10af6, 1],
    [0x10b39, 0x10b3f, 1],
    [0x10b99, 0x10b9c, 1],
    [0x10ead, 0x10f55, 168],
    [0x10f56, 0x10f59, 1],
    [0x11047, 0x1104d, 1],
    [0x110bb, 0x110bc, 1],
    [0x110be, 0x110c1, 1],
    [0x11140, 0x11143, 1],
    [0x11174, 0x11175, 1],
    [0x111c5, 0x111c8, 1],
    [0x111cd, 0x111db, 14],
    [0x111dd, 0x111df, 1],
    [0x11238, 0x1123d, 1],
    [0x112a9, 0x1144b, 418],
    [0x1144c, 0x1144f, 1],
    [0x1145a, 0x1145b, 1],
    [0x1145d, 0x114c6, 105],
    [0x115c1, 0x115d7, 1],
    [0x11641, 0x11643, 1],
    [0x11660, 0x1166c, 1],
    [0x1173c, 0x1173e, 1],
    [0x1183b, 0x11944, 265],
    [0x11945, 0x11946, 1],
    [0x119e2, 0x11a3f, 93],
    [0x11a40, 0x11a46, 1],
    [0x11a9a, 0x11a9c, 1],
    [0x11a9e, 0x11aa2, 1],
    [0x11c41, 0x11c45, 1],
    [0x11c70, 0x11c71, 1],
    [0x11ef7, 0x11ef8, 1],
    [0x11fff, 0x12470, 1137],
    [0x12471, 0x12474, 1],
    [0x16a6e, 0x16a6f, 1],
    [0x16af5, 0x16b37, 66],
    [0x16b38, 0x16b3b, 1],
    [0x16b44, 0x16e97, 851],
    [0x16e98, 0x16e9a, 1],
    [0x16fe2, 0x1bc9f, 19645],
    [0x1da87, 0x1da8b, 1],
    [0x1e95e, 0x1e95f, 1],
  ],
};

const _S: Table = {
  T16: [
    // [0x0024, 0x002b, 7],
    // [0x003c, 0x003e, 1],
    // [0x005e, 0x0060, 2],
    // [0x007c, 0x007e, 2],
    // [0x00a2, 0x00a6, 1],
    // [0x00a8, 0x00a9, 1],
    // [0x00ac, 0x00ae, 2],
    // [0x00af, 0x00b1, 1],
    // [0x00b4, 0x00b8, 4],
    // [0x00d7, 0x00f7, 32],
    [0x02c2, 0x02c5, 1],
    [0x02d2, 0x02df, 1],
    [0x02e5, 0x02eb, 1],
    [0x02ed, 0x02ef, 2],
    [0x02f0, 0x02ff, 1],
    [0x0375, 0x0384, 15],
    [0x0385, 0x03f6, 113],
    [0x0482, 0x058d, 267],
    [0x058e, 0x058f, 1],
    [0x0606, 0x0608, 1],
    [0x060b, 0x060e, 3],
    [0x060f, 0x06de, 207],
    [0x06e9, 0x06fd, 20],
    [0x06fe, 0x07f6, 248],
    [0x07fe, 0x07ff, 1],
    [0x09f2, 0x09f3, 1],
    [0x09fa, 0x09fb, 1],
    [0x0af1, 0x0b70, 127],
    [0x0bf3, 0x0bfa, 1],
    [0x0c7f, 0x0d4f, 208],
    [0x0d79, 0x0e3f, 198],
    [0x0f01, 0x0f03, 1],
    [0x0f13, 0x0f15, 2],
    [0x0f16, 0x0f17, 1],
    [0x0f1a, 0x0f1f, 1],
    [0x0f34, 0x0f38, 2],
    [0x0fbe, 0x0fc5, 1],
    [0x0fc7, 0x0fcc, 1],
    [0x0fce, 0x0fcf, 1],
    [0x0fd5, 0x0fd8, 1],
    [0x109e, 0x109f, 1],
    [0x1390, 0x1399, 1],
    [0x166d, 0x17db, 366],
    [0x1940, 0x19de, 158],
    [0x19df, 0x19ff, 1],
    [0x1b61, 0x1b6a, 1],
    [0x1b74, 0x1b7c, 1],
    [0x1fbd, 0x1fbf, 2],
    [0x1fc0, 0x1fc1, 1],
    [0x1fcd, 0x1fcf, 1],
    [0x1fdd, 0x1fdf, 1],
    [0x1fed, 0x1fef, 1],
    [0x1ffd, 0x1ffe, 1],
    [0x2044, 0x2052, 14],
    [0x207a, 0x207c, 1],
    [0x208a, 0x208c, 1],
    [0x20a0, 0x20bf, 1],
    [0x2100, 0x2101, 1],
    [0x2103, 0x2106, 1],
    [0x2108, 0x2109, 1],
    [0x2114, 0x2116, 2],
    [0x2117, 0x2118, 1],
    [0x211e, 0x2123, 1],
    [0x2125, 0x2129, 2],
    [0x212e, 0x213a, 12],
    [0x213b, 0x2140, 5],
    [0x2141, 0x2144, 1],
    [0x214a, 0x214d, 1],
    [0x214f, 0x218a, 59],
    [0x218b, 0x2190, 5],
    [0x2191, 0x2307, 1],
    [0x230c, 0x2328, 1],
    [0x232b, 0x2426, 1],
    [0x2440, 0x244a, 1],
    [0x249c, 0x24e9, 1],
    [0x2500, 0x2767, 1],
    [0x2794, 0x27c4, 1],
    [0x27c7, 0x27e5, 1],
    [0x27f0, 0x2982, 1],
    [0x2999, 0x29d7, 1],
    [0x29dc, 0x29fb, 1],
    [0x29fe, 0x2b73, 1],
    [0x2b76, 0x2b95, 1],
    [0x2b97, 0x2bff, 1],
    [0x2ce5, 0x2cea, 1],
    [0x2e50, 0x2e51, 1],
    [0x2e80, 0x2e99, 1],
    [0x2e9b, 0x2ef3, 1],
    [0x2f00, 0x2fd5, 1],
    [0x2ff0, 0x2ffb, 1],
    [0x3004, 0x3012, 14],
    [0x3013, 0x3020, 13],
    [0x3036, 0x3037, 1],
    [0x303e, 0x303f, 1],
    [0x309b, 0x309c, 1],
    [0x3190, 0x3191, 1],
    [0x3196, 0x319f, 1],
    [0x31c0, 0x31e3, 1],
    [0x3200, 0x321e, 1],
    [0x322a, 0x3247, 1],
    [0x3250, 0x3260, 16],
    [0x3261, 0x327f, 1],
    [0x328a, 0x32b0, 1],
    [0x32c0, 0x33ff, 1],
    [0x4dc0, 0x4dff, 1],
    [0xa490, 0xa4c6, 1],
    [0xa700, 0xa716, 1],
    [0xa720, 0xa721, 1],
    [0xa789, 0xa78a, 1],
    [0xa828, 0xa82b, 1],
    [0xa836, 0xa839, 1],
    [0xaa77, 0xaa79, 1],
    [0xab5b, 0xab6a, 15],
    [0xab6b, 0xfb29, 20414],
    [0xfbb2, 0xfbc1, 1],
    [0xfdfc, 0xfdfd, 1],
    [0xfe62, 0xfe64, 2],
    [0xfe65, 0xfe66, 1],
    [0xfe69, 0xff04, 155],
    [0xff0b, 0xff1c, 17],
    [0xff1d, 0xff1e, 1],
    [0xff3e, 0xff40, 2],
    [0xff5c, 0xff5e, 2],
    [0xffe0, 0xffe6, 1],
    [0xffe8, 0xffee, 1],
    [0xfffc, 0xfffd, 1],
  ],
  T32: [
    [0x10137, 0x1013f, 1],
    [0x10179, 0x10189, 1],
    [0x1018c, 0x1018e, 1],
    [0x10190, 0x1019c, 1],
    [0x101a0, 0x101d0, 48],
    [0x101d1, 0x101fc, 1],
    [0x10877, 0x10878, 1],
    [0x10ac8, 0x1173f, 3191],
    [0x11fd5, 0x11ff1, 1],
    [0x16b3c, 0x16b3f, 1],
    [0x16b45, 0x1bc9c, 20823],
    [0x1d000, 0x1d0f5, 1],
    [0x1d100, 0x1d126, 1],
    [0x1d129, 0x1d164, 1],
    [0x1d16a, 0x1d16c, 1],
    [0x1d183, 0x1d184, 1],
    [0x1d18c, 0x1d1a9, 1],
    [0x1d1ae, 0x1d1e8, 1],
    [0x1d200, 0x1d241, 1],
    [0x1d245, 0x1d300, 187],
    [0x1d301, 0x1d356, 1],
    [0x1d6c1, 0x1d6db, 26],
    [0x1d6fb, 0x1d715, 26],
    [0x1d735, 0x1d74f, 26],
    [0x1d76f, 0x1d789, 26],
    [0x1d7a9, 0x1d7c3, 26],
    [0x1d800, 0x1d9ff, 1],
    [0x1da37, 0x1da3a, 1],
    [0x1da6d, 0x1da74, 1],
    [0x1da76, 0x1da83, 1],
    [0x1da85, 0x1da86, 1],
    [0x1e14f, 0x1e2ff, 432],
    [0x1ecac, 0x1ecb0, 4],
    [0x1ed2e, 0x1eef0, 450],
    [0x1eef1, 0x1f000, 271],
    [0x1f001, 0x1f02b, 1],
    [0x1f030, 0x1f093, 1],
    [0x1f0a0, 0x1f0ae, 1],
    [0x1f0b1, 0x1f0bf, 1],
    [0x1f0c1, 0x1f0cf, 1],
    [0x1f0d1, 0x1f0f5, 1],
    [0x1f10d, 0x1f1ad, 1],
    [0x1f1e6, 0x1f202, 1],
    [0x1f210, 0x1f23b, 1],
    [0x1f240, 0x1f248, 1],
    [0x1f250, 0x1f251, 1],
    [0x1f260, 0x1f265, 1],
    [0x1f300, 0x1f6d7, 1],
    [0x1f6e0, 0x1f6ec, 1],
    [0x1f6f0, 0x1f6fc, 1],
    [0x1f700, 0x1f773, 1],
    [0x1f780, 0x1f7d8, 1],
    [0x1f7e0, 0x1f7eb, 1],
    [0x1f800, 0x1f80b, 1],
    [0x1f810, 0x1f847, 1],
    [0x1f850, 0x1f859, 1],
    [0x1f860, 0x1f887, 1],
    [0x1f890, 0x1f8ad, 1],
    [0x1f8b0, 0x1f8b1, 1],
    [0x1f900, 0x1f978, 1],
    [0x1f97a, 0x1f9cb, 1],
    [0x1f9cd, 0x1fa53, 1],
    [0x1fa60, 0x1fa6d, 1],
    [0x1fa70, 0x1fa74, 1],
    [0x1fa78, 0x1fa7a, 1],
    [0x1fa80, 0x1fa86, 1],
    [0x1fa90, 0x1faa8, 1],
    [0x1fab0, 0x1fab6, 1],
    [0x1fac0, 0x1fac2, 1],
    [0x1fad0, 0x1fad6, 1],
    [0x1fb00, 0x1fb92, 1],
    [0x1fb94, 0x1fbca, 1],
  ],
};
