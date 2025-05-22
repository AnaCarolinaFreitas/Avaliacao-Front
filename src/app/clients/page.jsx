"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card} from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Client.module.css";
import "@ant-design/v5-patch-for-react-19";

const headers = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY};

export default function Clients() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

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
            const cachedData = localStorage("clientsData", []);

            if (cachedData.length > 0) {
                setData({
                    clients: cachedData,
                    loading: false,
                    current: 1,
                    pageSize: 10,
                });
                return;
            } try {
                const { data: clients } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/clients`,
                    { headers : headers }
                );
                setData({ clients, loading: false, current: 1, pageSize: 10 });
                localStorage.setItem(cacheKey, JSON.stringify(clients));
                // localStorage("clientsData", clients);
            } catch (error) {
                toast.error("Error loading clients");
                console.error("Error loading clients", error);
                setData((d) => ({...d, loading: false }));
        }
};

        fetchClients();
    }, []);

    const openModal = async (client) => {
        setModalInfo({ visible: true, client, order: null, loading: true });

        const cacheKey = `order_${client.id}`;
        const cachedData = localStorage.getItem(cacheKey, null);
        if (cachedData) {
            setModalInfo((m) => ({...m, order: JSON.parse(cachedData), loading: false }));
            return;
        } try {
            const { data: order } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/orders/${client.id}`,
                { headers : headers }
            );
            setModalInfo((m) => ({...m, order, loading: false }));
            localStorage.setItem(cacheKey, JSON.stringify(order));
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

    useEffect(() => {
        fetchClients(search, page);
    }, [page]);

    const handleSearch = () => {
        setPage(1);
        fetchClients(search, 1);
    }

    const handleResetClick = () => {
            setSearch("");
            setPage(1);
            fetchClients("", 1);
            toast.success("Filtro foi resetado", { position: "top-right" });
        };

    return (
        <div className={styles.container}>
            <ToastContainer
                position="top-right"
                autoClose={7500}
                theme="light"
            />

            <h1 className={styles.title}>Clients</h1>

            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.input}
                />
                <button
                    onClick={handleSearch}
                    className={styles.button}
                >
                    Search
                </button>

                <button
                    onClick={handleResetClick}
                    className={styles.buttonReset}
                >
                    Reset
                </button>
            </div>

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
                <Image src="/images/shoppingLoading.gif" alt="Loading" width={100} height={100} />
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
                                />
                            }
                        >
                            <h2 className={styles.clientName}>{client.name}</h2>
                            <p className={styles.clientEmail}>{client.email}</p>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
