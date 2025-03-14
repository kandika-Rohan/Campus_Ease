// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "./Header";
// import './ProductDetail.css';
// import ChatBox from './ChatBox';
// import { FaMessage } from "react-icons/fa6";

// function ProductDetail() {
//     const [product, setProduct] = useState(null);
//     const [user, setUser] = useState(null);
//     const [isChatBoxOpen, setIsChatBoxOpen] = useState(false); // State to manage chat box visibility
//     const { productId } = useParams();

//     useEffect(() => {
//         const url = `http://localhost:4000/get-product/${productId}`;
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.product) {
//                     setProduct(res.data.product);
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     }, [productId]);

//     const handleContacts = (addedBy) => {
//         const url = `http://localhost:4000/get-user/${addedBy}`;
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.user) {
//                     setUser(res.data.user);
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     };

//     const toggleChatBox = () => {
//         setIsChatBoxOpen((prev) => !prev);
//     };

//     return (
//         <div>
//             <Header />
//             <h1>Product Details</h1>
//             {product && (
//                 <div className="product-details">
//                     <div className="product-image-container">
//                         <img
//                             src={`http://localhost:4000/uploads/${product.pimage}`}
//                             alt={product.pname}
//                             className="product-image"
//                         />
//                     </div>
//                     <div className="product-info">
//                         <h1>{product.pname}</h1>
//                         <span>{product.pdesc}</span>
//                         <h4 className="price">₹{product.price}</h4>
//                         {product.addedBy && (
//                             <button className='btn btn-secondary' onClick={() => handleContacts(product.addedBy)}>
//                                 SHOW CONTACT DETAILS
//                             </button>
//                         )}
//                         {user && (
//                             <div className="contact-info">
//                                 {user.username && <h5>{user.username}</h5>}
//                                 {user.mobile && <h5>{user.mobile}</h5>}
//                                 {user.email && (
//                                     <a href={`mailto:${user.email}?subject=Your%20Subject&body=Your%20Message`}>
//                                         <h5>{user.email}</h5>
//                                     </a>
//                                 )}
//                             </div>
//                         )}
//                     </div>
                    
//                     {/* Chat icon/button to toggle the ChatBox */}
//                     <FaMessage onClick={toggleChatBox} />
                    
//                     {/* Render the ChatBox conditionally based on isChatBoxOpen */}
//                     {isChatBoxOpen && product.addedBy && (
//                         <ChatBox productId={product._id} sellerId={product.addedBy} />
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ProductDetail;


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import './ProductDetail.css';
import ChatBox from './ChatBox';
import { FaMessage } from "react-icons/fa6";

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [isContactVisible, setIsContactVisible] = useState(false); // State to manage contact visibility
    const [isChatBoxOpen, setIsChatBoxOpen] = useState(false); // State to manage chat box visibility
    const { productId } = useParams();

    useEffect(() => {
        const url = `http://localhost:4000/get-product/${productId}`;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setProduct(res.data.product);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, [productId]);

    const handleContacts = (addedBy) => {
        if (!isContactVisible) {
            const url = `http://localhost:4000/get-user/${addedBy}`;
            axios.get(url)
                .then((res) => {
                    if (res.data.user) {
                        setUser(res.data.user);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        setIsContactVisible((prev) => !prev); // Toggle contact visibility
    };

    const toggleChatBox = () => {
        setIsChatBoxOpen((prev) => !prev);
    };

    return (
        <div>
            <Header />
            <h1>Product Details</h1>
            {product && (
                <div className="product-details">
                    <div className="product-image-container">
                        <img
                            src={`http://localhost:4000/uploads/${product.pimage}`}
                            alt={product.pname}
                            className="product-image"
                        />
                    </div>
                    <div className="product-info">
                        <h1>{product.pname}</h1>
                        <span>{product.pdesc}</span>
                        <h4 className="price">₹{product.price}</h4>
                        {product.addedBy && (
                            <button className='btn btn-secondary' onClick={() => handleContacts(product.addedBy)}>
                                {isContactVisible ? 'HIDE CONTACT DETAILS' : 'SHOW CONTACT DETAILS'}
                            </button>
                        )}
                        {isContactVisible && user && (
                            <div className="contact-info">
                                {user.username && <h5>Username:{user.username}</h5>}
                                {user.mobile &&<h5>Contact Info:{user.mobile}</h5>}
                                {user.email && 
                                        <h5>Email:{user.email}</h5>
                                    
                                }
                            </div>
                        )}
                    </div>
                    
                    {/* Chat icon/button to toggle the ChatBox */}
                    <FaMessage onClick={toggleChatBox} />
                    
                    {/* Render the ChatBox conditionally based on isChatBoxOpen */}
                    {isChatBoxOpen && product.addedBy && (
                        <ChatBox productId={product._id} sellerId={product.addedBy} />
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
