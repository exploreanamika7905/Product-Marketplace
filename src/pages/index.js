import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home({ initialProducts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Simulate minor debounce/loading lag for client-side filtering visualization
    const delayDebounceFn = setTimeout(() => {
      const query = (searchTerm || '').trim().toLowerCase();

      if (!query) {
        setFilteredProducts(initialProducts || []);
        setLoading(false);
        return;
      }

      const filtered = (initialProducts || []).filter((product) => {
        const title = (product.title || '').toString().toLowerCase();
        const category = (product.category || '').toString().toLowerCase();
        const description = (product.description || '').toString().toLowerCase();

        return (
          title.includes(query) ||
          category.includes(query) ||
          description.includes(query)
        );
      });

      setFilteredProducts(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, initialProducts]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 fw-bold">Product Marketplace</h1>
      
      {/* Search Bar Container */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-lg shadow-sm"
            placeholder="Search products by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid Content */}
      {loading ? (
        <LoadingSpinner />
      ) : filteredProducts.length > 0 ? (
        <div className="row">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center my-5">
          <h3 className="text-muted">No products matches your search.</h3>
        </div>
      )}
    </div>
  );
}

// Server-Side Rendering (SSR Requirement)
export async function getServerSideProps() {
  try {
    const res = await axios.get('https://fakestoreapi.com/products');
    return {
      props: {
        initialProducts: res.data,
      },
    };
  } catch (error) {
    console.error('Error fetching data in SSR:', error);
    return {
      props: {
        initialProducts: [],
      },
    };
  }
}