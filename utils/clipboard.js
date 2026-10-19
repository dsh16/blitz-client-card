function copyUsingSelection(text) {
  const activeElement = document.activeElement;
  const selection = window.getSelection();
  const ranges = selection
    ? Array.from({ length: selection.rangeCount }, (_, index) =>
        selection.getRangeAt(index).cloneRange()
      )
    : [];
  const input = document.createElement("textarea");
  input.value = text;
  input.readOnly = true;
  input.tabIndex = -1;
  input.style.cssText =
    "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;font-size:16px;pointer-events:none;";

  try {
    document.body.appendChild(input);
    input.focus({ preventScroll: true });
    input.select();
    input.setSelectionRange(0, text.length);
    return document.execCommand("copy");
  } catch (_) {
    return false;
  } finally {
    input.remove();
    if (activeElement && activeElement.isConnected) {
      activeElement.focus({ preventScroll: true });
    }
    if (selection) {
      selection.removeAllRanges();
      ranges.forEach((range) => {
        if (range.commonAncestorContainer.isConnected)
          selection.addRange(range);
      });
    }
  }
}

export async function copyToClipboard(value) {
  if (typeof window === "undefined" || !value) return false;
  const text = String(value);
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (_) {
    // Some browsers and embedded views deny the asynchronous clipboard API.
  }
  return copyUsingSelection(text);
}
