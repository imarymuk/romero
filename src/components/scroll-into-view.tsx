import React, { useEffect, useRef } from "react";

export function ScrollIntoView({children}) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if(elementRef && elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, []);

  return (
    <div ref={elementRef} className="w-full">
      {children}
    </div>
  )  
}