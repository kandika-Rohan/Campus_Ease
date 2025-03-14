import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import './Home.css';
import Categories from "./Categories";

function Home() {
    const [products, setProducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setSearch] = useState('');
    const [likedProducts, setLikedProducts] = useState(new Set());
    const navigate = useNavigate();

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleClick = () => {
        let filteredProducts = products.filter((item) => {
            if (item.pname.toLowerCase().includes(search.toLowerCase()) || item.pdesc.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        });
        setcproducts(filteredProducts);
    };

    const handleLocationSearch = (locationProducts) => {
        setcproducts(locationProducts);
    };

    useEffect(() => {
        const url = "http://localhost:4000/get-products/";
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch((err) => {
                alert("Server error");
            });
    }, []);

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item) => {
            if (item.category.toLowerCase() === value.toLowerCase()) {
                return item;
            }
        });
        setcproducts(filteredProducts);
    }

    const handleProduct = (id) => {
        navigate('/product/' + id);
    };

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');
        const url = "http://localhost:4000/like-product";
        const data = { userId, productId };

        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    setLikedProducts(prevLiked => {
                        const updatedLiked = new Set(prevLiked);
                        if (updatedLiked.has(productId)) {
                            updatedLiked.delete(productId);
                        } else {
                            updatedLiked.add(productId);
                        }
                        return updatedLiked;
                    });
                }
            })
            .catch((err) => {
                alert("Server error");
            });
    };

    return (
        <div>
            <Header
                search={search}
                handlesearch={handleSearch}
                handleclick={handleClick}
                handleLocationSearch={handleLocationSearch} // Pass the location search handler
            />

            <Categories handleCategory={handleCategory} />

            <h5>Search results</h5>
            <div className="cards">
                {cproducts && cproducts.length > 0 ? (
                    cproducts.map((item) => (
                        <div onClick={() => handleProduct(item._id)} className="card" key={item._id}>
                            <div
                                className={`icon-con ${likedProducts.has(item._id) ? 'liked' : ''}`}
                                onClick={(e) => { e.stopPropagation(); handleLike(item._id); }}>
                                <FaHeart
                                    className="icons"
                                    style={{ color: likedProducts.has(item._id) ? 'red' : 'black' }}
                                />
                            </div>
                            <img
                                width="300px"
                                height="200px"
                                src={`http://localhost:4000/uploads/${item.pimage}`}
                                alt="Product"
                                className="object-fit-contain border rounded"
                            />
                            <p className="m-2">{item.pname} | {item.category}</p>
                            <h3 className="text-danger m-2">₹{item.price}</h3>
                            <p className="text-success m-2">{item.pdesc}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>

            <h5>All RESULTS</h5>
            <div className="cards">
                {products && products.length > 0 &&
                    products.map((item) => (
                        <div onClick={() => handleProduct(item._id)} className="card" key={item._id}>
                            <div
                                className={`icon-con ${likedProducts.has(item._id) ? 'liked' : ''}`}
                                onClick={(e) => { e.stopPropagation(); handleLike(item._id); }}>
                                <FaHeart
                                    className="icons"
                                    style={{ color: likedProducts.has(item._id) ? 'red' : '' }}
                                />
                            </div>
                            <img
                                width="300px"
                                height="200px"
                                src={`http://localhost:4000/uploads/${item.pimage}`}
                                alt="Product"
                                className="object-fit-contain border rounded"
                            />
                            <p className="m-2">{item.pname} | {item.category}</p>
                            <h3 className="text-danger m-2">₹{item.price}</h3>
                            <p className="text-success m-2">{item.pdesc}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Home;
