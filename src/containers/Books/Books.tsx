import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Books.css';
import { IBook } from '../../types/IBook';
import mainApi from '../../services/MainApi';

interface IState {
    books: IBook[]
}

class Books extends Component<{}, IState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            books: []
        }
    }

    public render() {
        return (
            <TableContainer component={Paper}>
                <Table className='table' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Author</TableCell>
                            <TableCell align="right">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.books.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.author}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    public componentDidMount() {
        var userToken: string = '';

        if (typeof localStorage.getItem("token") === 'string') {
            userToken = sessionStorage.getItem("token")!;
        }

        const AuthStr = 'Bearer '.concat(userToken);

        mainApi.get<IBook[]>('/book-management/books', { headers: { authorization: AuthStr } })
            .then(response => {
                this.setState({ books: response.data })
            })
            .catch(error => {
                if (error.response.status === 401) {
                    window.location.href = '/login'
                }
            });
    }
}

export default Books;
