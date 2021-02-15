import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import MenuAppBar from "../../../components/header/MenuAppBar";

const styles = {
    cardAction: {
        display: 'block',
        textAlign: 'initial'
    },
    root: {
        maxWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        margin: 12,

    },
};

function ConfigureAdvertisement(props) {
    return (
        <section>
            <MenuAppBar/>
            <h1>Configure Advertisement</h1>
        </section>
    );
}

export default withStyles(styles)(ConfigureAdvertisement)

