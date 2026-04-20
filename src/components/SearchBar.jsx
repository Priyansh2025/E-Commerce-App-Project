// src/components/SearchBar.jsx
const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
      <div style={styles.container}>
        <input
          type="text"
          placeholder="Search for products (e.g., laptop, clothing)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
      </div>
    );
  };
  
  const styles = {
    container: { marginBottom: '20px', width: '100%' },
    input: { width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }
  };
  
  export default SearchBar;