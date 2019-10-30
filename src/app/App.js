import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            nombre: '',
            provedor: '',
            cantidad: '',
            precio: '',
            products: [],
            _id: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.addProduct = this.addProduct.bind(this)
    }

    addProduct(e) {
        if(this.state._id) {
            fetch(`/api/products/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Producto Actualizado'});
                this.setState({
                    nombre: '',
                    provedor: '',
                    cantidad: '',
                    precio: '',
                    _id: ''
                });
                this.fetchProducts();
            });
        } else {
            fetch('/api/products', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: 'Producto Guradado'})
                    this.setState({
                        nombre: '',
                        provedor: '',
                        cantidad: '',
                        precio: ''
                    });
                    this.fetchProducts();
                })
                .catch(err => console.log(err))
        }

        e.preventDefault();
    }

    componentDidMount() {
        this.fetchProducts();
    }
    fetchProducts() {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                this.setState({products: data});
                console.log(this.state.products);
            });
    }

    deleteProduct(id) {
        if (confirm('Seguro de eliminar el Producto')) {
            fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Producto eliminado'});
                this.fetchProducts();
            });
        }
    }

    editProduct(id) {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    nombre: data.nombre,
                    provedor: data.provedor,
                    cantidad: data.cantidad,
                    precio: data.precio,
                    _id: data._id
                })
            });
    }


    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {/*NAVEGACION*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN STACK</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addProduct}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="nombre" onChange={this.handleChange} type="text" placeholder="Nombre del producto" value={this.state.nombre}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="provedor" onChange={this.handleChange} type="text" placeholder="Nombre del provedor" value={this.state.provedor}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="cantidad" onChange={this.handleChange} type="text" placeholder="Cantidad" value={this.state.cantidad}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="precio" onChange={this.handleChange} type="text" placeholder="Precio" value={this.state.precio}/>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            SEND
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className=" col s7">
                            <table>
                                 <thead>
                                     <tr>
                                         <th>Producto</th>
                                         <th>Provedor</th>
                                         <th>Cantidad</th>
                                         <th>Precio</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                    { 
                                        this.state.products.map(product => {
                                            return (
                                                <tr key={product._id}>
                                                    <td> {product.nombre} </td>
                                                    <td> {product.provedor} </td>
                                                    <td> {product.cantidad} </td>
                                                    <td> {product.precio} </td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.editProduct(product._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" style={{margin: '4px'}} onClick={ () => this.deleteProduct(product._id) }>
                                                        <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                     }
                                 </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;