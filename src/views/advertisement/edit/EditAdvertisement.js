import withStyles from "@material-ui/core/styles/withStyles";
import React, {Component} from "react";
import MenuAppBar from "../../../components/header/MenuAppBar";
import {getCLS} from "web-vitals";
import AdvertisementDashboardView from "../view/AdvertisementDashboardView";

const styles = (theme) => ({
    gridContainer: {
        backgroundColor: theme.palette.background.paper,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    mainTitle: {
        margin: theme.spacing(2, 0, 2),
    },
    subTitle: {
        margin: theme.spacing(2, 0, 0),
    },
    listAvatarSmall: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    listAvatarLarge: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        margin: theme.spacing(0, 1, 0),
    },
    addButton: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
    statusDropdown: {
        minWidth: "200px"
    },
    filterForm: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        }
    }
});

class EditAdvertisement extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <MenuAppBar/>
                <AdvertisementDashboardView
                    history={this.props.history}
                    type="user_add_edit"
                    title="Edit Advertisement"
                    id={this.props.match.params.id}
                />
            </>
        );

    }
}

export default withStyles(styles, {withTheme: true})(EditAdvertisement);

