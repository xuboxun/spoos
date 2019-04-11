import React from 'react';
import {getApplicationList} from "../../service/application";

class ObjectUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            applicationList: [],
            query: {

            }
        }
    }

    componentWillMount() {
        this.searchApplicationList();
    }

    searchApplicationList = () => {
        getApplicationList({
            pageSize: 500
        }).then(res => {
            this.setState({
                applicationList: res.result.items.map(item => {
                    return {
                        ...item,
                        key: item.appId
                    }
                }),
            });
        })
    }

    render() {
        return (
            <div>
                ObjectUpload
            </div>
        )
    }
}

export default ObjectUpload;
