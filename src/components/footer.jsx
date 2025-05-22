import styles from '../styles/Footer.module.css';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
    <div className={styles.footer}>
        <p>Desenvolvido por Ana Carolina</p>
        <div className={styles.social}>
            <Link href="https://github.com/AnaCarolinaFreitas" target="_blank" >
                <Image src="/icon/github.png" alt="GitHub" width={24} height={24} />
            </Link>
            <Link href="https://www.linkedin.com/in/ana-carolina-garcia-freitas/" target="_blank" >
                <Image src="/icon/linkedin.png" alt="LinkedIn" width={24} height={24} />
            </Link>
            <Link href="https://www.instagram.com/ana_carolina_garcia_freitas/" target="_blank">
                <Image src="/icon/instagram.png" alt="Instagram" width={24} height={24} />
            </Link>
        </div>
        </div>
    )}