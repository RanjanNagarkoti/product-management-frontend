const Buttons = ({ link, setPage }) => {
  function getPageNumberFromUrl(url) {
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1]) : null;
  }

  function handlePagination() {
    const pageNumber = getPageNumberFromUrl(link.url);
    if (pageNumber !== null) {
      setPage(pageNumber);
    }
  }

  return (
    <button
      onClick={handlePagination}
      className={`flex items-center justify-center px-3 h-8 border border-gray-300 dark:border-gray-700
                        ${
                          link.active
                            ? "text-blue-600  bg-blue-50 hover:bg-blue-100 hover:text-blue-700  dark:bg-gray-700 dark:text-white"
                            : "leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        }
                        `}
    >
      {link.label}
    </button>
  );
};

export default Buttons;
