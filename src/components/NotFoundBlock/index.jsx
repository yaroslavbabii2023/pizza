import React from "react";

import styles from "./NotFoundBlock.module.scss"
const NotFoundBlock = () => {
    return(
            <h1 className={styles.root}>
                Нічого не найдено :(
                <p className={styles.p}>Нажаль сторінка відсутня у нашому магазині</p>
            </h1>
    )
}

export default NotFoundBlock