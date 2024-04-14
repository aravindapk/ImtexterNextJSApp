
import DOMPurify from 'dompurify'

export async function sanitizeUserInput(inputString: string) {
    const sanitizedContent = DOMPurify.sanitize(inputString);
    return sanitizedContent;
}
