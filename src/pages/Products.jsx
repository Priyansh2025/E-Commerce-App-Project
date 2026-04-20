import { useState, useMemo } from 'react';
import useProducts from '../hooks/useProducts';
import useDebounce from '../hooks/useDebounce';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';

const Products = () => {
  const { products, loading, error } = useProducts();
  
  // State for Filters, Search, and Sort
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sort, setSort] = useState('default');

  // Apply debounce to the search input
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Extract unique categories from products
  const categories = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  // Compute the filtered and sorted products
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    // 1. Search Filter
    if (debouncedSearch) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // 2. Category Filter
    if (category !== 'all') {
      result = result.filter(product => product.category === category);
    }

    // 3. Price Filter (compare against INR price)
    if (priceRange !== 'all') {
      result = result.filter(product => {
        const inrPrice = product.price * 83;
        if (priceRange === '0-2000') return inrPrice <= 2000;
        if (priceRange === '2000-5000') return inrPrice > 2000 && inrPrice <= 5000;
        if (priceRange === '5000-10000') return inrPrice > 5000 && inrPrice <= 10000;
        if (priceRange === '10000+') return inrPrice > 10000;
        return true;
      });
    }

    // 4. Sorting
    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  }, [products, debouncedSearch, category, priceRange, sort]);

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Explore Our Products</h1>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <Filters 
        category={category} setCategory={setCategory}
        categories={categories}
        priceRange={priceRange} setPriceRange={setPriceRange}
        sort={sort} setSort={setSort}
      />

      {filteredProducts.length === 0 ? (
        <p>No products match your criteria. Try adjusting your filters!</p>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};

export default Products;