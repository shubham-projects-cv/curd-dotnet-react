import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    createProduct,
    getProductById,
    updateProduct
} from "../services/productService";

export default function ProductForm() {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        manufacturerDate: ""
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getProductById(id).then(res => setProduct(res.data));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            updateProduct(id, product).then(() => navigate("/"));
        } else {
            createProduct(product).then(() => navigate("/"));
        }
    };

    return (
        <div className="container mt-4">
            <h3>{id ? "Edit" : "Create"} Product</h3>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    placeholder="Title"
                    required
                    value={product.title}
                    onChange={e => setProduct({ ...product, title: e.target.value })}
                />

                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Price"
                    required
                    value={product.price}
                    onChange={e => setProduct({ ...product, price: e.target.value })}
                />

                <textarea
                    className="form-control mb-2"
                    placeholder="Description"
                    value={product.description}
                    onChange={e => setProduct({ ...product, description: e.target.value })}
                />

                <input
                    type="date"
                    className="form-control mb-2"
                    required
                    value={product.manufacturerDate?.split("T")[0]}
                    onChange={e =>
                        setProduct({ ...product, manufacturerDate: e.target.value })
                    }
                />

                <button className="btn btn-success">Save</button>
            </form>
        </div>
    );
}
