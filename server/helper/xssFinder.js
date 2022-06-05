function htmlEscape(text) {
    return text.replace(/&/g, '&amp;').
      replace(/</g, '&lt;').  
      replace(/"/g, '&quot;').
      replace(/'/g, '&#039;');
 }

 