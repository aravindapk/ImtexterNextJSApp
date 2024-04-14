
//used for pointing the cursor to the referred position on edit
 export const applyPrevCusrorPointer = (position: HTMLInputElement["selectionStart"], inputRef : React.MutableRefObject<any>) => {
    requestAnimationFrame(() => {
        inputRef.current.selectionStart = inputRef.current.selectionEnd = position;
    });
   }