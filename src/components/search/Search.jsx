import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GeoApiOptions, Geo_Api_Url } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${Geo_Api_Url}/cities?minPopulation=100000&namePrefix=${inputValue}`,
        GeoApiOptions
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      return {
        options: data.data?.map((city) => ({
          // Use optional chaining for data.data
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (err) {
      console.error("Error fetching city options:", err);
      
      return { options: [] }; 
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for City.."
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
