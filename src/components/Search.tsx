import React from 'react';
import {
    Row, 
    Col, 
    Container, 
    Input, 
    Button,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap'
import SearchResult from './SearchResults';

type SearchState = {
    searchQuery: string,
    searchResults: object[],
    searchPage: number,
    startDate: string,
    endDate: string
}

class Search extends React.Component<{}, SearchState> {
    constructor(props: any) {
        super(props)

        this.state = {
            searchQuery: '',
            searchResults: [],
            searchPage: 0,
            startDate: '',
            endDate: '' 
        }

        this.searchSubmit = this.searchSubmit.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    searchSubmit(event?: any) {
        if (event) {
            event.preventDefault();
        }

        let baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
        let key = '6PVAxqNYPHNNZQx01C2iZclHD8sa6a8o';

        let url = `${baseURL}?api-key=${key}&page=${this.state.searchPage}&q=${this.state.searchQuery}`;
        url = this.state.startDate ? url + `&begin_date=${this.state.startDate}` : url;
        url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;
       
        fetch(url)
          .then(res => res.json())
          .then(data => {
              this.setState({
                  searchResults: data.response.docs
              })

              console.log(data.response)
          })
          .catch(err => console.log(err));

    }

    changePage(amount: number) {
        if (this.state.searchPage + amount < 0) {
            amount = 0;
        }

        this.setState({
            searchPage: this.state.searchPage + amount
        }, () => {
            this.searchSubmit();
        })
    }

    changeDate(start: boolean, value: string) {
        if (start) {
            this.setState({
                startDate: value
            })
        } else {
            this.setState({
                endDate: value
            })
        }
    }

    render() {
        return (
            <div>
                <br />
                <Container>
                    <Row>
                        <Col>
                            <Form onSubmit={this.searchSubmit}>
                                <InputGroup className="mx-auto" >
                                    <Input placeholder="Search..." style={{width: '500px'}}
                                        onChange={(event) => {
                                            this.setState({
                                                searchQuery: event.target.value
                                            });
                                        }} />
                                    <InputGroupAddon addonType="append">
                                        <Button onClick={this.searchSubmit}>Search</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                                <br />
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Start Date</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="date" name="startDate" onChange={(e) => {
                                        this.changeDate(true, e.target.value)
                                    }} />
                                    <Input type="date" name="endDate" onChange={(e) => {
                                        this.changeDate(false, e.target.value)
                                    }} />
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>End Date</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                <InputGroup>
                                        <Button onClick={() => {
                                            this.changePage(-1);
                                        }}>Previous page</Button>&nbsp;
                                        <Button onClick={() => {
                                            this.changePage(1);
                                        }}>Next page</Button>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <br />
                <SearchResult results={this.state.searchResults} />
            </div>
        );
    }
}

export default Search;