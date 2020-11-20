import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';
import Link from 'next/link';
import { useState } from 'react';
import styles from './CountriesTable.module.css';

const orderBy = (countries, value, direction) => {
  const orderedCountries = [...countries];
  if (direction === "asc") {
    return orderedCountries.sort((a, b) => a[value] > b[value] ? 1 : -1);
  }
  if (direction === "desc") {
    return orderedCountries.sort((a, b) => a[value] > b[value] ? -1 : 1);
  }
  return orderedCountries;
}

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  const [value, setValue] = useState();
  const [direction, setDirection] = useState();

  const orderedCountries = orderBy(countries, value, direction);
  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };
  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <button onClick={() => setValueAndDirection("name")} className={styles.heading_name}>
          <div>Name</div>
          <SortArrow direction={direction} />
        </button>
        <button onClick={() => setValueAndDirection("population")} className={styles.heading_population}>
          <div>Population</div>
          <SortArrow direction={direction} />
        </button>
      </div>

      {orderedCountries.map(country => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <div className={styles.row}>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;