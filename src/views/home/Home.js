import React from "react";
import MainContainer from "../../components/layouts/mainContainer";
import MenuAppBar from "../../components/header/MenuAppBar";
import Footer from "../../components/header/Footer";

function Home(props) {
    return (
        <section>
            <MenuAppBar/>
            <MainContainer/>
            <Footer/>
        </section>
    );
}
export default Home;

