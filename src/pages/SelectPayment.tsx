import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRadio, IonRadioGroup, IonLabel, IonButton, IonItem, IonCard, IonCardHeader, IonCardContent, IonFooter, IonCardTitle, IonIcon } from '@ionic/react';
import axios from 'axios';
import { walletOutline, storefrontOutline } from 'ionicons/icons';;
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import LayoutPage from '../components/LayoutPage';
import './CartPage.css'

const SelectPayment: React.FC = () => {
    const { user } = useAuth();
    const [venta, setVenta] = useState<any>(null);
    const [selectedPayment, setSelectedPayment] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        const ventaJSON = localStorage.getItem('Venta');
        if (ventaJSON) {
            const item = JSON.parse(ventaJSON);
            console.log(item)
            setVenta(item);
        }
    }, []);

    const handleMetodoPagoChange = (event: CustomEvent) => {
        setSelectedPayment(event.detail.value);
    };

    const handlePagarEnSucursalClick = async () => {
        try {
            if (!user || !venta) return;

            const response = await axios.post('http://localhost:5000/ventas/', {
                metodoPagoId: 1,
                customerId: user.customerId,
                venta,
            });

            alert('Compra exitosa. Acuda a la sucursal para la entrega y pago de su producto.');
            setTimeout(() => {
                history.push('/purchase-history'); // Redirigir al historial de compras
            }, 3000);

            console.log('Venta creada:', response.data);
        } catch (error) {
            console.error('Error al crear la venta:', error);
            alert('Error al crear la venta.');
        }
    };

    const handleStripeCheckout = async () => {
        try {
            if (!user || !venta) return;

            const items = venta.productos.map((item: any) => ({
                title: item.producto,
                quantity: item.cantidad,
                price: Math.round(item.precio * 100), // Stripe maneja centavos
                imagen: item.imagen,
            }));

            let shipping = null;
            if (venta.domicilioId) {
                shipping = {
                    price: Math.round(venta.totalEnvio * 100),
                };
            }

            const response = await axios.post('http://localhost:5000/ventas/create-checkout-session', {
                items,
                shipping,
                venta,
                customerId: user.customerId,
                metodoPagoId: 4,
            });

            const { id } = response.data;
            const stripe = (window as any).Stripe('pk_test_51Pf8IA2NI1ZNadeOLivsZnTK9wtGno4CEo8viraLEc0NBdl9CFbhubTvVVuo7gpznAfJt6mqR10IhaeVQQNutEQ500WkPoYuht');
            await stripe.redirectToCheckout({ sessionId: id });
        } catch (error) {
            console.error('Error al redirigir a Stripe Checkout:', error);
            alert('Error al iniciar el pago con Stripe.');
        }
    };

    const renderPaymentButton = () => {
        switch (selectedPayment) {
            case 'pagarEnSucursal':
                return (
                    <IonButton onClick={handlePagarEnSucursalClick} expand="block" color="primary">
                        Pagar en sucursal
                    </IonButton>
                );
            case 'stripe':
                return (
                    <IonButton onClick={handleStripeCheckout} expand="block" color="primary">
                        Pagar con Tarjeta (Stripe)
                    </IonButton>
                );
            default:
                return null;
        }
    };

    return (
        <IonPage>
            <LayoutPage>
                <IonHeader >
                    <IonToolbar>
                        <IonTitle>Selecciona tu forma de pago</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className='cart-content'>
                    <IonCard>
                        <IonCardContent>
                            <IonRadioGroup value={selectedPayment} onIonChange={handleMetodoPagoChange}>
                                <IonItem className='item-payment'>
                                    <IonRadio slot="start" value="pagarEnSucursal" />
                                    <IonLabel className='item-payment'>
                                        <IonIcon icon={storefrontOutline} className='ml-4'/> Pagar en sucursal
                                        </IonLabel>
                                </IonItem>
                                <IonItem className='item-payment'>
                                    <IonRadio slot="start" value="stripe" />
                                    <IonLabel className='item-payment'><IonIcon icon={walletOutline} className='ml-4'/>Pagar con tarjeta (Stripe)</IonLabel>
                                </IonItem>
                            </IonRadioGroup>
                        </IonCardContent>
                    </IonCard>


                </IonContent>
                <IonFooter>
                    {venta && (
                        <IonCard className="total-card">
                            <IonCardHeader className="total-card-title">
                                <IonCardTitle className="total-card-title">
                                    <strong>Resumen de compra</strong>
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <table>
                                    <tbody>
                                        {venta.productos.map((item: any, index: number) => (
                                            <tr key={index} className="total-container-address">
                                                <td className="total-text">{item.producto} ({item.cantidad})</td>
                                                <td className="total-price">
                                                    $ {(item.precio * item.cantidad).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="total-container-address">
                                            <td className="total-text">IVA (incluido)</td>
                                            <td className="total-price">$ {venta.totalIVA}</td>
                                        </tr>
                                        <tr className="total-container-address">
                                            <td className="total-text">Envío</td>
                                            <td className="total-price">
                                                {venta.totalEnvio === 0 ? "No aplica" : `$ ${venta.totalEnvio.toFixed(2)}`}
                                            </td>
                                        </tr>
                                        <tr className="total-container-address">
                                            <td className="total-text">
                                                <strong>Total</strong>
                                            </td>
                                            <td className="total-price">
                                                <strong>
                                                    $ {(parseFloat(venta.totalProductos) + venta.totalEnvio).toFixed(2)}
                                                </strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>{renderPaymentButton()}</div>
                            </IonCardContent>
                        </IonCard>
                    )}
                </IonFooter>

            </LayoutPage>
        </IonPage>
    );
};

export default SelectPayment;
