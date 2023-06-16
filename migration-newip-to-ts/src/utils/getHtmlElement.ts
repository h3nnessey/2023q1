export const getHtmlElement = <T extends HTMLElement>(selector: string, parentNode: ParentNode = document): T => {
    const element: T | null = parentNode.querySelector<T>(selector);

    if (!element) {
        throw new Error('Element is not found');
    }

    if (!(element instanceof HTMLElement)) {
        throw new TypeError('Element is not instance of HTMLElement');
    }

    return element;
};
