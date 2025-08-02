import React, { useState, useRef, useEffect, memo } from "react";
import { debounce } from "../../utils";

const SearchBox = memo(
  ({
    placeholder = "Search...",
    onSearch,
    onClear,
    initialValue = "",
    debounceMs = 300,
    className = "",
    size = "md",
  }) => {
    const [value, setValue] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const debouncedSearch = useRef(debounce(onSearch, debounceMs));

    useEffect(() => {
      if (value !== initialValue) {
        setValue(initialValue);
      }
    }, [initialValue]);

    useEffect(() => {
      if (onSearch) {
        debouncedSearch.current(value);
      }
    }, [value, onSearch]);

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    const handleClear = () => {
      setValue("");
      if (onClear) {
        onClear();
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClear();
      }
    };

    const sizeClasses = {
      sm: "form-control-sm",
      md: "",
      lg: "form-control-lg",
    };

    return (
      <div className={`position-relative ${className}`}>
        <input
          ref={inputRef}
          type="search"
          className={`form-control ${sizeClasses[size]} ${
            isFocused ? "shadow" : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label={placeholder}
        />
        <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
          {value ? (
            <button
              type="button"
              className="btn btn-sm btn-link p-0 border-0"
              onClick={handleClear}
              aria-label="Clear search"
              tabIndex={-1}
            >
              <i className="fas fa-times text-muted" />
            </button>
          ) : (
            <i className="fas fa-search text-muted" />
          )}
        </div>
      </div>
    );
  }
);

SearchBox.displayName = "SearchBox";

export default SearchBox;
