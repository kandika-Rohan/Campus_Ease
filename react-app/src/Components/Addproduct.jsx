import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Addproduct.css';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importing Bootstrap CSS

function AddProduct() {
    const navigate = useNavigate();

    const [pname, setPname] = useState("");
    const [pdesc, setPdesc] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [pimage, setPimage] = useState(null);

    const handleApi = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords.longitude);
                console.log(position.coords.latitude);

                const formData = new FormData();
                formData.append('plat', position.coords.latitude);
                formData.append('plong', position.coords.longitude);
                formData.append('pname', pname);
                formData.append('pdesc', pdesc);
                formData.append('price', price);
                formData.append('category', category);
                if (pimage) {
                    formData.append('pimage', pimage);
                }
                formData.append('userId', localStorage.getItem('userId'));

                const url = "http://localhost:4000/add-product";

                axios.post(url, formData)
                    .then((res) => {
                        console.log(res);
                        alert('Product added successfully!');
                        navigate('/');
                    })
                    .catch((err) => {
                        console.error(err);
                        alert('Error adding product');
                    });
            },
            (error) => {
                alert('Error getting location. Please try again.');
                console.error(error);
            }
        );
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h2 className="text-center mb-4">ADD PRODUCT HERE:</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="btn" className="form-label">Product Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id='btn' 
                                value={pname}
                                onChange={(e) => setPname(e.target.value)} 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="des" className="form-label">Product Description</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id='des' 
                                value={pdesc} 
                                onChange={(e) => setPdesc(e.target.value)} 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Product Price</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id='price' 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cat" className="form-label">Product Category</label>
                            <select 
                                id="cat" 
                                className="form-select"
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="Bicycle">Bicycle</option>
                                <option value="Books">Books</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Matrices">Matrices Bed</option>
                                <option value="Laptops">Laptops</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Bikes">Bikes</option>
                                <option value="BackPacks">BagPacks</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Product Image</label>
                            <input 
                                type="file" 
                                className="form-control" 
                                id='image' 
                                onChange={(e) => setPimage(e.target.files[0])} 
                            />
                        </div>

                        <button 
                            className="btn btn-primary w-100 mt-3" 
                            onClick={handleApi}
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
