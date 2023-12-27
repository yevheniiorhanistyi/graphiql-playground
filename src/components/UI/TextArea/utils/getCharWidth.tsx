const getCharWidth = () => {
  const charMeasure = document.createElement('span');
  charMeasure.textContent = 'a';
  charMeasure.style.visibility = 'hidden';
  charMeasure.style.whiteSpace = 'pre';

  document.body.appendChild(charMeasure);
  const charWidth = charMeasure.offsetWidth;
  document.body.removeChild(charMeasure);

  return charWidth;
};

export default getCharWidth;
