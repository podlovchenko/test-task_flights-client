import './Search.scss';

import b_ from 'b_';
import React, {Component} from 'react';

const b = b_.with('search');

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <form
                className={b()}
                onSubmit={this.onSubmit}
            >
                <input
                    className={b('input')}
                    type='text'
                    placeholder='Поиск по номеру рейса...'
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <button
                    className={b('button')}
                    type='submit'
                />
            </form>
        );
    }

    onSubmit(evt) {
        evt.preventDefault();

        this.props.onSubmit(this.state.value);

        this.setState({value: ''});
    }

    onChange(evt) {
        this.setState({value: evt.target.value});
    }

}
