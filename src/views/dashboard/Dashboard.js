import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import MenuAppBar from "../../components/header/MenuAppBar";
import UserContainer from "../../components/layouts/userContainer";
import AdminContainer from "../../components/layouts/adminContainer";
import AuthService from "../../services/auth";
import Footer from "../../components/header/Footer"

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

function Dashboard(props) {

    let auth = AuthService.getLocalStorageProfile();

    if (auth.role === 1) {
        return (
            <section>
                <MenuAppBar props={props}/>
                <AdminContainer history={props.history}/>
            </section>
        );
    } else {
        return (
            <section>
                <MenuAppBar props={props}/>
                <UserContainer history={props.history}/>
                <Footer/>
            </section>
        );
    }
}

export default withStyles(styles)(Dashboard)

