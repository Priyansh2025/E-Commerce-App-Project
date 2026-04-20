// src/components/Filters.jsx
const Filters = ({ category, setCategory, categories = [], priceRange, setPriceRange, sort, setSort }) => {
  return (
    <div style={styles.container}>
      {/* Category Filter */}
      <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select}>
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Price Range Filter */}
      <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} style={styles.select}>
        <option value="all">All Prices</option>
        <option value="0-2000">Under ₹2,000</option>
        <option value="2000-5000">₹2,000 - ₹5,000</option>
        <option value="5000-10000">₹5,000 - ₹10,000</option>
        <option value="10000+">Over ₹10,000</option>
      </select>

      {/* Sorting */}
      <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.select}>
        <option value="default">Sort By: Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
      </select>
    </div>
  );
};

const styles = {
  container: { display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' },
  select: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flexGrow: 1, minWidth: '150px' }
};

export default Filters;