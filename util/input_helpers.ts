import { ReactElement } from "react";

function moveCursorToEnd(e: ReactElement<HTMLstrElement | HTMLTextAreaElement>, str: string) {
  setTimeout(() => {
    str.selectionStart = str.selectionEnd = str.value.length;
    str.focus();
  }, 0)
}
