/**
 * Observes changes in the child elements of a specified element and executes a callback.
 * @param elementId - The ID of the element to observe.
 * @param onChildrenChanged - Callback function to execute when children are added or removed.
 * @returns A function to disconnect the observer.
 */
export const observeElementChildren = (
  elementId: string,
  onChildrenChanged: (children: Element[] | null) => void
): (() => void) => {
  const targetElement = document.getElementById(elementId);

  if (!targetElement) {
    console.error(`Element with ID '${elementId}' not found.`);
    return () => {};
  }

  // Callback function to execute when mutations are observed
  const callback: MutationCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        onChildrenChanged(Array.from(mutation.target.childNodes) as Element[]);
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Configuration of the observer:
  const config = { childList: true };

  // Start observing the target element for configured mutations
  observer.observe(targetElement, config);

  // Return cleanup function
  return () => observer.disconnect();
};
