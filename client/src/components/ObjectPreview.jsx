/**
 * 对象预览
 * 支持type: image, pdf,
 * */

import React from 'react';
import { Icon } from "antd";

class ObjectPreview extends React.Component {
    constructor(props) {
        super(props);
        const { type, src } = props;

        let supportType = '';
        if (type.indexOf('image') > -1) {
            supportType = 'image';
        } else if (type.indexOf('pdf') > -1) {
            supportType = 'pdf';
        } else {
            supportType = 'unknown';
        }
        this.state = {
            type: supportType,
            src,
        };
    }

    renderSwitch() {
        const { type, src } = this.state;
        switch(type) {
            case 'image':
                return <img style={{width: '100%', height: '100%'}} src={src} />;
            case 'pdf':
                return <Icon type="file-pdf" style={{ fontSize: '50px' }} />;
            default:
                return <Icon type="file-unknown" style={{ fontSize: '50px' }} />
        }
    }

    render() {
        return this.renderSwitch();
    }
}

export default ObjectPreview;
