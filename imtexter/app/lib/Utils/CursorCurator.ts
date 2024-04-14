

 export const applyPrevCusrorPointer = (position: HTMLInputElement["selectionStart"], inputRef : React.MutableRefObject<any>) => {
    requestAnimationFrame(() => {
        inputRef.current.selectionStart = inputRef.current.selectionEnd = position;
    });
   }