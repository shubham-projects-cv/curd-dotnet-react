import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../services/productService";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    const loadProducts = () => {
        getProducts().then(res => setProducts(res.data));
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            deleteProduct(id).then(() => loadProducts());
        }
    };

    return (
        <div className="container mt-4">
            <h3>Products</h3>

            <Link to="/create" className="btn btn-primary mb-3">
                Add Product
            </Link>

            <table className="table table-bordered table-responsive">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.title}</td>
                            <td>{p.price}</td>
                            <td>{p.manufacturerDate?.split("T")[0]}</td>
                            <td>
                                <Link to={`/edit/${p.id}`} className="btn btn-warning btn-sm me-2">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="btn btn-danger btn-sm">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
