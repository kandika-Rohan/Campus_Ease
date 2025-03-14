import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Categorypage.css'; // Custom CSS file for additional styling

function Categorypage() {
    const [products, setProducts] = useState([]);
    const [cproducts, setCproducts] = useState([]);
    const [search, setSearch] = useState('');
    const [likedProducts, setLikedProducts] = useState(new Set());
    const navigate = useNavigate();
    const param = useParams();

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleClick = () => {
        let filteredProducts = products.filter((item) => {
            return item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase());
        });
        setCproducts(filteredProducts);
    };

    useEffect(() => {
        const url = `http://localhost:4000/get-product?categoryName=${param.categoryName}`;
        axios.get(url).then((res) => {
            if (res.data.products) {
                setProducts(res.data.products);
                setCproducts(res.data.products);
            }
        }).catch((err) => {
            alert("Server error");
        });
    }, [param]);

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item) => item.category.toLowerCase() === value.toLowerCase());
        setCproducts(filteredProducts);
    };

    const handleProduct = (id) => {
        navigate('/product/' + id);
    };

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');
        const url = "http://localhost:4000/like-product";
        const data = { userId, productId };

        axios.post(url, data).then((res) => {
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
                alert("Product liked");
            }
        }).catch((err) => {
            alert("Server error");
        });
    };

    return (
        <div>
            <Header search={search} handlesearch={handleSearch} handleclick={handleClick} />
            <Categories handleCategory={handleCategory} />

            <div className="container mt-4">
                <h5>Search results</h5>
                <div className="row">
                    {cproducts.length > 0 ?
                        cproducts.map((item) => (
                            <div className="col-md-4 mb-4" key={item._id}>
                                <div className="card position-relative">
                                    <div
                                        className={`icon-con ${likedProducts.has(item._id) ? 'liked' : ''}`}
                                        onClick={() => handleLike(item._id)}
                                    >
                                        <FaHeart className="icons" />
                                    </div>
                                    <img width="100%" height="200px" src={`http://localhost:4000/uploads/${item.pimage}`} alt="Product" className="card-img-top" />
                                    <div className="card-body">
                                        <p className="card-text">{item.pname} | {item.category}</p>
                                        <h3 className="text-danger">₹{item.price}</h3>
                                        <p className="text-success">{item.pdesc}</p>
                                        <button className="btn btn-primary" onClick={() => handleProduct(item._id)}>View Product</button>
                                    </div>
                                </div>
                            </div>
                        )) :
                        <p>No results found</p>
                    }
                </div>

                <h5 className="mt-4">All RESULTS</h5>
                <div className="row">
                    {products.length > 0 ?
                        products.map((item) => (
                            <div className="col-md-4 mb-4" key={item._id}>
                                <div className="card position-relative">
                                    <div
                                        className={`icon-con ${likedProducts.has(item._id) ? 'liked' : ''}`}
                                        onClick={() => handleLike(item._id)}
                                    >
                                        <FaHeart className="icons" />
                                    </div>
                                    <img width="100%" height="200px" src={`http://localhost:4000/uploads/${item.pimage}`} alt="Product" className="card-img-top" />
                                    <div className="card-body">
                                        <p className="card-text">{item.pname} | {item.category}</p>
                                        <h3 className="text-success">₹{item.price}</h3>
                                        <p className="text-success">{item.pdesc}</p>
                                        <button className="btn btn-primary" onClick={() => handleProduct(item._id)}>View Product</button>
                                    </div>
                                </div>
                            </div>
                        )) :
                        <p>No products available</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Categorypage;
