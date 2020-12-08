import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import SimpleCard from "../../card/Card";

const styles = (theme) => ({
    gridContainer: {
        paddingTop: '20px'
    }
});

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const {classes} = this.props;
        return (
            <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <SimpleCard/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <SimpleCard/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <SimpleCard/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <SimpleCard/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <SimpleCard/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <SimpleCard/>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles, {withTheme: true})(MainContainer);
