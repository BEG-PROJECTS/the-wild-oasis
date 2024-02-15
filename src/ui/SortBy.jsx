import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import Select from './Select';
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';
  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select options={options} type='white' onChange={handleChange} value={sortBy} />
  )
}

SortBy.propTypes = {
  options: PropTypes.array
}

export default SortBy
