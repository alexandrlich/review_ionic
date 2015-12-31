var b64pad, hexcase;

hexcase = 0;

b64pad = "";


/* istanbul ignore next */

module.exports = {
  hex_sha1: function(s) {
    return this.rstr2hex(this.rstr_sha1(this.str2rstr_utf8(s)));
  },
  b64_sha1: function(s) {
    return this.rstr2b64(this.rstr_sha1(this.str2rstr_utf8(s)));
  },
  any_sha1: function(s, e) {
    return this.rstr2any(this.rstr_sha1(this.str2rstr_utf8(s)), e);
  },
  hex_hmac_sha1: function(k, d) {
    return this.rstr2hex(this.rstr_hmac_sha1(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
  },
  b64_hmac_sha1: function(k, d) {
    return this.rstr2b64(this.rstr_hmac_sha1(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
  },
  any_hmac_sha1: function(k, d, e) {
    return this.rstr2any(this.rstr_hmac_sha1(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e);
  },
  sha1_vm_test: function() {
    return thishex_sha1("abc").toLowerCase() === "a9993e364706816aba3e25717850c26c9cd0d89d";
  },
  rstr_sha1: function(s) {
    return this.binb2rstr(this.binb_sha1(this.rstr2binb(s), s.length * 8));
  },
  rstr_hmac_sha1: function(key, data) {
    var bkey, hash, i, ipad, opad;
    bkey = this.rstr2binb(key);
    if (bkey.length > 16) {
      bkey = this.binb_sha1(bkey, key.length * 8);
    }
    ipad = Array(16);
    opad = Array(16);
    i = 0;
    while (i < 16) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5C5C5C5C;
      i++;
    }
    hash = this.binb_sha1(ipad.concat(this.rstr2binb(data)), 512 + data.length * 8);
    return this.binb2rstr(this.binb_sha1(opad.concat(hash), 512 + 160));
  },
  rstr2hex: function(input) {
    var e, hex_tab, i, output, x;
    try {
      hexcase;
    } catch (_error) {
      e = _error;
      hexcase = 0;
    }
    hex_tab = (hexcase ? "0123456789ABCDEF" : "0123456789abcdef");
    output = "";
    x = void 0;
    i = 0;
    while (i < input.length) {
      x = input.charCodeAt(i);
      output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
      i++;
    }
    return output;
  },
  rstr2b64: function(input) {
    var e, i, j, len, output, tab, triplet;
    try {
      b64pad;
    } catch (_error) {
      e = _error;
      b64pad = "";
    }
    tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    output = "";
    len = input.length;
    i = 0;
    while (i < len) {
      triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
      j = 0;
      while (j < 4) {
        if (i * 8 + j * 6 > input.length * 8) {
          output += b64pad;
        } else {
          output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
        j++;
      }
      i += 3;
    }
    return output;
  },
  rstr2any: function(input, encoding) {
    var dividend, divisor, full_length, i, output, q, quotient, remainders, x;
    divisor = encoding.length;
    remainders = Array();
    i = void 0;
    q = void 0;
    x = void 0;
    quotient = void 0;
    dividend = Array(Math.ceil(input.length / 2));
    i = 0;
    while (i < dividend.length) {
      dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
      i++;
    }
    while (dividend.length > 0) {
      quotient = Array();
      x = 0;
      i = 0;
      while (i < dividend.length) {
        x = (x << 16) + dividend[i];
        q = Math.floor(x / divisor);
        x -= q * divisor;
        if (quotient.length > 0 || q > 0) {
          quotient[quotient.length] = q;
        }
        i++;
      }
      remainders[remainders.length] = x;
      dividend = quotient;
    }
    output = "";
    i = remainders.length - 1;
    while (i >= 0) {
      output += encoding.charAt(remainders[i]);
      i--;
    }
    full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)));
    i = output.length;
    while (i < full_length) {
      output = encoding[0] + output;
      i++;
    }
    return output;
  },
  str2rstr_utf8: function(input) {
    var i, output, x, y;
    output = "";
    i = -1;
    x = void 0;
    y = void 0;
    while (++i < input.length) {
      x = input.charCodeAt(i);
      y = (i + 1 < input.length ? input.charCodeAt(i + 1) : 0);
      if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
        x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
        i++;
      }
      if (x <= 0x7F) {
        output += String.fromCharCode(x);
      } else if (x <= 0x7FF) {
        output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
      } else if (x <= 0xFFFF) {
        output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
      } else {
        if (x <= 0x1FFFFF) {
          output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        }
      }
    }
    return output;
  },
  str2rstr_utf16le: function(input) {
    var i, output;
    output = "";
    i = 0;
    while (i < input.length) {
      output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
      i++;
    }
    return output;
  },
  str2rstr_utf16be: function(input) {
    var i, output;
    output = "";
    i = 0;
    while (i < input.length) {
      output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
      i++;
    }
    return output;
  },
  rstr2binb: function(input) {
    var i, output;
    output = Array(input.length >> 2);
    i = 0;
    while (i < output.length) {
      output[i] = 0;
      i++;
    }
    i = 0;
    while (i < input.length * 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
      i += 8;
    }
    return output;
  },
  binb2rstr: function(input) {
    var i, output;
    output = "";
    i = 0;
    while (i < input.length * 32) {
      output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
      i += 8;
    }
    return output;
  },
  binb_sha1: function(x, len) {
    var a, b, c, d, e, i, j, olda, oldb, oldc, oldd, olde, t, w;
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;
    w = Array(80);
    a = 1732584193;
    b = -271733879;
    c = -1732584194;
    d = 271733878;
    e = -1009589776;
    i = 0;
    while (i < x.length) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;
      olde = e;
      j = 0;
      while (j < 80) {
        if (j < 16) {
          w[j] = x[i + j];
        } else {
          w[j] = this.bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
        }
        t = this.safe_add(this.safe_add(this.bit_rol(a, 5), this.sha1_ft(j, b, c, d)), this.safe_add(this.safe_add(e, w[j]), this.sha1_kt(j)));
        e = d;
        d = c;
        c = this.bit_rol(b, 30);
        b = a;
        a = t;
        j++;
      }
      a = this.safe_add(a, olda);
      b = this.safe_add(b, oldb);
      c = this.safe_add(c, oldc);
      d = this.safe_add(d, oldd);
      e = this.safe_add(e, olde);
      i += 16;
    }
    return Array(a, b, c, d, e);
  },
  sha1_ft: function(t, b, c, d) {
    if (t < 20) {
      return (b & c) | ((~b) & d);
    }
    if (t < 40) {
      return b ^ c ^ d;
    }
    if (t < 60) {
      return (b & c) | (b & d) | (c & d);
    }
    return b ^ c ^ d;
  },
  sha1_kt: function(t) {
    if (t < 20) {
      return 1518500249;
    } else {
      if (t < 40) {
        return 1859775393;
      } else {
        if (t < 60) {
          return -1894007588;
        } else {
          return -899497514;
        }
      }
    }
  },
  safe_add: function(x, y) {
    var lsw, msw;
    lsw = (x & 0xFFFF) + (y & 0xFFFF);
    msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  },
  bit_rol: function(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  },
  create_hash: function() {
    var hash;
    hash = this.b64_sha1((new Date()).getTime() + ":" + Math.floor(Math.random() * 9999999));
    return hash.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "");
  }
};
