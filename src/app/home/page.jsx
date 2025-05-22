import styles from "./Home.module.css";
import Image from "next/image";
import Link from 'next/link';
import React from "react";
import Footer from "@/components/footer";
import { Button, Flex } from 'antd';
import '@ant-design/v5-patch-for-react-19';

export default function Home() {
    return (
        <div className={styles.container}>
            <Image src="/image/AnaCarolina.png"
            className={styles.image}
            width={250}
            height={250}
            alt="Aluna Ana Carolina Garcia" />
            <h1 className={styles.title}>Ana Carolina Garcia Freitas</h1>

            <div className={styles.info}>
                <ul>
                    <li>Turma: <span>2TDS1</span></li>
                    <li>Instrutores: <span>Marcelo, Thiago, Eduardo, Felipe</span></li>
                    <li>Matéria: <span>Frontend</span></li>
                    <li>Atividade: <span>Avaliação</span></li>
                </ul>

                <p className={styles.explicacao}>
                    A API Orders possui 2 entidades, sendo elas clients e orders. Cliente possui 1 ou mais pedidos. Ela tem o objetivo de salvar as informações dos pedidos comprados pelos clientes.
                </p>
            </div>

            <Link href="/clients" prefetch>
                <Button>Ver Clientes</Button>
            </Link>

            <Footer />
            
        </div>
    );
}
