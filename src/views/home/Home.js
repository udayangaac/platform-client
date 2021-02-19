import React from "react";
import MainContainer from "../../components/layouts/mainContainer";
import MenuAppBar from "../../components/header/MenuAppBar";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import AddView from "../advertisement/shortView/AdvertisementShortView";

const useStyles = makeStyles((theme) => ({
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
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function Home(props) {
    return (
        <section>
            <MenuAppBar/>
            <MainContainer/>
        </section>
    );
}

export default Home;

