const removeSpecialChars = (str) => {
  return str
          .replaceAll(/[/'"()-+&@#%$:;{?|]/g, "")
          .replaceAll('  ', ' ');
}

export default removeSpecialChars;
