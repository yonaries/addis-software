import { useDispatch } from "react-redux";
import {
  REQUEST_API_RECORD,
  REQUEST_API_RECORD_SEARCH,
} from "../redux/sagaActions";
import { useDebounce } from "../hooks/useDebounce";
import { useState, useEffect } from "react";

type Props = {};

const SearchBar = (props: Props) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState<string>("");
  const debounceKeyword = useDebounce(keyword);

  useEffect(() => {
    (async () => {
      debounceKeyword.length > 0
        ? dispatch({
            type: REQUEST_API_RECORD_SEARCH,
            keyword: debounceKeyword,
          })
        : dispatch({ type: REQUEST_API_RECORD });
    })();
  }, [debounceKeyword, dispatch]);

  return (
    <div className="bg-neutral-800 rounded-md px-4 py-2">
      <form>
        <input
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-transparent text-slate-200 outline-none"
          type="search"
          placeholder="Search for record"
        />
      </form>
    </div>
  );
};

export default SearchBar;
