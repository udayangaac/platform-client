import React, {Component, Suspense} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from "../../header";
import MenuAppBar from "../../header/MenuAppBar";

const LoginView = React.lazy(() => import('../../../view/login/Login'));
const HomeView = React.lazy(() => import('../../../view/home/Home'));

class DefaultLayout extends Component {

    loading() {
        return (<h1>Loading</h1>)
    }
    render() {
        return (
            <section>
                <MenuAppBar/>
                <BrowserRouter>
                    <Suspense fallback={this.loading()}>
                        <Switch>
                            <Route path="/" exact component={HomeView}/>
                            <Route path="/login" exact component={LoginView}/>
                        </Switch>
                    </Suspense>
                </BrowserRouter>
            </section>
        );
    }


}


export default DefaultLayout
