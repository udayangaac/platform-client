import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AdvertisementDashboardView from "../dashboardView/AdvertisementDashboardView";
import MenuAppBar from "../../../components/header/MenuAppBar";

const styles = (theme) => ({});


class AddAdvertisement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <MenuAppBar/>
                <AdvertisementDashboardView
                    history={this.props.history}
                    type="user_add"
                    title="Add Advertisement"
                />
            </>
        );
    }
}

export default withStyles(styles, {withTheme: true})(AddAdvertisement);

