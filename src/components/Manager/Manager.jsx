import './Manager.scss';

import b_ from 'b_';
import React, {Component} from 'react';
import Loader from 'react-loader-spinner';

const b = b_.with('manager');

import List from 'src/components/List/List';
import Search from 'src/components/Search/Search';

const tabNames = {
    departure: 'Вылет',
    arrival: 'Прилет',
    delay: 'Задержанные рейсы',
};
const tabs = Object.keys(tabNames);

export default class Manager extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'departure',
            flights: [],
            loading: true,
        };

        this.fetchFlights('departure');

        this.search = this.search.bind(this);
        this.fetchFlights = this.fetchFlights.bind(this);
    }

    render() {
        const {flights} = this.state;

        return (
            <div>
                <div className={b('header')}>
                    {tabs.map(tab => {
                        return (
                            <div
                                className={b('tab', {active: tab === this.state.activeTab})}
                                key={tab}
                                onClick={() => this.toggleTab(tab)}
                            >
                                {tabNames[tab]}
                            </div>
                        );
                    })}
                    <Search onSubmit={this.search}/>
                </div>
                {this.state.loading && <div className={b('loading')}>
                    <Loader
                        type='ThreeDots'
                        color='#1e326a'
                        height='100'
                        width='100'
                    />
                </div>}
                <div className={b('content')}>
                    {flights.length ? <List flights={this.state.flights}/> :
                        <div className={b('not-found')}>Рейсы не найдены</div>}
                </div>
            </div>
        );
    }

    search(id) {
        this.setState({
            activeTab: null,
            flights: [],
            loading: true,
        });

        this.fetchFlights(`search/${id}`);
    }

    toggleTab(tab) {
        this.setState({
            activeTab: tab,
            flights: [],
            loading: true,
        });

        switch (tab) {
            case 'departure':
                this.fetchFlights('departure');
                break;

            case 'arrival':
                this.fetchFlights('arrival');
                break;

            case 'delay':
                this.fetchFlights('delay');
                break;
        }
    }

    fetchFlights(path) {
        fetch(`https://api-flights.herokuapp.com/${path}`, {
            method: 'GET',
            mode: 'cors',
        })
            .then(res => {
                return res.json();
            })
            .then(res => this.setState({
                flights: res,
                loading: false,
            }))
            .catch(() => this.setState({
                flights: [],
                loading: false,
            }));
    }

}
