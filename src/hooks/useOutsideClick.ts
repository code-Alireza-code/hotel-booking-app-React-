import { useEffect, useRef } from "react";

export default function useOutsideClick(
  cb: () => unknown,
  exceptionId: string
) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        ref.current &&
        !ref.current.contains(target) &&
        target.dataset.id !== exceptionId
      )
        cb();
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [cb, exceptionId]);

  return ref;
}
