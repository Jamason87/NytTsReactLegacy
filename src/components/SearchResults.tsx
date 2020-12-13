import React from 'react';
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Row } from 'reactstrap';

const SearchResult = (props: any) => {


    return (
        <div>
            <Container>
                <Row>
                    {
                        props.results.map((result: any) => {
                            let imageUrl: string = (result.multimedia[0]) ? `https://nytimes.com/${result.multimedia[0].url}` : "https://via.placeholder.com/300x180";

                            return (
                                <Col xs="4">
                                    <Card>
                                        <CardImg top width="100%" src={imageUrl} alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle tag="h5"><a href={result.web_url}>{result.headline.main}</a></CardTitle>
                                            <CardText>
                                                { result.keywords.map((keyword: any) => keyword.value).join(', ') }
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        </div>
    );
}

export default SearchResult;