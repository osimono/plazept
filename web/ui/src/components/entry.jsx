import React, {Component} from 'react';
import MainCard from "./mainCard";
import items from "../assets/items.png";

export default class Entry extends Component {

    render() {
        return (
            <div>
                <section className="hero is-medium is-dark is-bold">
                    <div className="hero-body ">
                        <div className="container">
                            <h1 className="title">
                                Lebensmittel & Rezepte
                            </h1>
                            <h2 className="subtitle">
                                Anlegen, Verwalten und Benutzen
                            </h2>
                        </div>
                    </div>
                </section>

                <div className="level"/>

                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <MainCard route="/items" source={items} title="Lebensmittel" subTitle="Einzelne Zutaten verwalten"/>
                        </div>
                        <div className="column">
                            <MainCard source={items} title="Rezepte" subTitle="Das was Ihre Küche einzigartig macht"/>
                        </div>
                        <div className="column">
                            <MainCard source={items} title="Verkaufen" subTitle="Gutes darf auch etwas kosten..."/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}