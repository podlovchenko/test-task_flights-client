import './List.scss';

import b_ from 'b_';
import moment from 'moment';
import React from 'react';

const b = b_.with('list');

export default (props) => {
    const {flights} = props;

    return (
        <table className={b()}>
            <tbody>
                <tr>
                    <th>Номер рейса</th>
                    <th>Город</th>
                    <th>Дата полета</th>
                </tr>
                {flights.map((flight) => {
                    return (
                        <tr
                            className={b('row')}
                            key={flight.id}
                        >
                            <td className={b('cell')}>{flight.id}</td>
                            <td className={b('cell')}>{flight.to}</td>
                            <td className={b('cell')}>{moment(flight.date).utc().format('D.MM h:mm:ss')}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
