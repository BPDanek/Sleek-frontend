import React from 'react';
import logo from './logo.svg';
import './App.css';

// to listen to the background script

interface Props {}

interface deal {
    deal_id: string,
    retailer_id: string,
    retailer_name: string,
    retailer_domains: string[],
    deal_type: "FIXED" | "PERCENTAGE",
    deal_amount: number
}

interface State {
    data: deal[]
}

export default class App extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {data: []}
    }

    componentDidMount() {
        this.getListIndex(0, 2)
    }

    componentWillUnmount() {
    }

    sendToBackground(data: deal[]) {
        // console.log(data)
        chrome.runtime.sendMessage({data: data});
    }

    getListIndex(beginningIndex: number, endIndex: number) {
        fetch('http://localhost:3000/deals/' + beginningIndex + '/' + endIndex)
            .then(response => response.json())
            .then(data => this.setState({data: data}))
    }

    getDataElements(renderData: deal[]) {
        if (renderData) {
            return (
                renderData.map((renderDeal: deal) => {
                    if (renderDeal) { // case may be that an element of this object is undefined for some reason
                        return (
                            <div style={{
                                flexDirection: 'row', // not sure why this doesn't work, but thats for later
                                justifyContent: 'space-evenly',
                                marginBottom: 10,
                            }}>
                                <div style={{flex: 1}}>
                                    <p>
                                        {renderDeal.retailer_name}
                                    </p>
                                </div>
                                <div style={{flex: 1}}>
                                    <p>
                                        {renderDeal.deal_amount + (renderDeal.deal_type == "FIXED" ? "$ off" : "% cash back")}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div>
                                <p>invalid deal data</p>
                            </div>
                        )
                    }
                })
            )
        }
        else {
            return (
                <p>No deal data</p> // if return data is just an empty list give an error message
            )
        }
    }

    render() {
        const renderData: deal[] = this.state.data
        this.sendToBackground(renderData)
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Sleek Checkout
                    </p>
                    {this.getDataElements(renderData)}
                </header>
            </div>
        );
    }
}
