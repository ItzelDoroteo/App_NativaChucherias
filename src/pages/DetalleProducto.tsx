import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonText,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonChip
} from '@ionic/react';
import LayoutPage from '../components/LayoutPage';
import ProductCarousel from '../components/ProductCarousel';
import './DetalleProducto.css';

interface Product {
    productoId: number;
    nombre: string;
    descripcion: string;
    precioFinal: number;
    imagen: string;
    existencia: number;
    descuento: number;
    ranking: number;
}

interface RouteParams {
    productId: string;
}

const DetalleProducto: React.FC = () => {
    const { productId } = useParams<RouteParams>();
    const [product, setProduct] = useState<Product | null>(null);
    const [carouselProducts, setCarouselProducts] = useState<Product[]>([]);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${productId}`);
                setProduct(response.data);

                // Consumir la API para los productos del carrusel
                const carouselResponse = await fetch('http://localhost:5000/products/randomProducts'); // Cambia la URL a la de tu API de carrusel
                const carouselData = await carouselResponse.json();
                setCarouselProducts(carouselData);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    return (
        <IonPage>
            <LayoutPage>
                <IonContent>
                    <IonChip outline={true} className='margin-top'>Detalle del producto</IonChip>
                    {product ? (
                        <IonCard className='card'>
                            <IonImg src={product.imagen} alt={product.nombre} className='img-producto' />
                            <IonCardHeader>
                                <IonTitle>{product.nombre}</IonTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonText>
                                    <p>{product.descripcion}</p>
                                    <p><strong>Precio:</strong> ${product.precioFinal}</p>
                                    {product.descuento > 0 && <p><strong>Descuento:</strong> {product.descuento}%</p>}
                                    <p><strong>Existencia:</strong> {product.existencia}</p>
                                    <p><strong>Ranking:</strong> {product.ranking}/5</p>
                                </IonText>
                            </IonCardContent>
                        </IonCard>
                    ) : (
                        <IonText>Cargando detalles del producto...</IonText>
                    )}
                    <IonChip outline={true}>Puede interesarte</IonChip>
                    {carouselProducts.length > 0 ? (
                        <ProductCarousel products={carouselProducts} />
                    ) : (
                        <IonText color="danger">No hay productos disponibles</IonText>
                    )}
                </IonContent>
            </LayoutPage>

        </IonPage>
    );
};

export default DetalleProducto;
