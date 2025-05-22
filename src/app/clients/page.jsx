"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton} from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Client.module.css";
import Footer from "@/components/footer";
import "@ant-design/v5-patch-for-react-19";

const headers = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY};

export default function Clients() {

    const [data, setData] = useState({
        clients: [],
        loading: true,
        current: 1,
        pageSize: 10,
    });

    const [modalInfo, setModalInfo] = useState({
        visible: false,
        client: null,
        order: null,
        loading: false,
    });

    useEffect(() => {
        const fetchClients = async () => {
            const cacheKey = "clientsData";
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/clients`,
                    { headers : headers }
                );
                setData({ clients: response.data, loading: false, current: 1, pageSize: 10 });
            } catch (error) {
                toast.error("Error loading clients");
                console.error("Error loading clients", error);
                setData((d) => ({...d, loading: false }));
        }
};

        fetchClients();
    }, []);

    const openModal = async (client) => {
        setModalInfo({ visible: true, name: client.name, client, loading: false });

        try {
            const { data: order } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/orders/${client.id}`,
                { headers : headers }
            );
            setModalInfo((m) => ({...m, order, loading: false }));
        } catch (error) {
            toast.error("Error loading order");
            console.error("Error loading order", error);
            setModalInfo((m) => ({...m, loading: false })); 
        }
    };

    const paginatedClients = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.clients.slice(start, start + data.pageSize);
    };

    

    return (
        <div className={styles.container}>
            <ToastContainer
                position="top-right"
                autoClose={7500}
                theme="light"
            />

            <h1 className={styles.title}>Clients</h1>

            <Pagination
                current={data.current}
                pageSize={data.pageSize}
                total={data.clients.length}
                onChange={(page, size) =>
                    setData((d) => ({ ...d, current: page, pageSize: size }))
                }
                showSizeChanger
                pageSizeOptions={[5, 10, 50]}
            />

            {data.loading ? (
                <Image src="/image/shoppingLoading.gif" unoptimized className={styles.loading} alt="Loading" width={100} height={100} />
            ) : (
                <div className={styles.clientList}>
                    {paginatedClients().map((client) => (
                        <Card
                            hoverable
                            key={client.id}
                            className={styles.clientCard}
                            onClick={() => openModal(client)}
                            cover={
                                <Image
                                    alt={client.name}
                                    src={client.profile ? client.profile : "/image/200.svg"}
                                    width={200}
                                    height={200}
                                    className={styles.clientImage}
                                />
                            }
                        >
                            <Card.Meta
                            title={client.name}
                            />
                            </Card>
                    ))}
                </div>
            )}
            <Modal
            title={`Pedido de ${modalInfo.client?.name}`}
            open={modalInfo.visible}
            onCancel={() => setModalInfo({
                visible: false,
                client: null,
                order: null,
                loading: false,
            })}
            onOk={() =>
                setModalInfo({
                    visible: false,
                    client: null,
                    order: null,
                    loading: false,
                })
            }
            width={600}
            >
                {modalInfo.loading ? (
                    <Skeleton active />
                ) : modalInfo.order ? (
                    <div className={styles.modalContent}>
                        <p>
                            <span className={styles.label}>Produto: </span>{""}
                            {modalInfo.order.product}
                        </p>
                        <p>
                            <span className={styles.label}>Preço: </span>{""}
                            {modalInfo.order.price}
                        </p>
                        </div>
                ) : (
                    <p className={styles.noOrder}>
                        Este cliente não possui pedidos.
                    </p>
                )}
            </Modal>
            <Footer />
        </div>
    );
}