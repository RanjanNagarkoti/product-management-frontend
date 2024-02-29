import React from "react";
import Buttons from "./Buttons";

const Pagination = ({ meta, setPage }) => {
  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {`${meta.from}-${meta.to}`}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {`${meta.total}`}
        </span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        {meta.links.map((link) => (
          <Buttons link={link} key={link.label} setPage={setPage} />
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
