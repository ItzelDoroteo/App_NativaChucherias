import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonModal,
    IonInput,
} from '@ionic/react';
import LayoutPage from '../components/LayoutPage';

const PurchaseHistory = () => {
    // Definición de la interfaz Purchase
    interface Purchase {
        ventaId: number;
        folio: string;
        customerId: number;
        cantidad: number;
        total: number; // decimal(10,2)
        totalProductos: number; // decimal(10,2)
        totalEnvio: number; // decimal(10,2)
        totalIVA: number; // decimal(10,2)
        descuentoPromocion: number; // decimal(10,2)
        fecha: string; // Se puede almacenar como string en formato ISO
        motivoCancelacion: string | null; // Puede ser null si no hay motivo
        statusVentaId: number;
        metodoPagoId: number;
        sucursalesId: number;
        domicilioId: number;
    }

    const { user } = useAuth(); // Obtén el usuario del contexto
    const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterValues, setFilterValues] = useState({
        fechaInicial: '',
        fechaFinal: '',
    });
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [folioVenta, setFolioVenta] = useState<string | null>(null);

    useEffect(() => {
        const fetchPurchaseHistory = async () => {
            if (user) {
                try {
                    const response = await axios.get<Purchase[]>(`http://localhost:5000/ventas/cliente/${user.customerId}`);
                    setPurchaseHistory(response.data);
                } catch (error) {
                    console.error('Error fetching purchase history:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchPurchaseHistory();
    }, [user]);

    const handleClearFilter = () => {
        setFilterValues({
            fechaInicial: '',
            fechaFinal: '',
        });
    };

    const openCancelModal = (folio: string) => {
        setCancelModalOpen(true);
        setFolioVenta(folio);
    };

    const handleCancelPurchase = async () => {
        try {
            await axios.post(`http://localhost:5000/ventas/cancelar-venta`, {
                folio: folioVenta,
                reason: cancelReason,
            });
            // Actualiza el historial de compras si es necesario
            setCancelModalOpen(false);
        } catch (error) {
            console.error('Error canceling purchase:', error);
        }
    };

    if (loading) {
        return <IonContent>Cargando historial de compras...</IonContent>;
    }

    return (
        <LayoutPage>
            <IonContent>

                <div className="row item-filter">
                    <div className="col-lg-10 mt-4">
                        <h5>Filtrar por fecha:</h5>
                        <div className='container-date'>
                            <IonInput
                                type="date"
                                placeholder="Fecha Inicial"
                                value={filterValues.fechaInicial}
                                onIonChange={(e) => setFilterValues({ ...filterValues, fechaInicial: e.detail.value! })}
                            />
                            <IonInput
                                type="date"
                                placeholder="Fecha Final"
                                value={filterValues.fechaFinal}
                                onIonChange={(e) => setFilterValues({ ...filterValues, fechaFinal: e.detail.value! })}
                            />
                        </div>
                        <div className='container-date'>
                        <IonButton onClick={handleClearFilter}>
                                Limpiar
                            </IonButton>
                            {/* Implementa el filtro según sea necesario */}
                            <IonButton>
                                Filtrar
                            </IonButton>
                        </div>
                    </div>
                </div>

                {purchaseHistory.length === 0 ? (
                    <div>
                        <h2>No se han realizado compras por el momento</h2>
                    </div>
                ) : (
                    <IonList>
                        {purchaseHistory.map((purchase) => (
                            <IonCard key={purchase.ventaId} className="mb-3 mt-4">
                                <IonCardHeader>
                                    <IonLabel>
                                        <strong>Folio: {purchase.folio}</strong>
                                    </IonLabel>
                                </IonCardHeader>
                                <IonCardContent>
                                    <div>
                                        <p>Total: ${purchase.total}</p>
                                        <IonButton onClick={() => openCancelModal(purchase.folio)}>Cancelar</IonButton>
                                    </div>
                                </IonCardContent>
                            </IonCard>
                        ))}
                    </IonList>
                )}

                <IonModal isOpen={cancelModalOpen} onDidDismiss={() => setCancelModalOpen(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Cancelar Compra</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonItem>
                            <IonLabel position="stacked">Motivo de cancelación</IonLabel>
                            <IonInput
                                value={cancelReason}
                                onIonChange={(e) => setCancelReason(e.detail.value!)}
                            />
                        </IonItem>
                        <IonButton expand="full" onClick={handleCancelPurchase}>Confirmar Cancelación</IonButton>
                        <IonButton expand="full" color="light" onClick={() => setCancelModalOpen(false)}>Cerrar</IonButton>
                    </IonContent>
                </IonModal>
            </IonContent>
        </LayoutPage>
    );
};

export default PurchaseHistory;
