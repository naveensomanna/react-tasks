import { navigationItems } from "./item";
import "./App.css";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const ref = useRef();
  const [dimensions, setDimensions] = useState({
    necessaryWidths: [],
    moreWidth: 0,
  });

  const [lastVisibleMenuItem, setLastVisibleMenuItem] = useState(-1);

  function getLastVisibleItem({ containerWidth, necessaryWidths, moreWidth }) {
    if (!necessaryWidths?.length) return 0;
    console.log(necessaryWidths[necessaryWidths.length - 1]);
    if (necessaryWidths[necessaryWidths.length - 1] < containerWidth) {
      return necessaryWidths.length - 1;
    }

    const visibleItems = necessaryWidths.filter((width) => {
      return width + moreWidth < containerWidth;
    });

    return visibleItems.length ? visibleItems.length - 1 : 0;
  }

  function getPreCalculatedWidth(element) {
    const { width: containerWidth, left: containerLeft } =
      element.getBoundingClientRect();
    const childrens = Array.from(element.childNodes);
    let moreWidth = 0;
    let necessaryWidths = childrens.reduce((result, node) => {
      if (node.getAttribute("id") === "more") {
        moreWidth = node.getBoundingClientRect().width;
        return result;
      }

      let rect = node.getBoundingClientRect();
      let width = rect.width + (rect.left - containerLeft) + 10;
      return [...result, width];
    }, []);
    return {
      moreWidth,
      necessaryWidths,
      containerWidth,
    };
  }

  useEffect(() => {
    if (!ref.current) return;
    const { moreWidth, necessaryWidths, containerWidth } =
      getPreCalculatedWidth(ref.current);
    const itemIndex = getLastVisibleItem({
      containerWidth,
      necessaryWidths,
      moreWidth,
    });
    setDimensions({ moreWidth, necessaryWidths });
    setLastVisibleMenuItem(itemIndex);
  }, []);

  // // listen for resize here and re-calculate the last visible element
  useEffect(() => {
     const listener = () => {
    if (!ref.current) return;
      const newIndex = getLastVisibleItem({
        containerWidth: ref.current.getBoundingClientRect().width,
         necessaryWidths: dimensions.necessaryWidths,
        moreWidth: dimensions.moreWidth
       });

       if (newIndex !== lastVisibleMenuItem) {
         setLastVisibleMenuItem(newIndex);
      }
     };

     window.addEventListener("resize", listener);

     return () => {
       window.removeEventListener("resize", listener);
    };
   }, [lastVisibleMenuItem, dimensions, ref]);

  const isMoreVisible = lastVisibleMenuItem < navigationItems.length - 1;

  const filterItems = navigationItems.filter((item, index) => {
    return index <= lastVisibleMenuItem;
  });

  if (lastVisibleMenuItem === -1) {
    return (
      <div className="navigation" ref={ref}>
        {navigationItems.map((item) => (
          <a href={item.href} key={item.id} className="navigation-button">
            {item.name}
          </a>
        ))}
        <button className="navigation-button" id="more">
          ...
        </button>
      </div>
    );
  }

  return (
    <section>
      <header className="navigation" ref={ref}>
        {filterItems.map((item) => (
          <a href={item.href} key={item.id} className="navigation-button">
            {item.name}
          </a>
        ))}
        {isMoreVisible && (
          <button className="navigation-button" id="more">
            ...
          </button>
        )}
      </header>
    </section>
  );
}
